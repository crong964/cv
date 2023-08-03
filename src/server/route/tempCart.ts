import { Router, Request, Response } from "express";
import { vali, err } from "../../lib/lib";
import childProductController from "../../controller/ChildProductController";
import tempCartController from "../../controller/TempCartController";
const tempCart = Router();
tempCart.use(vali);
tempCart.use((req, res, next) => {
  if (req.method.toUpperCase() == "GET") {
    res.redirect("/");
    return;
  }
  next();
});
tempCart.post("/addCart", async (req, res) => {
  var idChildProduct = req.body.idChildProduct;
  var idInforUser = req.cookies.id;

  var check = await Promise.all([
    childProductController.Has(idChildProduct+""),
    tempCartController.Has(idInforUser, idChildProduct),
  ]);

  if (!check[0]) {
    res.json({
      err: true,
      mess: "Không có sản phẩm này",
    });
    return;
  }
  if (check[1]) {
    res.json({
      err: true,
      mess: "Sản phẩm này có trong rồi",
    });
    return;
  }
  var s = await tempCartController.InsertTempCart(idChildProduct, idInforUser);
  if (s) {
    res.json({
      err: false,
      mess: "thêm thành công",
    });
    return;
  }
  res.json({
    err: true,
    mess: "thêm thất bại",
  });
});
tempCart.post("/removeaddCart", async (req, res) => {
  var idChildProduct = req.body.idChildProduct;
  var idInforUser = parseInt(req.cookies.id);
  var check = await tempCartController.RemoveTemProductInCart(
    idChildProduct,
    idInforUser
  );
  console.log(check);
  
  res.json({
    mess: "xóa thành công",
    check: check,
  });
});
tempCart.post("/getAllTemp", async (req, res) => {
  var list = await tempCartController.GetAllTempProductInCart(
    parseInt(req.cookies.id)
  );
  res.json(list);
});
export default tempCart;
