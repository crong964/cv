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
const admin_1 = __importDefault(require("../../admin"));
const path_1 = __importDefault(require("path"));
const admin_2 = require("../../lib/admin");
const ImportBill_1 = __importDefault(require("../../model/ImportBill"));
const client_1 = require("../../middleware/client");
const ImportedBillController_1 = __importDefault(require("../../controller/ImportedBillController"));
const imPortBill = (0, express_1.Router)();
imPortBill.use(lib_1.vali);
imPortBill.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var status = req.query.status || "";
    var list = yield ImportBillController_1.default.GetAllImportBill({ status });
    var pa = path_1.default.join(admin_1.default.path, "server/page/html/importbill/importBillList.ejs");
    (0, admin_2.RenderHtmlFinal_AD)(req, res, pa, { list, s: ImportBill_1.default.statusS });
}));
imPortBill.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var data = req.body;
    console.log(data);
    if (data.list.length <= 0) {
        res.json({ err: true, mess: "không có sản phẩm nào" });
        return;
    }
    if (data.createdDay == undefined || data.finishDay == undefined) {
        res.json({ err: true, mess: "thiếu dư liệu" });
        return;
    }
    if (data.supplier == undefined || data.supplier.trim().length <= 0) {
        res.json({ err: true, mess: "thiếu dư liệu" });
        return;
    }
    var check;
    var idInforUser = parseInt(req.cookies.id);
    var HasTempProInCartAll = data.list.map((v) => {
        return TempCartController_1.default.Has(idInforUser, v.idChildProduct);
    });
    HasTempProInCartAll.push(ImportBillController_1.default.Has(data.idImportBill));
    check = yield Promise.all(HasTempProInCartAll);
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
    var insertOk = yield ImportBillController_1.default.InsertImportBill(data.idImportBill, idInforUser, data.createdDay, data.finishDay, data.supplier);
    if (!insertOk) {
        res.json({ err: true, mess: "có lỗi thêm hóa đơn" });
        return;
    }
    var insertAll = data.list.map((v) => __awaiter(void 0, void 0, void 0, function* () {
        yield ChildProductController_1.default.Has(v.idChildProduct);
        var temp = yield ChildProductController_1.default.Get(v.idChildProduct);
        var check;
        if (temp === null || temp === void 0 ? void 0 : temp.importPrice) {
            check = yield ContainImportBillController_1.default.InsertContainImportBill(v.idChildProduct, data.idImportBill, v.amount, temp.importPrice);
        }
        return check;
    }));
    var removeTemProAdd = data.list.map((v) => __awaiter(void 0, void 0, void 0, function* () {
        var check = yield TempCartController_1.default.RemoveTemProductInCart(v.idChildProduct, idInforUser);
        return check;
    }));
    var all = yield Promise.all(insertAll.concat(removeTemProAdd));
    console.log(all);
    res.json({ mess: "ok" });
}));
imPortBill.post("/listImportBill", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var list = yield ImportBillController_1.default.GetAllImportBill({});
    res.json(list);
}));
imPortBill.post("/removeBill", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var check = yield ImportBillController_1.default.RemoveBill(req.body.idBill);
    if (check) {
        res.json({ err: false, mess: "xóa thành công" });
    }
    else {
        res.json({ err: true, mess: "xóa thất bại" });
    }
}));
imPortBill.post("/UpdateImportBillStatus", (0, client_1.verifi_post)({ lenght: 10, va: "srt" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.body.id;
    var status = parseInt(req.body.status);
    var list = yield ContainImportBillController_1.default.GetAllByIdImportBill(id);
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.amount != element.importedAmount) {
            res.redirect(`/admin/containImportBill/${id}?tb=chuanhapdu`);
            return;
        }
    }
    var l = yield ImportedBillController_1.default.GetAllImportedBillById(id);
    for (let i = 0; i < l.length; i++) {
        const element = l[i];
        if (element.status === 'chưa thanh toán') {
            res.redirect(`/admin/containImportBill/${id}?tb=chuanhapdu`);
            return;
        }
    }
    var check = yield ImportBillController_1.default.UpdateStatus(id, 1);
    res.redirect(`/admin/containImportBill/${id}?tb=thanhcong`);
}));
exports.default = imPortBill;
