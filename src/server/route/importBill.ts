import e, { Router, Request, Response, NextFunction } from "express";
import ChildProductController from "../../controller/ChildProductController";
import ContainImportBillController from "../../controller/ContainImportBillController";
import ImportBillController from "../../controller/ImportBillController";
import TempCartController from "../../controller/TempCartController";
import { render, vali } from "../../lib/lib";
import ip from "../../admin";
import path from "path";
import { version } from "punycode";
import { RenderHtmlFinal_AD } from "../../lib/admin";
import ImportBill from "../../model/ImportBill";
import { verifi_post } from "../../middleware/client";
import ImportedBillController from "../../controller/ImportedBillController";
interface ChildProuct {
  idChildProduct: string;
  amount: number;
}
interface post {
  idImportBill: string
  createdDay: any | undefined
  finishDay: any | undefined
  supplier: string | undefined
  list: ChildProuct[];
}
const imPortBill = Router();
imPortBill.use(vali);

imPortBill.get("/", async (req: Request, res: Response) => {
  var status = req.query.status || ""
  var list = await ImportBillController.GetAllImportBill({status});
  var pa = path.join(ip.path, "server/page/html/importbill/importBillList.ejs")


  RenderHtmlFinal_AD(req, res, pa, { list, s: ImportBill.statusS })
});

imPortBill.post("/", async (req: Request, res: Response) => {
  var data: post = req.body;
  console.log(data);

  if (data.list.length <= 0) {
    res.json({ err: true, mess: "không có sản phẩm nào" });
    return;
  }
  if (data.createdDay == undefined || data.finishDay == undefined) {
    res.json({ err: true, mess: "thiếu dư liệu" });
    return;
  }
  if (data.supplier == undefined || data.supplier.trim().length <= 0) {
    res.json({ err: true, mess: "thiếu dư liệu" });
    return;
  }


  var check: boolean[];
  var idInforUser: number = parseInt(req.cookies.id);

  var HasTempProInCartAll = data.list.map((v) => {
    return TempCartController.Has(idInforUser, v.idChildProduct);
  });
  HasTempProInCartAll.push(ImportBillController.Has(data.idImportBill));

  check = await Promise.all(HasTempProInCartAll);

  if (check[check.length - 1]) {
    res.json({ err: true, mess: "đã tồn tại hóa đơn này" });
    return;
  }
  for (let i = 0; i < check.length - 1; i++) {
    const e = check[i];
    if (!e) {
      return res.json({ err: true, mess: "không tồn tại sản phẩm trong giỏ" });
    }
  }

  var insertOk = await ImportBillController.InsertImportBill(
    data.idImportBill, idInforUser, data.createdDay, data.finishDay, data.supplier);
  if (!insertOk) {
    res.json({ err: true, mess: "có lỗi thêm hóa đơn" });
    return;
  }
  var insertAll = data.list.map(async (v) => {
    await ChildProductController.Has(v.idChildProduct)
    var temp = await ChildProductController.Get(v.idChildProduct);
    var check
    if (temp?.importPrice) {
      check = await ContainImportBillController.InsertContainImportBill(
        v.idChildProduct,
        data.idImportBill,
        v.amount,
        temp.importPrice
      );
    }
    return check
  });
  var removeTemProAdd = data.list.map(async (v) => {
    var check = await TempCartController.RemoveTemProductInCart(
      v.idChildProduct,
      idInforUser
    );
    return check
  });
  var all = await Promise.all(insertAll.concat(removeTemProAdd as any));
  console.log(all);




  res.json({ mess: "ok" });
});
imPortBill.post("/listImportBill", async (req, res) => {
  var list = await ImportBillController.GetAllImportBill({});
  res.json(list);
});
imPortBill.post("/removeBill", async (req, res) => {
  var check = await ImportBillController.RemoveBill(req.body.idBill)
  if (check) {
    res.json({ err: false, mess: "xóa thành công" })
  }
  else {
    res.json({ err: true, mess: "xóa thất bại" })
  }


});

imPortBill.post("/UpdateImportBillStatus", verifi_post({ lenght: 10, va: "srt" }), async (req, res) => {
  var id = req.body.id
  var status = parseInt(req.body.status)
  var list = await ContainImportBillController.GetAllByIdImportBill(id)
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    if (element.amount != element.importedAmount) {
      res.redirect(`/admin/containImportBill/${id}?tb=chuanhapdu`)
      return
    }
  }
  var l = await ImportedBillController.GetAllImportedBillById(id)
  for (let i = 0; i < l.length; i++) {
    const element = l[i];
    if (element.status === 'chưa thanh toán') {
      res.redirect(`/admin/containImportBill/${id}?tb=chuanhapdu`)
      return
    }
  }
  var check = await ImportBillController.UpdateStatus(id, 1)
  res.redirect(`/admin/containImportBill/${id}?tb=thanhcong`)
})
export default imPortBill;
