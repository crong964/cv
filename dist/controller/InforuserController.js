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
const InforUserDB_1 = require("../database/InforUserDB");
const lib_1 = require("../lib/lib");
const InforUser_1 = require("../model/InforUser");
class InforUserController {
    constructor() {
    }
    AddInforuser(address, numberPhone) {
        return __awaiter(this, void 0, void 0, function* () {
            var ch = undefined;
            try {
                ch = (yield (0, InforUserDB_1.AddInforuserDB)(address, numberPhone));
            }
            catch (error) {
                (0, lib_1.err)("AddInforuser InforUserController", error);
            }
            return ch;
        });
    }
    Has(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (InforUserController.List.has(id)) {
                return true;
            }
            var ch = false;
            try {
                var l = yield (0, InforUserDB_1.GetInforuserDB)(id);
                for (let i = 0; i < l.length; i++) {
                    const element = l[i];
                    var s = new InforUser_1.InforUser();
                    s.setAll(element);
                    if (s.id) {
                        InforUserController.List.set(s.id + "", s);
                        ch = true;
                    }
                    break;
                }
            }
            catch (error) {
                (0, lib_1.err)("Has InforUserController", error);
                ch = false;
            }
            return ch;
        });
    }
    GetInforuser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var c;
            if (yield this.Has(id)) {
                c = InforUserController.List.get(id);
            }
            return c;
        });
    }
    GetAllInforuser(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            var s = { start: 0, count: 20 };
            s.start = ((limit === null || limit === void 0 ? void 0 : limit.start) || 0) * 20;
            s.count = (limit === null || limit === void 0 ? void 0 : limit.count) || 20;
            var ls = [];
            try {
                var l = yield (0, InforUserDB_1.GetAllInforuserDB)(s);
                for (let i = 0; i < l.length; i++) {
                    const element = l[i];
                    var temp = new InforUser_1.InforUser();
                    temp.setAll(element);
                    ls.push(temp);
                }
            }
            catch (error) {
                (0, lib_1.err)("GetAllInforuser InforUserController", error);
            }
            return ls;
        });
    }
    UpdateInforuser(address, numberPhone, name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            var c;
            try {
                c = (yield (0, InforUserDB_1.UpdateInforuserDB)(address, numberPhone, name, id));
                InforUserController.List.delete(id);
            }
            catch (error) {
                (0, lib_1.err)("UpdateInforuser InforUserController", error);
            }
            return c;
        });
    }
}
InforUserController.List = new Map();
exports.default = new InforUserController();
