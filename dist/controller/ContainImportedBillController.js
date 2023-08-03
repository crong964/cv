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
const ContainImportedBillDB_1 = require("../database/ContainImportedBillDB");
const lib_1 = require("../lib/lib");
const ContainImportedBill_1 = __importDefault(require("../model/ContainImportedBill"));
class ContainImportedBillController {
    constructor() { }
    InsertContainImportedBill(idChildProduct, idImportedBill, amount, importPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = false;
            yield (0, ContainImportedBillDB_1.InsertContainImportedBillDB)(idChildProduct, idImportedBill, amount, importPrice)
                .then((v) => {
                check = true;
            })
                .catch((v) => {
                check = false;
            });
            return check;
        });
    }
    GetAllByIdImportedBill(idImportedBill) {
        return __awaiter(this, void 0, void 0, function* () {
            var list = [];
            yield (0, ContainImportedBillDB_1.GetAllByIdImportedBillDB)(idImportedBill)
                .then((v) => {
                for (let i = 0; i < v.length; i++) {
                    const element = v[i];
                    var containimportedbill = new ContainImportedBill_1.default();
                    containimportedbill.setAll(element);
                    list.push(containimportedbill);
                }
            })
                .catch((v) => {
                (0, lib_1.err)("GetAllByIdImportedBill ContainImportedBillController", v);
            });
            return list;
        });
    }
}
exports.default = new ContainImportedBillController();
