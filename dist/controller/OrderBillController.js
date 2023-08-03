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
const OrderBillDB_1 = require("../database/OrderBillDB");
const lib_1 = require("../lib/lib");
const OrderBill_1 = __importDefault(require("../model/OrderBill"));
class OrderBillController {
    constructor() {
    }
    Add(address, numberphone, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, OrderBillDB_1.AddDB)(address, numberphone, userid));
            }
            catch (error) {
                (0, lib_1.err)("Add OrderBillController", error);
            }
            return check;
        });
    }
    GetAllByUserid(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            var list = [];
            try {
                var te = yield (0, OrderBillDB_1.GetAllByUseridDB)(userid);
                for (let i = 0; i < te.length; i++) {
                    const element = te[i];
                    var temp = new OrderBill_1.default();
                    temp.setAll(element);
                    list.push(temp);
                }
            }
            catch (error) {
                (0, lib_1.err)("GetAll OrderBillController", error);
            }
            return list;
        });
    }
    GetOrderBill(idOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            var temp;
            try {
                var s = yield (0, OrderBillDB_1.GetOrderBillDB)(idOrder);
                temp = new OrderBill_1.default();
                for (let id = 0; id < s.length; id++) {
                    const element = s[id];
                    temp.setAll(element);
                    break;
                }
            }
            catch (error) {
                (0, lib_1.err)("GetOrderBill OrderBillController", error);
            }
            return temp;
        });
    }
    UpdateMoneyOrderBill(totalmoney, idOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, OrderBillDB_1.UpdateMoneyOrderBillDB)(totalmoney, idOrder));
            }
            catch (error) {
                (0, lib_1.err)("UpdateMoneyOrderBill OrderBillController", error);
            }
            return check;
        });
    }
    GetAllLimiByUserId(userid, grapsql, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            var s = limit || { start: 0, count: 20 };
            var list = [];
            try {
                var t = yield (0, OrderBillDB_1.GetAllLimiByUserIdDB)(userid, grapsql, s);
                for (let i = 0; i < t.length; i++) {
                    const element = t[i];
                    let tem = new OrderBill_1.default();
                    tem.setAll(element);
                    list.push(tem);
                }
            }
            catch (error) {
                (0, lib_1.err)("GetAllLimiByUserId OrderBillController", error);
            }
            return list;
        });
    }
    GetAllLimit(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            var s = { start: 0, count: 10 };
            s.start = (limit === null || limit === void 0 ? void 0 : limit.start) || 0;
            s.count = (limit === null || limit === void 0 ? void 0 : limit.count) || 10;
            var list = [];
            try {
                var t = yield (0, OrderBillDB_1.GetAllLimitDB)(s);
                for (let i = 0; i < t.length; i++) {
                    const element = t[i];
                    var o = new OrderBill_1.default();
                    o.setAll(element);
                    list.push(o);
                }
            }
            catch (error) {
                (0, lib_1.err)("GetAllLimit OrderBillController", error);
            }
            return list;
        });
    }
}
exports.default = new OrderBillController();
