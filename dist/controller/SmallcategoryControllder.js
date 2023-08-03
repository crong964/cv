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
const SmallcategoryDB_1 = require("../database/SmallcategoryDB");
const lib_1 = require("../lib/lib");
const Smallcategory_1 = __importDefault(require("../model/Smallcategory"));
class SmallcategoryControllder {
    constructor() {
    }
    GetAllSmallcategory() {
        return __awaiter(this, void 0, void 0, function* () {
            var list = [];
            try {
                yield (0, SmallcategoryDB_1.GetAllSmallcategoryDB)()
                    .then((v) => {
                    for (let i = 0; i < v.length; i++) {
                        const element = v[i];
                        var smallcategory = new Smallcategory_1.default();
                        smallcategory.setAll(element);
                        list.push(smallcategory);
                    }
                });
            }
            catch (error) {
                (0, lib_1.err)("GetAllSmallcategory SmallcategoryControllder", "");
                console.log(error);
            }
            return list;
        });
    }
}
exports.default = new SmallcategoryControllder();
