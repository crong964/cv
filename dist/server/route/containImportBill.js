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
const path_1 = require("path");
const admin_1 = __importDefault(require("../../admin"));
const ImportBillController_1 = __importDefault(require("../../controller/ImportBillController"));
const ContainImportBillController_1 = __importDefault(require("../../controller/ContainImportBillController"));
const ImportedBillController_1 = __importDefault(require("../../controller/ImportedBillController"));
const sercurity_1 = __importDefault(require("../../lib/sercurity"));
const containImportBill = (0, express_1.Router)();
containImportBill.get("/:idImportBill", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idImportBill } = req.params;
    if (idImportBill == undefined) {
        res.json({ err: true, mess: "không có bill này" });
        return;
    }
    var check = yield ImportBillController_1.default.Has(idImportBill);
    if (!check) {
        res.json({ err: true, mess: "không có bill này" });
        return;
    }
    var list = yield Promise.all([ImportBillController_1.default.GetImportBillById(idImportBill),
        ContainImportBillController_1.default.GetAllByIdImportBill(idImportBill),
        ImportedBillController_1.default.GetAllImportedBillById(idImportBill)]);
    var listImportChildPro = list[1];
    var dem = 0;
    for (let i = 0; i < listImportChildPro.length; i++) {
        const e = listImportChildPro[i];
        if (e.amount > e.importedAmount) {
            dem += 1;
        }
    }
    var srt = sercurity_1.default.CreateBase64Url(JSON.stringify(sercurity_1.default.CreateSign(10)));
    var pa = (0, path_1.join)(admin_1.default.path, "/server/page/html/containImportBill/allchildProInImportBill.ejs");
    res.render(pa, {
        dem: dem,
        idImportedBill: new Date().getTime(),
        ip: admin_1.default.address,
        bill: list[0],
        listImportChildPro: list[1],
        listImportedBill: list[2],
        srt: srt
    });
}));
exports.default = containImportBill;
