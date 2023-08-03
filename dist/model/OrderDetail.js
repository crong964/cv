"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChildProduct_1 = __importDefault(require("./ChildProduct"));
class OrderDetail extends ChildProduct_1.default {
    constructor() {
        super();
        this.idorder = undefined;
        this.price = 0;
        this.quantity = 0;
    }
}
exports.default = OrderDetail;
