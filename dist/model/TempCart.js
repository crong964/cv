"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("../admin"));
const BaseModel_1 = __importDefault(require("./BaseModel"));
class TempCart extends BaseModel_1.default {
    constructor() {
        super();
        this.idChildProduct = undefined;
        this.nameChildProduct = undefined;
        this.image = undefined;
        this.importPrice = undefined;
    }
    setAll(p) {
        super.setAll(p);
        if (this.image) {
            this.image = admin_1.default.address + `static/imageProduct/${this.image}`;
        }
    }
}
exports.default = TempCart;
