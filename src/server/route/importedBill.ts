import { Router, Request, Response, NextFunction } from "express";
import ChildProductController from "../../controller/ChildProductController";
import ContainImportBillController from "../../controller/ContainImportBillController";
import ContainImportedBillController from "../../controller/ContainImportedBillController";
import ImportedBillController from "../../controller/ImportedBillController";
import ProductController from "../../controller/ProductController";
import { vali } from "../../lib/lib";
import path from "path";
import ip from "../../admin";
import { RenderHtmlFinal_AD } from "../../lib/admin";
import sercurity from "../../lib/sercurity";
const importedBill = Router();
interface childpro {
  idChildPro: string;
  importQuantity: number;
}
interface data {
  idImportBill: string;
  idImportedBill: string;
  list: childpro[];
}
interface updateDate {
  idImportedBill: string
  status: string
  paymentDate: string
}
interface search {
  idImportedBill: string | undefined;
}
importedBill.use(vali);
importedBill.get("/:idImportedBill", async (req, res) => {
  console.log(req.params);

  const { idImportedBill } = req.params as unknown as search;
  if (idImportedBill == undefined) {
    res.json({ list: [] });
    return;
  }

  var check = await ImportedBillController.Has(idImportedBill);
  if (!check) {
    res.json({ err: true, mess: "không có" });
    return;
  }

  var f = await Promise.all([
    ContainImportedBillController.GetAllByIdImportedBill(idImportedBill),
    ImportedBillController.GetImportedBillById(idImportedBill)])


  var pa = path.join(ip.path, "/server/page/html/imported_product_table.ejs")
  RenderHtmlFinal_AD(req, res, pa, { list: f[0], importedBill: f[1] })
});
importedBill.post("/addNewImportedBill", async (req: Request, res: Response) => {
  var datapost: data = req.body;
  var idUser = parseInt(req.cookies.id);
  if (datapost.list.length <= 0) {
    res.json({ err: true, mess: "không có sản phẩm" })
    return
  }

  // kiểm tra có sản phẩm con
  // kiểm tra sản phẩm có chứa trong hóa đơn nhập
  // kiểm tra mã hóa đơn đã nhập hàng tồn tại
  // kiểm tra số lượng nhập bé hơn số lượng đặt
  // tạo hóa đơn đã nhập 
  // thêm dữ liệu chi tiết trong hóa đơn nhập đó
  // tăng số lương nhập trong hóa đơn đặt
  // tăng số lượng sản con
  // tăng số lượng sản chính
  var check = datapost.list.map((v) => {
    return ChildProductController.Has(v.idChildPro + "");
  });
  check.concat(
    datapost.list.map((v) => {
      return ContainImportBillController.Has(
        datapost.idImportBill,
        v.idChildPro
      );
    })
  );
  check.push(ImportedBillController.Has(datapost.idImportedBill));
  var kq = await Promise.all(check);
  for (let i = 0; i < kq.length - 1; i++) {
    const element = kq[i];
    if (!element) {
      res.json({ err: true, mess: "không tồn tại" });
      return;
    }
  }
  if (kq[kq.length - 1]) {
    res.json({ err: true, mess: "có hóa đơn nhập rồi" });
    return;
  }
  var checkQuantitylist = datapost.list.map((v) => {
    return ContainImportBillController.CheckImportedQuantity(
      datapost.idImportBill,
      v.idChildPro,
      v.importQuantity
    );
  });
  kq = await Promise.all(checkQuantitylist);
  for (let i = 0; i < kq.length; i++) {
    const element = kq[i];
    if (!element) {
      res.json({
        err: true,
        mess: "số lượng sản phẩm nhập vượt quá số lương đặt",
      });
      return;
    }
  }

  var checkIn = await ImportedBillController.InsertImportedBill(
    datapost.idImportBill,
    datapost.idImportedBill,
    idUser
  );
  if (!checkIn) {
    res.json({
      err: true,
      mess: "lỗi thêm hóa đơn nhập",
    });
    return;
  }
  var lastcheck = datapost.list.map(async (v) => {
    let check = false;
    var childpro = await ChildProductController.Get(v.idChildPro);
    if (
      !childpro ||
      !childpro.importPrice ||
      !childpro.idProduct ||
      !childpro.idChildProduct
    ) {
      check = false;
      return check;
    }
    check = await ContainImportedBillController.InsertContainImportedBill(
      v.idChildPro,
      datapost.idImportedBill,
      v.importQuantity,
      childpro.importPrice
    );
    if (!check) {
      return check;
    }
    check = await ContainImportBillController.IncreaseImportedAmount(
      datapost.idImportBill,
      v.idChildPro,
      v.importQuantity
    );
    if (!check) {
      return check;
    }
    check = await ChildProductController.IncreaseAmountChildProduct(
      childpro.idChildProduct,
      v.importQuantity + ""
    );
    if (!check) {
      return check;
    }

    check = await ProductController.IncreaseAmountProduct(
      childpro.idProduct,
      v.importQuantity
    );
    if (!check) {
      return check;
    }

    return check;
  });
  var lastCheckList = await Promise.all(lastcheck);
  for (let i = 0; i < lastCheckList.length; i++) {
    const element = lastCheckList[i];
    if (!element) {
      res.json({
        err: true,
        mess: "danh sách cuối sai",
      });
      return;
    }
  }


  res.json({ err: false, mess: "thêm hóa đơn nhập thành công" });
}
);
importedBill.post("/UpdateImportedBill", async (req: Request, res: Response) => {
  var postDate: updateDate = req.body
  var s = await ImportedBillController.UpdateStatusImportedBill(postDate.idImportedBill, postDate.paymentDate, "hoàn thành")
  if (s == undefined) {
    res.json({ err: true })
    return
  }
  res.json({ err: false })
})

export default importedBill
