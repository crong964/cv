"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class ContainImportedBill extends BaseModel_1.default {
    constructor() {
        super();
        this.importedAmount = 0;
        this.importPrice = 0;
        this.idChildProduct = undefined;
        this.nameChildProduct = undefined;
        this.image = undefined;
    }
    setAll(p) {
        super.setAll(p);
    }
}
exports.default = ContainImportedBill;
