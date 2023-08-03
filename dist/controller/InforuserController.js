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
Object.defineProperty(exports, "__esModule", { value: true });
const InforuserDB_1 = require("../database/InforuserDB");
const lib_1 = require("../lib/lib");
const Inforuser_1 = require("../model/Inforuser");
class InforuserController {
    constructor() {
    }
    AddInforuser(address, numberPhone) {
        return __awaiter(this, void 0, void 0, function* () {
            var ch = undefined;
            try {
                ch = (yield (0, InforuserDB_1.AddInforuserDB)(address, numberPhone));
            }
            catch (error) {
                (0, lib_1.err)("AddInforuser InforuserController", error);
            }
            return ch;
        });
    }
    Has(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (InforuserController.List.has(id)) {
                return true;
            }
            var ch = false;
            try {
                var l = yield (0, InforuserDB_1.GetInforuserDB)(id);
                for (let i = 0; i < l.length; i++) {
                    const element = l[i];
                    var s = new Inforuser_1.Inforuser();
                    s.setAll(element);
                    if (s.id) {
                        InforuserController.List.set(s.id + "", s);
                        ch = true;
                    }
                    break;
                }
            }
            catch (error) {
                (0, lib_1.err)("Has InforuserController", error);
                ch = false;
            }
            return ch;
        });
    }
    GetInforuser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var c;
            if (yield this.Has(id)) {
                c = InforuserController.List.get(id);
            }
            return c;
        });
    }
}
InforuserController.List = new Map();
exports.default = new InforuserController();
