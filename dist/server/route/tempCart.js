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
const express_1 = require("express");
const lib_1 = require("../../lib/lib");
const ChildProductController_1 = __importDefault(require("../../controller/ChildProductController"));
const TempCartController_1 = __importDefault(require("../../controller/TempCartController"));
const tempCart = (0, express_1.Router)();
tempCart.use(lib_1.vali);
tempCart.use((req, res, next) => {
    if (req.method.toUpperCase() == "GET") {
        res.redirect("/");
        return;
    }
    next();
});
tempCart.post("/addCart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var idChildProduct = req.body.idChildProduct;
    var idInforUser = req.cookies.id;
    var check = yield Promise.all([
        ChildProductController_1.default.Has(idChildProduct + ""),
        TempCartController_1.default.Has(idInforUser, idChildProduct),
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
    var s = yield TempCartController_1.default.InsertTempCart(idChildProduct, idInforUser);
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
}));
tempCart.post("/removeaddCart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var idChildProduct = req.body.idChildProduct;
    var idInforUser = parseInt(req.cookies.id);
    var check = yield TempCartController_1.default.RemoveTemProductInCart(idChildProduct, idInforUser);
    console.log(check);
    res.json({
        mess: "xóa thành công",
        check: check,
    });
}));
tempCart.post("/getAllTemp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var list = yield TempCartController_1.default.GetAllTempProductInCart(parseInt(req.cookies.id));
    res.json(list);
}));
exports.default = tempCart;
