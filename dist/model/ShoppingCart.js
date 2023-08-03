"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChildProduct_1 = __importDefault(require("./ChildProduct"));
class ShoppingCart extends ChildProduct_1.default {
    constructor() {
        super();
        this.idUser = 0;
    }
}
exports.default = ShoppingCart;
