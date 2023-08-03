import express, { Express, Request, Response } from "express";
import dns from "dns";
import cookieParser from "cookie-parser";
import path from "path";
import login from "./server/route/login";
import bodyParser from "body-parser";

import product from "./server/route/product";

import childProduct from "./server/route/childProduct";
import tempCart from "./server/route/tempCart";
import imPortBill from "./server/route/importBill";
import containImportBill from "./server/route/containImportBill";
import importedBill from "./server/route/importedBill";
import containImportedBill from "./server/route/containImportedBill";
import BigCategory from "./server/route/category";
import ProductController from "./controller/ProductController";
import test from "./server/route/containImportBill";

import productClient from "./client/route/product";
import account from "./client/route/account";
import childproductClient from "./client/route/childproduct";
import {
  Login,
  AuthorOrUnauthor,
  CheckUserAuthorization,
} from "./middleware/client";
import InforuserController from "./controller/InforuserController";
import BigcategoryController from "./controller/BigcategoryController";
import sercurity from "./lib/sercurity";
import shoppingcartClient from "./client/route/shoppingcart";
import orderbillClient from "./client/route/orderbill";
import orderbill from "./server/route/orderbill";

interface address {
  address: string;
  path: string;
}

export var ip: address = {
  address: "",
  path: __dirname,
};

const app: Express = express();

app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/static", express.static(path.join(__dirname, "server/page/")));
app.use("/static", express.static(path.join(__dirname, "client/page/")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

app.get("/admin", async (req: Request, res: Response) => {
  if (req.cookies.id == undefined) {
    res.redirect("/login/");
    return;
  }
  var pa: string = path.join(
    __dirname,
    "/server/page/html/new_table-data-product.ejs"
  );
  var list = await ProductController.GetAllProduct();

  res.render(pa, { ip: ip.address, list });
});

app.get("/", AuthorOrUnauthor(), async (req, res) => {
  var pa: string = path.join(__dirname, "/client/page/trangchu.ejs");
  var t: Login = req.body;
  var listBigCate = await BigcategoryController.GetAllBigcategory();
  var s = JSON.stringify(sercurity.CreateSign(14))
  var crt = Buffer.from(s).toString("base64url")
  res.render(pa, { ip: ip.address, name: t.nameUserInSerVer, crt, listBigCate });
});

app.use("/login", login);
app.use("/admin/product", product);
app.use("/admin/childProduct", childProduct);
app.use("/temPro", tempCart);
app.use("/admin/imPortBill", imPortBill);
app.use("/admin/importedBill", importedBill);
app.use("/admin/containImportBill", containImportBill);
app.use("/admin/containImportedBill", containImportedBill);
app.use("/admin/category", BigCategory);
app.use('/admin/orderbill', orderbill)


app.use("/test", test);

app.use("/product", productClient);
app.use("/account", account);
app.use("/childproduct", childproductClient)
app.use("/shoppingcart", shoppingcartClient)
app.use('/orderbill', orderbillClient)

app.listen(1000, () => {
  dns.lookupService("127.0.0.1", 1000, async (err, hostname, se) => {
    dns.lookup(hostname, { family: 4 }, (err, add, family) => {
      ip.address = `http://localhost:1000/`;
      console.log(ip.address);
      console.log(`${ip.address}admin`);
      console.log(`${ip.address}account/ver`);
    });
  });
});

export default ip;
