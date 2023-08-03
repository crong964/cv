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
const ChildProduct_1 = __importDefault(require("../model/ChildProduct"));
const ChildProductDB_1 = require("../database/ChildProductDB");
const lib_1 = require("../lib/lib");
class ChildProductController {
    constructor() { }
    GetAllChildProductByIdProduct(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            var list = [];
            yield (0, ChildProductDB_1.GetAllChildProductByIdProductDB)(idProduct)
                .then((v) => {
                for (let i = 0; i < v.length; i++) {
                    const element = v[i];
                    var childProduct = new ChildProduct_1.default();
                    childProduct.setAll(element);
                    list.push(childProduct);
                    if (childProduct.idChildProduct) {
                        ChildProductController.listChildProduct.set(childProduct.idChildProduct, childProduct);
                    }
                }
            })
                .catch((v) => {
                (0, lib_1.err)("ChildProductController GetAllChildProductByIdProduct", v);
            });
            return list;
        });
    }
    Has(idChildProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = ChildProductController.listChildProduct.has(idChildProduct);
            if (check) {
                return check;
            }
            var temp = undefined;
            yield (0, ChildProductDB_1.GetChildProductDB)(idChildProduct)
                .then((v) => {
                for (let i = 0; i < v.length; i++) {
                    const element = v[i];
                    temp = new ChildProduct_1.default();
                    temp.setAll(element);
                    if (temp.idChildProduct) {
                        ChildProductController.listChildProduct.set(temp.idChildProduct, temp);
                    }
                }
            })
                .catch((v) => {
                (0, lib_1.err)("ChildProductController HasChildProduct", v);
            });
            return temp != undefined;
        });
    }
    Get(idChildProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.Has(idChildProduct)) {
            }
            return ChildProductController.listChildProduct.get(idChildProduct);
        });
    }
    IncreaseAmountChildProduct(idChildProduct, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.Has(idChildProduct);
            if (!check) {
                return false;
            }
            yield (0, ChildProductDB_1.UpdateAmountChildProductDB)(idChildProduct, parseInt(quantity))
                .then((v) => {
                check = true;
                var temp = ChildProductController.listChildProduct.get(idChildProduct);
                if (temp) {
                    temp.amount += parseInt(quantity);
                }
            })
                .catch((v) => {
                (0, lib_1.err)("ChildProductController IncreaseAmountChildProduct", v);
                check = false;
            });
            return check;
        });
    }
    DecreaseAmountChildProduct(idChildProduct, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            quantity *= -1;
            var check = false;
            yield (0, ChildProductDB_1.UpdateAmountChildProductDB)(idChildProduct, quantity)
                .then((v) => {
                var tem = ChildProductController.listChildProduct.get(idChildProduct + "");
                if (tem != undefined) {
                    tem.amount += parseInt(quantity + "");
                }
                check = true;
            })
                .catch((v) => {
                (0, lib_1.err)("ChildProductController DecreaseAmountChildProduct", v);
                check = false;
            });
            return check;
        });
    }
    AddChildProduct(idChildProduct, idProduct, nameChildProduct, importPrice, price, image) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, ChildProductDB_1.AddChildProductDB)(idChildProduct, idProduct, nameChildProduct, importPrice, price, image));
            }
            catch (error) {
                (0, lib_1.err)("AddChildProduct ChildProductController", error);
            }
            return check;
        });
    }
    UpdateChildProduct(idChildProduct, nameChildProduct, importPrice, price, image) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, ChildProductDB_1.UpdateChildProductDB)(idChildProduct, nameChildProduct, importPrice, price, image));
            }
            catch (error) {
                (0, lib_1.err)("UpdateChildProduct ChildProductController", error);
            }
            return check;
        });
    }
}
ChildProductController.listChildProduct = new Map();
exports.default = new ChildProductController();
