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
const ContainImportedBillController_1 = __importDefault(require("../../controller/ContainImportedBillController"));
const ImportedBillController_1 = __importDefault(require("../../controller/ImportedBillController"));
const lib_1 = require("../../lib/lib");
const path_1 = __importDefault(require("path"));
const admin_1 = __importDefault(require("../../admin"));
const containImportedBill = (0, express_1.Router)();
containImportedBill.use(lib_1.vali);
containImportedBill.get("/:idImportedBill", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idImportedBill } = req.params;
    if (idImportedBill == undefined) {
        res.json({ list: [] });
        return;
    }
    var check = yield ImportedBillController_1.default.Has(idImportedBill);
    if (!check) {
        res.json({ err: true, mess: "không có" });
        return;
    }
    var f = yield Promise.all([
        ContainImportedBillController_1.default.GetAllByIdImportedBill(idImportedBill),
        ImportedBillController_1.default.GetImportedBillById(idImportedBill)
    ]);
    var pa = path_1.default.join(admin_1.default.path, "/server/page/html/imported_product_table.ejs");
    res.render(pa, { list: f[0], importedBill: f[1], ip: admin_1.default.address });
}));
exports.default = containImportedBill;
