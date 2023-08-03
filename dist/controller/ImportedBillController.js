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
const ImportedBillDB_1 = require("../database/ImportedBillDB");
const lib_1 = require("../lib/lib");
const ImportedBill_1 = __importDefault(require("../model/ImportedBill"));
class ImportedBillController {
    constructor() { }
    Has(idImportedBill) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = ImportedBillController.list.has(idImportedBill);
            if (check) {
                return check;
            }
            yield (0, ImportedBillDB_1.GetImportedBillDB)(idImportedBill)
                .then((v) => {
                for (let i = 0; i < v.length; i++) {
                    const element = v[i];
                    var importedbill = new ImportedBill_1.default();
                    importedbill.setAll(element);
                    if (importedbill.idImportedBill) {
                        ImportedBillController.list.set(importedbill.idImportedBill, importedbill);
                    }
                    check = true;
                }
            })
                .catch((v) => {
                check = false;
                (0, lib_1.err)("HasImportedBill ImportedBillController", v);
            });
            return check;
        });
    }
    InsertImportedBill(idImportBill, idImportedBill, idForUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = false;
            yield (0, ImportedBillDB_1.InsertImportedBillDB)(idImportBill, idImportedBill, idForUser)
                .then((v) => {
                check = true;
            })
                .catch((v) => {
                check = false;
                (0, lib_1.err)("InsertImportedBill ImportedBillController", v);
            });
            return check;
        });
    }
    GetAllImportedBillById(idImportBill) {
        return __awaiter(this, void 0, void 0, function* () {
            var list = [];
            yield (0, ImportedBillDB_1.GetAllImportedBillByIdDB)(idImportBill)
                .then((v) => {
                for (let i = 0; i < v.length; i++) {
                    const element = v[i];
                    var importedbill = new ImportedBill_1.default();
                    importedbill.setAll(element);
                    if (importedbill.idImportedBill) {
                        ImportedBillController.list.set(importedbill.idImportedBill, importedbill);
                        list.push(importedbill);
                    }
                }
            })
                .catch((v) => {
                (0, lib_1.err)("GetAllImportedBillById ImportedBillController", v);
            });
            return list;
        });
    }
    GetImportedBillById(idImportedBill) {
        return __awaiter(this, void 0, void 0, function* () {
            var importedBill;
            try {
                if ((yield this.Has(idImportedBill)) == true) {
                    importedBill = ImportedBillController.list.get(idImportedBill);
                }
            }
            catch (error) {
                (0, lib_1.err)("GetImportedBillById ImportedBillController", error);
            }
            return importedBill;
        });
    }
    UpdateStatusImportedBill(idImportedBill, paymentDate, status) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = undefined;
            try {
                check = (yield (0, ImportedBillDB_1.UpdateStatusImportedBillDB)(idImportedBill, paymentDate, status));
                ImportedBillController.list.delete(idImportedBill);
            }
            catch (error) {
                (0, lib_1.err)("UpdateStatusImportedBill ImportedBillController", error);
            }
            return check;
        });
    }
}
ImportedBillController.list = new Map();
exports.default = new ImportedBillController();
