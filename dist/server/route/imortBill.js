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
const ChildProductController_1 = __importDefault(require("../../controller/ChildProductController"));
const ContainImportBillController_1 = __importDefault(require("../../controller/ContainImportBillController"));
const ImportBillController_1 = __importDefault(require("../../controller/ImportBillController"));
const TempCartController_1 = __importDefault(require("../../controller/TempCartController"));
const lib_1 = require("../../lib/lib");
const imPortBill = (0, express_1.Router)();
imPortBill.use(lib_1.vali);
imPortBill.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var data = req.body;
    var check;
    var idInforUser = parseInt(req.cookies.id);
    var HasTempProInCartAll = data.list.map((v) => {
        return TempCartController_1.default.HasTempProInCart(idInforUser, v.idChildProduct);
    });
    HasTempProInCartAll.push(ImportBillController_1.default.HasImportBill(data.idImportBill));
    var HasChildProductAll = data.list.map((v) => {
        return ChildProductController_1.default.HasChildProduct(v.idChildProduct);
    });
    check = yield Promise.all(HasChildProductAll.concat(HasTempProInCartAll));
    if (check[check.length - 1]) {
        res.json({ err: true, mess: "đã tồn tại hóa đơn này" });
        return;
    }
    for (let i = 0; i < check.length - 1; i++) {
        const e = check[i];
        if (!e) {
            return res.json({ err: true, mess: "không tồn tại sản phẩm trong giỏ" });
        }
    }
    var insertOk = yield ImportBillController_1.default.InsertImportBill(data.idImportBill, idInforUser);
    if (!insertOk) {
        res.json({ err: true, mess: "có lỗi thêm hóa đơn" });
        return;
    }
    var insertAll = data.list.map((v) => {
        var _a;
        var importPrice = (_a = ChildProductController_1.default.GetChildProduct(v.idChildProduct)) === null || _a === void 0 ? void 0 : _a.importPrice;
        if (importPrice) {
            return ContainImportBillController_1.default.InsertContainImportBill(v.idChildProduct, data.idImportBill, v.amount, importPrice);
        }
    });
    var removeTemProAdd = data.list.map((v) => {
        return TempCartController_1.default.RemoveTemProductInCart(v.idChildProduct, idInforUser);
    });
    var all = yield Promise.all(insertAll.concat(removeTemProAdd));
    console.log(all);
    res.json({ mess: "ok" });
}));
imPortBill.post("/listImportBill", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var list = yield ImportBillController_1.default.GetAllImportBill();
    res.json(list);
}));
exports.default = imPortBill;
