"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class ContainImportBill extends BaseModel_1.default {
    constructor() {
        super();
        this.importedAmount = 0;
        this.importPrice = 0;
        this.idChildProduct = undefined;
        this.amount = 0;
        this.nameChildProduct = undefined;
        this.image = undefined;
    }
}
exports.default = ContainImportBill;
