"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusBill = exports.formatDate = exports.convertMoney = exports.vali = exports.err = exports.render = void 0;
const fs_1 = __importDefault(require("fs"));
function render(res, ip, pa) {
    fs_1.default.readFile(pa, (err, data) => {
        var d = data.toString("utf8");
        while (d.indexOf("<??>") > 0) {
            d = d.replace("<??>", ip);
        }
        res.send(d);
    });
}
exports.render = render;
function err(where, mess) {
    console.log(`in ${where} class,\\n err: ${mess}`);
}
exports.err = err;
function vali(req, res, next) {
    if (!req.cookies.id) {
        res.redirect("/");
    }
    next();
}
exports.vali = vali;
function convertMoney(params) {
    if (!params) {
        return 0;
    }
    var s = params + "";
    var temp = "";
    var n = 0;
    for (let i = s.length - 1; i > 0; i--) {
        const element = s[i];
        temp = element + temp;
        n += 1;
        if (n % 3 == 0) {
            temp = "." + temp;
            n = 0;
        }
    }
    temp = s[0] + temp + " Đ";
    return temp;
}
exports.convertMoney = convertMoney;
function formatDate(d) {
    if (!d) {
        return;
    }
    var p = new Date(parseInt(d));
    return `${p.getDate()}-${p.getMonth() + 1}-${p.getFullYear()} ${p.getHours()}:${p.getMinutes()}:${p.getSeconds()}`;
}
exports.formatDate = formatDate;
var statusBill;
(function (statusBill) {
    statusBill["ship"] = "ship";
    statusBill["pay"] = "pay";
})(statusBill = exports.statusBill || (exports.statusBill = {}));
