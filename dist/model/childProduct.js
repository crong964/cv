"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class ChildProduct extends BaseModel_1.default {
    constructor() {
        super();
        this.idChildProduct = undefined;
        this.nameChildProduct = undefined;
        this.idProduct = undefined;
        this.image = undefined;
        this.importPrice = 0;
        this.price = 0;
        this.amount = 0;
    }
    setAll(p) {
        super.setAll(p);
    }
}
exports.default = ChildProduct;
