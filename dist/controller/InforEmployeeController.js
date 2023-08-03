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
const InforEmployee_1 = __importDefault(require("../model/InforEmployee"));
const InforEmployeeDB_1 = require("../database/InforEmployeeDB");
const lib_1 = require("../lib/lib");
class InforEmployeeController {
    constructor() { }
    GetInforEmByAcount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            var i;
            yield (0, InforEmployeeDB_1.GetEmByAccountDB)(account)
                .then((v) => {
                if (v.length > 0) {
                    i = new InforEmployee_1.default();
                    i.setAll(v[0]);
                    if (i.idInforUser) {
                        InforEmployeeController.ListInforEmployee.set(i.idInforUser, i);
                    }
                }
            })
                .catch((v) => {
                (0, lib_1.err)("InforEmployeeController", v);
            });
            return i;
        });
    }
}
InforEmployeeController.ListInforEmployee = new Map();
exports.default = new InforEmployeeController();
