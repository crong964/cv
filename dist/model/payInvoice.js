"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib/lib");
const BaseModel_1 = __importDefault(require("./BaseModel"));
class PayInvoice extends BaseModel_1.default {
    constructor() {
        super();
        this.userid = 0;
        this.payid = "";
        this.orderid = 0;
        this.bankcode = "";
        this.day = "";
        this.status = 0;
        this.totolmoney = 0;
        this.returnpaymoney = 0;
        this.banktranno = "";
        this.transactionno = "";
        this.orderinfo = "";
    }
    setAll(p) {
        super.setAll(p);
        if (this.day != undefined) {
            this.day = (0, lib_1.formatDate)(new Date(this.day).getTime() + "");
        }
    }
}
PayInvoice.statusS = ["chưa xác nhận", "đã xác nhận", "hoàn lại"];
exports.default = PayInvoice;
