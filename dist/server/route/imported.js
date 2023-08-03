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
const ContainImportedBillController_1 = __importDefault(require("../../controller/ContainImportedBillController"));
const ImportedBillController_1 = __importDefault(require("../../controller/ImportedBillController"));
const ProductController_1 = __importDefault(require("../../controller/ProductController"));
const lib_1 = require("../../lib/lib");
const importedBill = (0, express_1.Router)();
importedBill.use(lib_1.vali);
importedBill.post("/addNewImportedBill", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var datapost = req.body;
    var idUser = parseInt(req.cookies.id);
    // kiểm tra có sản phẩm con
    // kiểm tra sản phẩm có chứa trong hóa đơn nhập
    // kiểm tra mã hóa đơn nhập hàng tồn tại
    // kiểm tra số lượng nhập bé hơn số lượng đặt
    // tạo hóa đơn nhập 
    // thêm dữ liệu chi tiết trong hóa đơn nhập
    // tăng số lương nhập trong hóa đơn đặt
    // tăng số lượng sản con
    // tăng số lượng sản chính
    var check = datapost.list.map((v) => {
        return ChildProductController_1.default.HasChildProduct(v.idChildPro);
    });
    check.concat(datapost.list.map((v) => {
        return ContainImportBillController_1.default.HasContainImport(datapost.idImportBill, v.idChildPro);
    }));
    check.push(ImportedBillController_1.default.HasImportedBill(datapost.idImportedBill));
    var kq = yield Promise.all(check);
    for (let i = 0; i < kq.length - 1; i++) {
        const element = kq[i];
        if (!element) {
            res.json({ err: true, mess: "không tồn tại" });
            return;
        }
    }
    if (!kq[kq.length - 1]) {
        res.json({ err: true, mess: "có hóa đơn nhập rồi" });
        return;
    }
    var checkQuantitylist = datapost.list.map((v) => {
        return ContainImportBillController_1.default.CheckQuantity(datapost.idImportBill, v.idChildPro, v.importQuantity);
    });
    kq = yield Promise.all(checkQuantitylist);
    for (let i = 0; i < kq.length; i++) {
        const element = kq[i];
        if (!element) {
            res.json({
                err: true,
                mess: "số lượng sản phẩm nhập vượt quá số lương đặt",
            });
            return;
        }
    }
    var checkIn = yield ImportedBillController_1.default.InsertImportedBill(datapost.idImportBill, datapost.idImportedBill, idUser);
    if (!checkIn) {
        res.json({
            err: true,
            mess: "lỗi thêm hóa đơn nhập",
        });
        return;
    }
    var lastcheck = datapost.list.map((v) => __awaiter(void 0, void 0, void 0, function* () {
        let check = false;
        var childpro = yield ChildProductController_1.default.GetChildProduct(v.idChildPro);
        if (!childpro ||
            !childpro.importPrice ||
            !childpro.idProduct ||
            !childpro.idChildProduct) {
            check = false;
            return check;
        }
        check = yield ContainImportedBillController_1.default.InsertContainImportedBill(v.idChildPro, datapost.idImportedBill, v.importQuantity, childpro.importPrice);
        if (!check) {
            return check;
        }
        check = yield ContainImportBillController_1.default.IncreaseImportedAmount(datapost.idImportBill, v.idChildPro, v.importQuantity);
        if (!check) {
            return check;
        }
        check = yield ChildProductController_1.default.IncreaseAmountChildProduct(childpro.idChildProduct, v.importQuantity);
        if (!check) {
            return check;
        }
        check = yield ProductController_1.default.IncreaseAmountProduct(childpro.idProduct, v.importQuantity);
        if (!check) {
            return check;
        }
        return check;
    }));
    var lastCheckList = yield Promise.all(lastcheck);
    for (let i = 0; i < lastCheckList.length; i++) {
        const element = lastCheckList[i];
        if (!element) {
            res.json({
                err: true,
                mess: "danh sách cuối sai",
            });
            return;
        }
    }
    res.json({ err: false, mess: "thêm hóa đơn nhập thành công" });
}));
