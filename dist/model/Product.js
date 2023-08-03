"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Product extends BaseModel_1.default {
    constructor() {
        super();
        this.idProduct = undefined;
        this.Price = undefined;
        this.amount = undefined;
        this.idBigCategory = undefined;
        this.idSmallCategory = undefined;
        this.importPrices = undefined;
        this.image = undefined;
        this.namePro = undefined;
        this.bt = undefined;
    }
    setAll(p) {
        super.setAll(p);
    }
}
exports.default = Product;
