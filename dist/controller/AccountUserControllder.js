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
const AccountUserDB_1 = require("../database/AccountUserDB");
const AccountUser_1 = __importDefault(require("../model/AccountUser"));
const lib_1 = require("../lib/lib");
class AccountUserControllder {
    constructor() {
    }
    GetAccountUserByAccAndPass(account, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var v;
            try {
                var ls = yield (0, AccountUserDB_1.GetAccountUserByAccAndPassDB)(account, password);
                v = new AccountUser_1.default();
                for (let i = 0; i < ls.length; i++) {
                    const element = ls[i];
                    v.setAll(element);
                    break;
                }
            }
            catch (error) {
                (0, lib_1.err)("GetAccountUserByAccAndPass AccountUserControllder", error);
            }
            return v;
        });
    }
    GetAccountUserByAcc(account) {
        return __awaiter(this, void 0, void 0, function* () {
            var v;
            if (yield this.Has(account)) {
                v = AccountUserControllder.list.get(account);
            }
            return v;
        });
    }
    Has(account) {
        return __awaiter(this, void 0, void 0, function* () {
            var v = false;
            if (AccountUserControllder.list.has(account)) {
                v = true;
            }
            else {
                try {
                    var l = yield (0, AccountUserDB_1.GetAccountUserByAccDB)(account);
                    for (let i = 0; i < l.length; i++) {
                        const element = l[i];
                        var temp = new AccountUser_1.default();
                        temp.setAll(element);
                        if (temp === null || temp === void 0 ? void 0 : temp.account) {
                            AccountUserControllder.list.set(temp === null || temp === void 0 ? void 0 : temp.account, temp);
                            v = true;
                        }
                        break;
                    }
                }
                catch (error) {
                    (0, lib_1.err)("Has AccountUserControllder", error);
                }
            }
            return v;
        });
    }
    AddAccountUser(account, password, id) {
        return __awaiter(this, void 0, void 0, function* () {
            var c;
            try {
                c = yield (0, AccountUserDB_1.AddAccountUserDB)(account, password, id);
            }
            catch (error) {
                c = undefined;
                (0, lib_1.err)("AddAccountUser AccountUserControllder", error);
            }
            return c;
        });
    }
}
AccountUserControllder.list = new Map();
exports.default = new AccountUserControllder();
