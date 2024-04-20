"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const admin_1 = __importDefault(require("../../admin"));
const client_1 = require("../../middleware/client");
const ProductController_1 = __importDefault(require("../../controller/ProductController"));
const BigcategoryController_1 = __importDefault(require("../../controller/BigcategoryController"));
const sercurity_1 = __importDefault(require("../../lib/sercurity"));
const lib_1 = require("../../lib/lib");
const client_2 = require("../../lib/client");
const product = (0, express_1.default)();
product.get("/:id", (0, client_1.AuthorOrUnauthor)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var t = req.body;
    var id = req.params.id;
    if (id == undefined) {
        res.redirect(`${admin_1.default.address}`);
        return;
    }
    var product = yield ProductController_1.default.GetProduct(id);
    if (product == undefined) {
        res.redirect(`${admin_1.default.address}`);
        return;
    }
    var vbt = JSON.parse(product === null || product === void 0 ? void 0 : product.bt);
    product.Price = (0, lib_1.convertMoney)(product === null || product === void 0 ? void 0 : product.Price);
    var s = JSON.stringify(sercurity_1.default.CreateSign(5));
    var cart = sercurity_1.default.CreateBase64Url(s);
    var pa = (0, path_1.join)(admin_1.default.path, "client/page/html/product/single-product.ejs");
    (0, client_2.RenderHtmlFinal)(req, res, pa, { vbt, product, cart: cart });
}));
product.post("/", (0, client_1.AuthorOrUnauthor)(), (0, client_1.verifi_post)({ lenght: 14, va: "v" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var t = req.body;
    var idBigCategory = req.body.idBigCategory;
    if (idBigCategory == undefined) {
        res.redirect(`${admin_1.default.address}`);
        return;
    }
    var s = JSON.stringify(sercurity_1.default.CreateSign(14));
    var crt = Buffer.from(s).toString("base64url");
    var list = yield ProductController_1.default.GetAllProductByBigCategary(idBigCategory);
    var listBigCate = yield BigcategoryController_1.default.GetAllBigcategory();
    var pa = (0, path_1.join)(admin_1.default.path, "client/page/html/product/product-list.ejs");
    res.render(pa, { ip: admin_1.default.address, name: t.nameUserInSerVer, listBigCate, list, crt });
}));
exports.default = product;
