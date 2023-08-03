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
const ContainImportBillDB_1 = require("../database/ContainImportBillDB");
const lib_1 = require("../lib/lib");
const ContainImportBill_1 = __importDefault(require("../model/ContainImportBill"));
class ContainImportBillController {
    constructor() { }
    InsertContainImportBill(idChildProduct, idImportBill, amount, importPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = false;
            yield (0, ContainImportBillDB_1.InsertContainImportBillDB)(idChildProduct, idImportBill, amount, importPrice)
                .then((v) => {
                check = true;
            })
                .catch((v) => {
                (0, lib_1.err)("InsertContainImportBill ContainImportBillController", v);
                check = false;
            });
            return check;
        });
    }
    GetAllByIdImportBill(idImportBill) {
        return __awaiter(this, void 0, void 0, function* () {
            var list = [];
            yield (0, ContainImportBillDB_1.GetAllByIdImportBillDB)(idImportBill)
                .then((v) => {
                for (let i = 0; i < v.length; i++) {
                    const element = v[i];
                    var containimportbill = new ContainImportBill_1.default();
                    containimportbill.setAll(element);
                    if (containimportbill.idChildProduct) {
                        list.push(containimportbill);
                        ContainImportBillController.listContainImportBill.set(`${idImportBill}-${containimportbill.idChildProduct}`, containimportbill);
                    }
                }
            })
                .catch((v) => {
                (0, lib_1.err)("GetAllByIdImportBill ContainImportBillController", v);
            });
            return list;
        });
    }
    IncreaseImportedAmount(idImportBill, idChildProduct, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            var has = yield this.Has(idImportBill, idChildProduct);
            if (!has) {
                return has;
            }
            yield (0, ContainImportBillDB_1.UpdateImportedQuantityContainImportBillDB)(idImportBill, idChildProduct, quantity)
                .then((v) => {
                has = true;
                var tem = ContainImportBillController.listContainImportBill.get(`${idImportBill}-${idChildProduct}`);
                if (tem && tem.importedAmount != undefined) {
                    tem.importedAmount += parseInt(quantity + "");
                }
            })
                .catch((v) => {
                (0, lib_1.err)("IncreaseImportedAmount ContainImportBillController", v);
                has = false;
            });
            return has;
        });
    }
    Has(idImportBill, idChildProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = ContainImportBillController.listContainImportBill.has(`${idImportBill}-${idChildProduct}`);
            if (check) {
                return check;
            }
            yield (0, ContainImportBillDB_1.GetContainImportChildProductDB)(idImportBill, idChildProduct)
                .then((v) => {
                for (let i = 0; i < v.length; i++) {
                    check = true;
                    const element = v[i];
                    var tem = new ContainImportBill_1.default();
                    tem.setAll(element);
                    ContainImportBillController.listContainImportBill.set(`${idImportBill}-${idChildProduct}`, tem);
                    break;
                }
            })
                .catch((v) => {
                (0, lib_1.err)("HasContainImport ContainImportBillController", v);
                check = false;
            });
            return check;
        });
    }
    CheckImportedQuantity(idImportBill, idChildProduct, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = false;
            var key = `${idImportBill}-${idChildProduct}`;
            var temp = ContainImportBillController.listContainImportBill.get(key);
            if (temp != undefined &&
                temp.amount != undefined &&
                temp.importedAmount != undefined) {
                if (temp.amount >= temp.importedAmount + quantity) {
                    check = true;
                }
                else {
                    check = false;
                }
            }
            return check;
        });
    }
}
ContainImportBillController.listContainImportBill = new Map();
exports.default = new ContainImportBillController();
