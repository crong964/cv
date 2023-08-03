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
    var ser = sercurity_1.default.CreateBase64Url(JSON.stringify(sercurity_1.default.CreateSign(13)));
    (0, client_2.RenderHtmlFinal)(req, res, pa, {
        list: list, ser: ser,
        ship: OrderBill_1.default.shipmentstatus, pay: OrderBill_1.default.paystatus
    });
}));
orderbill.post("/", (0, client_1.verifi_post)({ lenght: 13, va: 'ser' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.body.id;
    var ls = yield Promise.all([OrderDetailController_1.default.GetAllByIdOder(id),
        OrderBillController_1.default.GetOrderBill(id)]);
    var pa = (0, path_1.join)(admin_1.default.path, 'client/page/html/orderbill/orderbillDetail.ejs');
    (0, client_2.RenderHtmlFinal)(req, res, pa, { list: ls[0], bill: ls[1] });
}));
exports.default = orderbill;
