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
const BigcategoryDB_1 = require("../database/BigcategoryDB");
const lib_1 = require("../lib/lib");
const Bigcategory_1 = __importDefault(require("../model/Bigcategory"));
class BigcategoryController {
    constructor() {
    }
    GetAllBigcategory() {
        return __awaiter(this, void 0, void 0, function* () {
            var list = [];
            try {
                yield (0, BigcategoryDB_1.GetAllBigcategoryDB)()
                    .then((v) => {
                    for (let i = 0; i < v.length; i++) {
                        const element = v[i];
                        let temp = new Bigcategory_1.default();
                        temp.setAll(element);
                        list.push(temp);
                    }
                });
            }
            catch (error) {
                (0, lib_1.err)("GetAllBigcategory BigcategoryController", "");
                console.log(error);
            }
            return list;
        });
    }
    AddBigCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = undefined;
            yield (0, BigcategoryDB_1.AddBigCategoryDB)(name)
                .catch((v) => {
                (0, lib_1.err)("AddBigCategory BigcategoryController", v);
            })
                .then((v) => {
                check = v;
            });
            return check;
        });
    }
    GetBigCategoryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = undefined;
            yield (0, BigcategoryDB_1.GetBigCategoryByNameDB)(name)
                .catch((v) => {
                (0, lib_1.err)("GetBigCategoryByName BigcategoryController", v);
            })
                .then((v) => {
                if (v[0]) {
                    check = new Bigcategory_1.default();
                    check.setAll(v[0]);
                }
            });
            return check;
        });
    }
    UpdateBigCategory(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            yield (0, BigcategoryDB_1.UpdateBigCategoryDB)(id, name)
                .catch((v) => {
                (0, lib_1.err)("UpdateBigCategory BigcategoryController", v);
                check = undefined;
            })
                .then((v) => {
                check = v;
            });
            return check;
        });
    }
    DeleteBigCategoryByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, BigcategoryDB_1.DeleteBigCategoryByidDB)(id));
            }
            catch (error) {
                (0, lib_1.err)("UpdateBigCategory BigcategoryController", error);
            }
            return check;
        });
    }
}
exports.default = new BigcategoryController();
