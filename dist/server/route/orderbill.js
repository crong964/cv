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
const OrderBillController_1 = __importDefault(require("../../controller/OrderBillController"));
const admin_1 = require("../../lib/admin");
const path_1 = require("path");
const admin_2 = __importDefault(require("../../admin"));
const OrderBill_1 = __importDefault(require("../../model/OrderBill"));
const OrderDetailController_1 = __importDefault(require("../../controller/OrderDetailController"));
const sercurity_1 = __importDefault(require("../../lib/sercurity"));
const client_1 = require("../../middleware/client");
const PayInvoiceControllder_1 = __importDefault(require("../../controller/PayInvoiceControllder"));
const PayInvoice_1 = __importDefault(require("../../model/PayInvoice"));
const orderbill = (0, express_1.default)();
orderbill.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var pa = (0, path_1.join)(admin_2.default.path, '/server/page/html/orderbill/orderbill.ejs');
    var limit = {
        start: parseInt(req.query.start) || 0,
        count: parseInt(req.query.count) || 10,
        fiel: req.query.type,
        va: req.query.va
    };
    var list = yield OrderBillController_1.default.GetAllLimit(limit);
    var srt = sercurity_1.default.CreateBase64Url(JSON.stringify(sercurity_1.default.CreateSign(14)));
    (0, admin_1.RenderHtmlFinal_AD)(req, res, pa, { list, ship: OrderBill_1.default.shipmentstatus, pay: OrderBill_1.default.paystatus, srt: srt });
}));
orderbill.get('/billDetail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    var pa = (0, path_1.join)(admin_2.default.path, '/server/page/html/orderbill/orderDetail.ejs');
    var id = req.query.id;
    if (id == undefined) {
        res.redirect(`${admin_2.default}admin/orderbill/`);
        return;
    }
    var l = yield Promise.all([
        OrderBillController_1.default.GetOrderBill(id),
        OrderDetailController_1.default.GetAllByIdOder(id), PayInvoiceControllder_1.default.GetAllPayInvoiceByBilId(id)
    ]);
    // public static  paystatus = ["chưa thành toán", "đã thành toán", "thành toán sau","hoàn lại"]
    // public static shipmentstatus = ['chưa giao', 'đang giao','hoàn thành giào]
    switch ((_a = l[0]) === null || _a === void 0 ? void 0 : _a.ship) {
        case 0:
            break;
        default:
            break;
    }
    var srt = sercurity_1.default.CreateBase64Url(JSON.stringify(sercurity_1.default.CreateSign(14)));
    (0, admin_1.RenderHtmlFinal_AD)(req, res, pa, { bill: l[0], list: l[1], srt: srt, payl: l[2], statusS: PayInvoice_1.default.statusS });
}));
orderbill.post('/ship', (0, client_1.verifi_post)({ lenght: 14, va: 'srt' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var ship = parseInt(req.body.ship);
    var id = req.body.id;
    var check = yield OrderBillController_1.default.UpdateShip(id, ship);
    res.redirect(`${admin_2.default.address}admin/orderbill/billDetail?id=${id}`);
}));
exports.default = orderbill;
