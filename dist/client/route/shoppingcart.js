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
const client_1 = require("../../middleware/client");
const path_1 = require("path");
const admin_1 = __importDefault(require("../../admin"));
const ShoppingCartController_1 = __importDefault(require("../../controller/ShoppingCartController"));
const sercurity_1 = __importDefault(require("../../lib/sercurity"));
const InforUserController_1 = __importDefault(require("../../controller/InforUserController"));
const OrderBillController_1 = __importDefault(require("../../controller/OrderBillController"));
const ChildProductController_1 = __importDefault(require("../../controller/ChildProductController"));
const ProductController_1 = __importDefault(require("../../controller/ProductController"));
const OrderDetailController_1 = __importDefault(require("../../controller/OrderDetailController"));
const shoppingcart = (0, express_1.Router)();
shoppingcart.use((0, client_1.UserAuthorization)());
shoppingcart.get('/', (0, client_1.AuthorOrUnauthor)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var pa = (0, path_1.join)(admin_1.default.path, 'client/page/html/shoppingcart/shoppingcart.ejs');
    var id = req.cookies.userid;
    var ls = yield Promise.all([ShoppingCartController_1.default.GetAllProductInCar(id),
        InforUserController_1.default.GetInforuser(id)]);
    var va = sercurity_1.default.CreateBase64Url(JSON.stringify(sercurity_1.default.CreateSign(5)));
    res.render(pa, { ip: admin_1.default.address, list: ls[0], infor: ls[1], name: req.body.nameUserInSerVer, cart: va, l: ls[0].length });
}));
shoppingcart.post('/add', (0, client_1.verifi_post)({ lenght: 5, va: "cart" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var idChildPro = req.body.id;
    var userid = req.cookies.userid;
    var check = yield ShoppingCartController_1.default.Has(idChildPro, userid);
    if (check) {
        res.json({
            mess: "đã có trong giỏ"
        });
        return;
    }
    var v = yield ShoppingCartController_1.default.InsertProductInCart(idChildPro, userid);
    if ((v === null || v === void 0 ? void 0 : v.affectedRows) && (v === null || v === void 0 ? void 0 : v.affectedRows) > 0) {
        res.json({
            mess: "thêm thành công"
        });
        return;
    }
    res.json({
        mess: "thêm thất bại"
    });
}));
shoppingcart.post('/del', (0, client_1.verifi_post)({ lenght: 5, va: "cart" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.body.id;
    var userid = req.cookies['userid'];
    var check = yield ShoppingCartController_1.default.DelProductInCart(id, userid);
    if (check.affectedRows <= 0) {
        res.json({
            err: true,
            mess: "xóa thành công"
        });
        return;
    }
    res.json({
        err: false,
        mess: "xóa thành công"
    });
}));
shoppingcart.post('/order', (0, client_1.verifi_post)({ lenght: 5, va: "cart" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    var userid = req.cookies.userid;
    var infor = yield InforUserController_1.default.GetInforuser(userid);
    var post = req.body;
    if (post.id.length <= 0) {
        res.redirect(`${admin_1.default.address}shoppingcart?tb=thieutt`);
        return;
    }
    if ((infor === null || infor === void 0 ? void 0 : infor.address) == undefined || (infor === null || infor === void 0 ? void 0 : infor.numberPhone) == undefined || (infor === null || infor === void 0 ? void 0 : infor.id) == undefined) {
        res.redirect(`${admin_1.default.address}shoppingcart?tb=thieuttnguoidung`);
        return;
    }
    var check = yield OrderBillController_1.default.Add(infor.address, infor.numberPhone, infor.id + "");
    var idOrder = check === null || check === void 0 ? void 0 : check.insertId;
    if (idOrder == undefined) {
        res.redirect(`${admin_1.default.address}shoppingcart?tb=khôngthêmđượcidhóađơn`);
        return;
    }
    var totalmoney = 0;
    var list = post.id.map((v, i) => __awaiter(void 0, void 0, void 0, function* () {
        var a = yield ChildProductController_1.default.Get(v);
        var q = parseInt(post.quantity[i]);
        var checklist = false;
        if (a && a.amount > 0 && a.idChildProduct && a.price && idOrder && a.idProduct) {
            totalmoney += a.price * q;
            var b = yield ChildProductController_1.default.DecreaseAmountChildProduct(v, q);
            var c;
            if (a === null || a === void 0 ? void 0 : a.idProduct) {
                c = yield ProductController_1.default.DecreaseAmountProduct(a.idProduct, q);
            }
            var d = yield OrderDetailController_1.default.Add(a.idChildProduct, idOrder, a.price, q);
            if ((d === null || d === void 0 ? void 0 : d.affectedRows) && (d === null || d === void 0 ? void 0 : d.affectedRows) > 0) {
                checklist = true;
                yield ShoppingCartController_1.default.DelProductInCart(v, infor === null || infor === void 0 ? void 0 : infor.id);
            }
            else {
                checklist = false;
                yield Promise.all([ChildProductController_1.default.IncreaseAmountChildProduct(v, q + ""),
                    ProductController_1.default.IncreaseAmountProduct(a.idProduct, q)]);
            }
        }
        return checklist;
    }));
    var checklist = yield Promise.all(list);
    yield OrderBillController_1.default.UpdateMoneyOrderBill(totalmoney, idOrder + "");
    res.redirect(`${admin_1.default.address}shoppingcart`);
}));
shoppingcart.post("/buynow", (0, client_1.verifi_post)({ lenght: 5, va: "cart" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var idChildPro = req.body.childproductId;
    var userid = req.cookies.userid;
    var check = yield ShoppingCartController_1.default.Has(idChildPro, userid);
    if (check) {
        res.redirect(`${admin_1.default.address}shoppingcart?tb=cotrongdo`);
        return;
    }
    var v = yield ShoppingCartController_1.default.InsertProductInCart(idChildPro, userid);
    if ((v === null || v === void 0 ? void 0 : v.affectedRows) && (v === null || v === void 0 ? void 0 : v.affectedRows) > 0) {
        res.redirect(`${admin_1.default.address}shoppingcart?tb=themthanhcong`);
        return;
    }
    res.redirect(`${admin_1.default.address}shoppingcart?tb=themthatbai`);
}));
exports.default = shoppingcart;
