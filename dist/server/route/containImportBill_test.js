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
const ContainImportBillController_1 = __importDefault(require("../../controller/ContainImportBillController"));
const ImportBillController_1 = __importDefault(require("../../controller/ImportBillController"));
const ImportedBillController_1 = __importDefault(require("../../controller/ImportedBillController"));
const lib_1 = require("../../lib/lib");
const containImportBill = (0, express_1.Router)();
containImportBill.use(lib_1.vali);
containImportBill.get("/getAllchildProInImportBill/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idImportBill } = req.query;
    if (idImportBill == undefined) {
        res.json({ err: true, mess: "không có bill này" });
        return;
    }
    var check = yield ImportBillController_1.default.Has(idImportBill);
    if (!check) {
        res.json({ err: true, mess: "không có bill này" });
        return;
    }
    var bill = yield ImportBillController_1.default.GetImportBillById(idImportBill);
    var list = yield ContainImportBillController_1.default.GetAllByIdImportBill(idImportBill);
    var listImportedBill = yield ImportedBillController_1.default.GetAllImportedBillById(idImportBill);
    res.json({ bill: bill, listImportChildPro: list, listImportedBill: listImportedBill });
}));
exports.default = containImportBill;
