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
const OrderBillController_1 = __importDefault(require("../../controller/OrderBillController"));
const client_2 = require("../../lib/client");
const admin_1 = __importDefault(require("../../admin"));
const path_1 = require("path");
const OrderBill_1 = __importDefault(require("../../model/OrderBill"));
const sercurity_1 = __importDefault(require("../../lib/sercurity"));
const OrderDetailController_1 = __importDefault(require("../../controller/OrderDetailController"));
const lib_1 = require("../../lib/lib");
const PayInvoiceControllder_1 = __importDefault(require("../../controller/PayInvoiceControllder"));
const orderbill = (0, express_1.Router)();
orderbill.use((0, client_1.UserAuthorization)(), (0, client_1.AuthorOrUnauthor)());
orderbill.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.cookies.userid;
    var type = req.query.type;
    var va = req.query.va || "0";
    var list;
    if (type && (type == lib_1.statusBill.pay || type == lib_1.statusBill.ship)) {
        list = yield OrderBillController_1.default.GetAllLimiByUserId(id, { fiel: type, va: va });
    }
    else {
        list = yield OrderBillController_1.default.GetAllByUserid(id);
    }
    var pa = (0, path_1.join)(admin_1.default.path, 'client/page/html/orderbill/orderbilllist.ejs');
    (0, client_2.RenderHtmlFinal)(req, res, pa, {
        list: list,
        ship: OrderBill_1.default.shipmentstatus, pay: OrderBill_1.default.paystatus
    });
}));
orderbill.get("/bill", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    var id = req.query.id;
    if (id == undefined) {
        res.redirect(`${admin_1.default.address}orderbill`);
        return;
    }
    var ls = yield Promise.all([OrderDetailController_1.default.GetAllByIdOder(id),
        OrderBillController_1.default.GetOrderBill(id),
        PayInvoiceControllder_1.default.GetAllPayInvoiceByBilId(id)]);
    if (((_a = ls[1]) === null || _a === void 0 ? void 0 : _a.userid) !== parseInt(req.cookies.userid)) {
        res.redirect(`${admin_1.default.address}orderbill`);
        return;
    }
    var pa = (0, path_1.join)(admin_1.default.path, 'client/page/html/orderbill/orderbillDetail.ejs');
    var ser = sercurity_1.default.CreateBase64Url(JSON.stringify(sercurity_1.default.CreateSign(13)));
    var pay = sercurity_1.default.CreateBase64Url(JSON.stringify(sercurity_1.default.CreateSign(20)));
    var s = yield (yield fetch('https://sandbox.vnpayment.vn/qrpayauth/api/merchant/get_bank_list', {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "post",
        body: "tmn_code=7VPICSE9"
    })).json();
    var s = s.map((v) => {
        v.logo_link = v.logo_link.replace("~/", "");
        return v;
    })
        .filter((v) => {
        if (v.logo_link.indexOf(".png") > 0) {
            return true;
        }
        return false;
    });
    (0, client_2.RenderHtmlFinal)(req, res, pa, { list: ls[0], bill: ls[1], payl: ls[2], ser, pay, s });
}));
orderbill.post("/paid", (0, client_1.verifi_post)({ lenght: 13, va: 'ser' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var idbill = req.body.idbill;
    var id = req.cookies.userid;
    var bill = yield OrderBillController_1.default.GetOrderBill(idbill);
    if ((bill === null || bill === void 0 ? void 0 : bill.userid) !== parseInt(id)) {
        res.json({
            err: true,
            mess: 'người dùng không có hàng'
        });
        return;
    }
    var check = yield OrderBillController_1.default.UpdatePay(idbill, 2);
    if ((check === null || check === void 0 ? void 0 : check.affectedRows) && (check === null || check === void 0 ? void 0 : check.affectedRows) >= 1) {
        res.json({
            err: true,
            mess: 'thành công'
        });
        return;
    }
    res.json({
        err: false,
        mess: 'thất bại'
    });
    return;
}));
exports.default = orderbill;
