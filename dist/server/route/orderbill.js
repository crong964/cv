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
const orderbill = (0, express_1.default)();
orderbill.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var pa = (0, path_1.join)(admin_2.default.path, '/server/page/html/orderbill/orderbill.ejs');
    var list = yield OrderBillController_1.default.GetAllLimit();
    (0, admin_1.RenderHtmlFinal_AD)(req, res, pa, { list, ship: OrderBill_1.default.shipmentstatus, pay: OrderBill_1.default.paystatus });
}));
orderbill.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var pa = (0, path_1.join)(admin_2.default.path, '/server/page/html/orderbill/orderDetail.ejs');
    var id = req.params.id;
    var l = yield Promise.all([OrderBillController_1.default.GetOrderBill(id), OrderDetailController_1.default.GetAllByIdOder(id)]);
    (0, admin_1.RenderHtmlFinal_AD)(req, res, pa, { bill: l[0], de: l[1] });
}));
exports.default = orderbill;
