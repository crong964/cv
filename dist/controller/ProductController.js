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
const ProductDB_1 = require("../database/ProductDB");
const lib_1 = require("../lib/lib");
const Product_1 = __importDefault(require("../model/Product"));
class ProductController {
    constructor() { }
    GetAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            var list = [];
            yield (0, ProductDB_1.GetAllProductDB)()
                .then((v) => {
                for (let i = 0; i < v.length; i++) {
                    const element = v[i];
                    var product = new Product_1.default();
                    product.setAll(element);
                    if (product.idProduct) {
                        ProductController.ListProduct.set(product.idProduct, product);
                        list.push(product);
                    }
                }
            })
                .catch((v) => {
                (0, lib_1.err)(" GetAllProductDB ProductController", v);
            });
            return list;
        });
    }
    Has(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = ProductController.ListProduct.has(idProduct);
            if (check) {
                return check;
            }
            yield (0, ProductDB_1.GetProductDB)(idProduct)
                .then((v) => {
                for (let i = 0; i < v.length; i++) {
                    const element = v[i];
                    var product = new Product_1.default();
                    product.setAll(element);
                    ProductController.ListProduct.set(idProduct, product);
                    check = true;
                    break;
                }
            })
                .catch((v) => {
                (0, lib_1.err)("HasProduct ProductController", v);
                check = false;
            });
            return check;
        });
    }
    IncreaseAmountProduct(idProduct, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = false;
            yield (0, ProductDB_1.UpdateAmountProductDB)(idProduct, quantity)
                .then((v) => {
                check = true;
                var tem = ProductController.ListProduct.get(idProduct);
                if (tem && tem.amount != undefined) {
                    tem.amount += parseInt(quantity + "");
                }
            })
                .catch((v) => {
                (0, lib_1.err)("IncreaseAmountProduct ProductController", v);
                check = false;
            });
            return check;
        });
    }
    DecreaseAmountProduct(idProduct, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = false;
            quantity *= -1;
            yield (0, ProductDB_1.UpdateAmountProductDB)(idProduct, quantity)
                .then((v) => {
                check = true;
                var tem = ProductController.ListProduct.get(idProduct);
                if (tem != undefined && tem.amount != undefined) {
                    tem.amount += parseInt(quantity + "");
                }
            })
                .catch((v) => {
                (0, lib_1.err)("DecreaseAmountProduct ProductController", v);
                check = false;
            });
            return check;
        });
    }
    AddProduct(namePro, Price, ImportPrice, idBigCategory, idSmallCategory, image, bt) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, ProductDB_1.AddProductDB)(namePro, Price, ImportPrice, idBigCategory, idSmallCategory, image, bt));
            }
            catch (error) {
                (0, lib_1.err)("AddProduct ProductController", error);
            }
            return check;
        });
    }
    GetProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var list, product;
            try {
                list = (yield (0, ProductDB_1.GetProductDB)(id));
            }
            catch (error) {
                list = undefined;
                (0, lib_1.err)("GetProduct ProductController", error);
            }
            if (list && list[0]) {
                product = new Product_1.default();
                product.setAll(list[0]);
            }
            return product;
        });
    }
    DeleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, ProductDB_1.DeleteProductDB)(id));
            }
            catch (error) {
                (0, lib_1.err)("DeleteProduct ProductController", error);
            }
            return check;
        });
    }
    UpdateProduct(idProduct, namePro, Price, ImportPrice, idBigCategory, idSmallCategory, image, bt) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = undefined;
            try {
                check = (yield (0, ProductDB_1.UpdateProductDB)(idProduct, namePro, Price, ImportPrice, idBigCategory, idSmallCategory, image, bt));
            }
            catch (error) {
                (0, lib_1.err)("UpdateProduct ProductController", error);
            }
            return check;
        });
    }
    GetAllProductByBigCategary(idBigCategory, page, count) {
        return __awaiter(this, void 0, void 0, function* () {
            page = page = page || 0;
            page = page * 10;
            count = count || 10;
            var list = [];
            try {
                var l = (yield (0, ProductDB_1.GetAllProductByBigCategaryDB)(idBigCategory, page, count));
                for (let i = 0; i < l.length; i++) {
                    const element = l[i];
                    var te = new Product_1.default();
                    te.setAll(element);
                    te.Price = (0, lib_1.convertMoney)(te.Price);
                    list.push(te);
                }
            }
            catch (error) {
                (0, lib_1.err)("GetAllProductByBigCategary ProductController", error);
            }
            return list;
        });
    }
}
ProductController.ListProduct = new Map();
exports.default = new ProductController();
