import { Router, Request, Response, NextFunction } from "express";
import { vali } from "../../lib/lib";
import childProductController from "../../controller/ChildProductController";
import { join } from "path";
import ip from "../../admin";

const childProduct = Router();

childProduct.use(vali);

childProduct.get("/:idProduct", async (req, res) => {

  var idProduct = parseInt(req.params.idProduct);
  var list = await childProductController.GetAllChildProductByIdProduct(
    idProduct
  );
  var pa = join(ip.path, "/server/page/html/childPRoduct.ejs")
  res.render(pa, { ip: ip.address, list })
});

export default childProduct;
