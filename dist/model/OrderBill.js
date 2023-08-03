"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib/lib");
const BaseModel_1 = __importDefault(require("./BaseModel"));
class OrderBill extends BaseModel_1.default {
    constructor() {
        super();
        this.id = undefined;
        this.createday = undefined;
        this.ship = 0;
        this.pay = 0;
        this.address = undefined;
        this.totolmoney = undefined;
        this.numberphone = undefined;
        this.userid = undefined;
        this.shipS = undefined;
        this.payS = undefined;
    }
    setAll(p) {
        super.setAll(p);
        if (this.createday != undefined) {
            this.createday = (0, lib_1.formatDate)(new Date(this.createday).getTime() + "");
        }
        this.shipS = OrderBill.shipmentstatus[this.ship];
        this.payS = OrderBill.paystatus[this.pay];
    }
}
OrderBill.paystatus = ["chưa thành toán", "đã thành toán", "thành toán sau"];
OrderBill.shipmentstatus = ['chưa giao', 'đang giao'];
exports.default = OrderBill;
