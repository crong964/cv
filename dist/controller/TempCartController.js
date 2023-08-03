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
const TempCartDB_1 = require("../database/TempCartDB");
const lib_1 = require("../lib/lib");
const TempCart_1 = __importDefault(require("../model/TempCart"));
class TempCartController {
    constructor() { }
    Has(idInforUser, idChildProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = TempCartController.listTempCart.has(`${idInforUser}-${idChildProduct}`);
            if (check) {
                return check;
            }
            check = false;
            yield (0, TempCartDB_1.GetTempProductInCartByDB)(idChildProduct, idInforUser)
                .then((v) => {
                if (v.length > 0) {
                    TempCartController.listTempCart.set(`${idInforUser}-${idChildProduct}`, true);
                    check = true;
                }
            })
                .catch((v) => {
                (0, lib_1.err)("HasTempProInCart TempCartController", v);
                check = false;
            });
            return check;
        });
    }
    GetAllTempProductInCart(idInforUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var list = [];
            yield (0, TempCartDB_1.GetAllTempProductInCartDB)(idInforUser)
                .then((v) => {
                for (let i = 0; i < v.length; i++) {
                    const element = v[i];
                    var tempcart = new TempCart_1.default();
                    tempcart.setAll(element);
                    list.push(tempcart);
                }
            })
                .catch((v) => {
                (0, lib_1.err)("GetAllTempProductInCart TempCartController", v);
            });
            return list;
        });
    }
    InsertTempCart(idChildProduct, idInforUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = true;
            yield (0, TempCartDB_1.InsertTempCartDB)(idChildProduct, idInforUser)
                .then((v) => {
                check = true;
            })
                .catch((v) => {
                (0, lib_1.err)("InsertTempCart TempCartController", v);
                check = false;
            });
            return check;
        });
    }
    Get() {
        return TempCartController.listTempCart;
    }
    RemoveTemProductInCart(idChildProduct, idInforUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            TempCartController.listTempCart.delete(`${idInforUser}-${idChildProduct}`);
            try {
                check = (yield (0, TempCartDB_1.RemoveTemProductInCartDB)(idChildProduct, idInforUser));
            }
            catch (error) {
                (0, lib_1.err)("RemoveTemProductInCart TempCartController", error);
            }
            return check;
        });
    }
}
TempCartController.listTempCart = new Map();
exports.default = new TempCartController();
