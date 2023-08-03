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
const ShoppingCartDB_1 = require("../database/ShoppingCartDB");
const lib_1 = require("../lib/lib");
const ShoppingCart_1 = __importDefault(require("../model/ShoppingCart"));
class ShoppingCartController {
    constructor() {
    }
    InsertProductInCart(idChildPro, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            if ((yield this.Has(idChildPro, idUser)) == false) {
                check = (yield (0, ShoppingCartDB_1.InsertProductInCartDB)(idChildPro, idUser));
            }
            return check;
        });
    }
    Has(idChildPro, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = false;
            try {
                var ls = yield (0, ShoppingCartDB_1.GetProductInCartDB)(idChildPro, idUser);
                for (let i = 0; i < ls.length; i++) {
                    check = true;
                }
            }
            catch (error) {
                (0, lib_1.err)('Has ShoppingCartController', error);
            }
            return check;
        });
    }
    DelProductInCart(idChildPro, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield (0, ShoppingCartDB_1.DelProductInCartDB)(idChildPro, idUser);
            return check;
        });
    }
    GetAllProductInCar(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var ls = [];
            try {
                var l = yield (0, ShoppingCartDB_1.GetAllProductInCartDB)(idUser);
                for (let i = 0; i < l.length; i++) {
                    const element = l[i];
                    var tem = new ShoppingCart_1.default();
                    tem.setAll(element);
                    ls.push(element);
                }
            }
            catch (error) {
                (0, lib_1.err)('GetAllProductInCar ShoppingCartController', error);
            }
            return ls;
        });
    }
    Get(idChildPro, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var temp;
            try {
                var list = yield (0, ShoppingCartDB_1.GetProductInCartDB)(idChildPro, idUser);
                for (let i = 0; i < list.length; i++) {
                    const element = list[i];
                    temp = new ShoppingCart_1.default();
                    temp.setAll(element);
                    break;
                }
            }
            catch (error) {
                (0, lib_1.err)('Get ShoppingCartController', error);
            }
            return temp;
        });
    }
}
exports.default = new ShoppingCartController();
