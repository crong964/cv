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
const ImportBillDB_1 = require("../database/ImportBillDB");
const lib_1 = require("../lib/lib");
const ImportBill_1 = __importDefault(require("../model/ImportBill"));
class ImportBillController {
    constructor() { }
    Has(idImportBill) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = ImportBillController.listImportBill.has(idImportBill);
            if (check) {
                return check;
            }
            yield (0, ImportBillDB_1.GetImportBillByIdDB)(idImportBill)
                .then((v) => {
                if (v.length > 0) {
                    var importBill = new ImportBill_1.default();
                    importBill.setAll(v[0]);
                    if (importBill.idImportBill) {
                        ImportBillController.listImportBill.set(importBill.idImportBill, importBill);
                    }
                    check = true;
                }
                else {
                    check = false;
                }
            })
                .catch((v) => {
                (0, lib_1.err)("HasImportBill ImportBillController", v);
                check = false;
            });
            return check;
        });
    }
    GetImportBillById(idImportBill) {
        return __awaiter(this, void 0, void 0, function* () {
            var temp = ImportBillController.listImportBill.get(idImportBill);
            if (temp) {
                return temp;
            }
            yield (0, ImportBillDB_1.GetImportBillByIdDB)(idImportBill)
                .then((v) => {
                if (v.length > 0) {
                    temp = new ImportBill_1.default();
                    temp.setAll(v[0]);
                    if (temp.idImportBill) {
                        ImportBillController.listImportBill.set(temp.idImportBill, temp);
                    }
                }
            })
                .catch((v) => {
                (0, lib_1.err)("GetImportBillById ImportBillController", v);
            });
            return temp;
        });
    }
    InsertImportBill(idImportBill, idForUser, createdDay, finishDay, supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = false;
            yield (0, ImportBillDB_1.InsertImportBillDB)(idImportBill, idForUser, createdDay, finishDay, supplier)
                .then((v) => {
                check = true;
            })
                .catch((v) => {
                (0, lib_1.err)("InsertImportBill ImportBillController", v);
            });
            return check;
        });
    }
    GetAllImportBill(pa) {
        return __awaiter(this, void 0, void 0, function* () {
            pa.status = pa.status || "";
            var list = [];
            try {
                var v = yield (0, ImportBillDB_1.GetAllImportBillDB)(pa);
                for (let i = 0; i < v.length; i++) {
                    const element = v[i];
                    let importBill = new ImportBill_1.default();
                    importBill.setAll(element);
                    if (importBill.idImportBill) {
                        ImportBillController.listImportBill.set(importBill.idImportBill, importBill);
                        list.push(importBill);
                    }
                }
            }
            catch (error) {
                (0, lib_1.err)("GetAllImportBill ImportBillController", error);
            }
            return list;
        });
    }
    RemoveBill(idImportBill) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, ImportBillDB_1.RemoveBill)(idImportBill));
                ImportBillController.listImportBill.delete(idImportBill);
            }
            catch (error) {
                (0, lib_1.err)("RemoveBill ImportBillController", error);
            }
            return check;
        });
    }
    UpdateStatus(idImportBill, status) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, ImportBillDB_1.UpdateStatusDB)(idImportBill, status));
                ImportBillController.listImportBill.delete(idImportBill);
            }
            catch (error) {
                (0, lib_1.err)("UpdateStatus ImportBillController", error);
            }
            return check;
        });
    }
}
ImportBillController.listImportBill = new Map();
exports.default = new ImportBillController();
