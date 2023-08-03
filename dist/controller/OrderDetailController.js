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
const OrderDetailDB_1 = require("../database/OrderDetailDB");
const lib_1 = require("../lib/lib");
const OrderDetail_1 = __importDefault(require("../model/OrderDetail"));
class OrderDetailController {
    constructor() {
    }
    Add(idChildProduct, idorder, price, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, OrderDetailDB_1.AddDB)(idChildProduct, idorder, price, quantity));
            }
            catch (error) {
                (0, lib_1.err)("Add OrderDetailController", error);
                check = undefined;
            }
            return check;
        });
    }
    Update(idChildProduct, idorder, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, OrderDetailDB_1.UpdateDB)(idChildProduct, idorder, quantity));
            }
            catch (error) {
                (0, lib_1.err)("Update OrderDetailController", error);
            }
            return check;
        });
    }
    GetAllByIdOder(idOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = [];
            try {
                var s = yield (0, OrderDetailDB_1.GetAllByIdOderDB)(idOrder);
                for (let i = 0; i < s.length; i++) {
                    const element = s[i];
                    var te = new OrderDetail_1.default();
                    te.setAll(element);
                    ls.push(te);
                }
            }
            catch (error) {
                (0, lib_1.err)("GetAllByIdOder OrderDetailController", error);
            }
            return ls;
        });
    }
}
exports.default = new OrderDetailController();
