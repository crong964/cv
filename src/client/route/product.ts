import express from "express";
import { join } from "path";
import ip from "../../admin";
import {
    AuthorOrUnauthor, CheckUserAuthorization, Login, verifi_post,
} from "../../middleware/client";
import ProductController from "../../controller/ProductController";
import BigcategoryController from "../../controller/BigcategoryController";
import sercurity from "../../lib/sercurity";
import { bt } from "../../server/route/product";
import { convertMoney } from "../../lib/lib";
import { RenderHtmlFinal } from "../../lib/client";


const productClient = express();

productClient.get("/:id", AuthorOrUnauthor(), async (req, res) => {
    var t: Login = req.body;
    var id = req.params.id as unknown as number
    if (id == undefined) {
        res.redirect(`${ip.address}`)
        return
    }
    var product = await ProductController.GetProduct(id)

    if (product == undefined) {
        res.redirect(`${ip.address}`)
        return
    }
    var vbt: bt = JSON.parse(product?.bt as any)
    product.Price = convertMoney(product?.Price) as number

    var s = JSON.stringify(sercurity.CreateSign(5))
    var cart = sercurity.CreateBase64Url(s)
    
    var pa = join(ip.path, "client/page/html/product/single-product.ejs"); 
    RenderHtmlFinal(req,res,pa,{vbt, product, cart: cart})
});
productClient.post("/", AuthorOrUnauthor(), verifi_post({ lenght: 14, va: "v" }),
    async (req, res) => {
        var t: Login = req.body;
        var idBigCategory = req.body.idBigCategory;
        if (idBigCategory == undefined) {
            res.redirect(`${ip.address}`);
            return;
        }
        var s = JSON.stringify(sercurity.CreateSign(14));
        var crt = Buffer.from(s).toString("base64url");

        var list = await ProductController.GetAllProductByBigCategary(idBigCategory);

        var listBigCate = await BigcategoryController.GetAllBigcategory();
        var pa = join(ip.path, "client/page/html/product/product-list.ejs");
        res.render(pa, { ip: ip.address, name: t.nameUserInSerVer, listBigCate, list, crt });
    }
);

export default productClient;
