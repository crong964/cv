"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib/lib");
const BaseModel_1 = __importDefault(require("./BaseModel"));
function Ordered() {
    return "Đã Đặt";
}
function PartiallyPickup() {
    return "ĐÃ Giao Một Phần";
}
function Completeted() {
    return "Đã Hoàn Thành";
}
var status = {
    "0": Ordered(),
    "1": PartiallyPickup(),
    "2": Completeted(),
};
class ImportBill extends BaseModel_1.default {
    constructor() {
        super();
        this.createdDay = undefined;
        this.idForUser = undefined;
        this.finishDay = undefined;
        this.supplier = undefined;
        this.status = undefined;
        this.idImportBill = undefined;
    }
    setAll(p) {
        super.setAll(p);
        if (this.status) {
            this.status = status[this.status];
        }
        if (this.createdDay && this.finishDay) {
            this.createdDay = (0, lib_1.formatDate)(new Date(this.createdDay).getTime() + "");
            this.finishDay = (0, lib_1.formatDate)(new Date(this.finishDay).getTime() + "");
        }
    }
}
exports.default = ImportBill;
