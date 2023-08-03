"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib/lib");
const BaseModel_1 = __importDefault(require("./BaseModel"));
class ImportedBill extends BaseModel_1.default {
    constructor() {
        super();
        this.createdDay = undefined;
        this.idForUser = undefined;
        this.idImportBill = undefined;
        this.idImportedBill = undefined;
        this.status = undefined;
        this.paymentDate = undefined;
    }
    setAll(p) {
        super.setAll(p);
        var date;
        if (this.paymentDate) {
            date = new Date(this.paymentDate);
            this.paymentDate = (0, lib_1.formatDate)(date.getTime() + "");
        }
        if (this.createdDay) {
            date = new Date(this.createdDay);
            this.createdDay = (0, lib_1.formatDate)(date.getTime() + "");
        }
    }
}
exports.default = ImportedBill;
