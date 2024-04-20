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
const PayInvoiceDB_1 = require("../database/PayInvoiceDB");
const lib_1 = require("../lib/lib");
const PayInvoice_1 = __importDefault(require("../model/PayInvoice"));
class PayInvoiceControllder {
    constructor() {
    }
    AddPayInvoice(userid, payid, orderid, bankcode, totolmoney, orderinfo) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, PayInvoiceDB_1.AddPayInvoiceDB)(userid, payid, orderid, bankcode, totolmoney, orderinfo));
            }
            catch (error) {
                (0, lib_1.err)('AddPayInvoice PayInvoiceControllder', error);
            }
            return check;
        });
    }
    GetAllPayInvoice() {
        return __awaiter(this, void 0, void 0, function* () {
            var l = [];
            try {
                var list = yield (0, PayInvoiceDB_1.GetAllPayInvoiceDB)();
                for (let i = 0; i < list.length; i++) {
                    const element = list[i];
                    var temp = new PayInvoice_1.default();
                    temp.setAll(element);
                    l.push(temp);
                }
            }
            catch (error) {
                (0, lib_1.err)('GetAllPayInvoice PayInvoiceControllder', error);
            }
            return l;
        });
    }
    GetPayInvoiceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var l;
            try {
                var list = yield (0, PayInvoiceDB_1.GetPayInvoiceByIdDB)(id);
                for (let i = 0; i < list.length; i++) {
                    const element = list[i];
                    l = new PayInvoice_1.default();
                    l.setAll(element);
                    break;
                }
            }
            catch (error) {
                (0, lib_1.err)('GetPayInvoiceById PayInvoiceControllder', error);
            }
            return l;
        });
    }
    UpdatePayInvoice(payid, BankTranNo, TransactionNo) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = yield (0, PayInvoiceDB_1.UpdatePayInvoiceDB)(payid, BankTranNo, TransactionNo);
            }
            catch (error) {
                (0, lib_1.err)('UpdatePayInvoice PayInvoiceControllder', error);
            }
            return check;
        });
    }
    GetAllPayInvoiceByBilId(billId, sta) {
        return __awaiter(this, void 0, void 0, function* () {
            var l = [];
            var s = sta || "";
            try {
                var ls = yield (0, PayInvoiceDB_1.GetAllPayInvoiceByBilIdDB)(billId, s);
                for (let i = 0; i < ls.length; i++) {
                    const element = ls[i];
                    var temp = new PayInvoice_1.default();
                    temp.setAll(element);
                    l.push(temp);
                }
            }
            catch (error) {
                (0, lib_1.err)('GetAllPayInvoiceByBilId PayInvoiceControllder', error);
            }
            return l;
        });
    }
}
exports.default = new PayInvoiceControllder();
