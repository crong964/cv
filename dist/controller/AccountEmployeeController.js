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
const AccountEmployeeDB_1 = require("../database/AccountEmployeeDB");
const AccountEmployee_1 = __importDefault(require("../model/AccountEmployee"));
class AccountEmployeeController {
    constructor() { }
    Has(account, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var accountEmployee = AccountEmployeeController.ListAccountEmployee.get(account);
            if (accountEmployee != undefined) {
                return true;
            }
            yield (0, AccountEmployeeDB_1.GetAccount)(account, password)
                .then((v) => {
                if (v.length > 0) {
                    accountEmployee = new AccountEmployee_1.default();
                    accountEmployee.setAll(v[0]);
                    if (accountEmployee.account) {
                        AccountEmployeeController.ListAccountEmployee.set(accountEmployee.account, accountEmployee);
                    }
                }
            })
                .catch((v) => {
                console.log(`error in class AccountEmployeeController\\n + ${v}`);
                accountEmployee == undefined;
            });
            return accountEmployee != undefined;
        });
    }
}
AccountEmployeeController.ListAccountEmployee = new Map();
exports.default = new AccountEmployeeController();
