"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccount = void 0;
const mysql_1 = __importDefault(require("mysql"));
const configMySQL_1 = __importDefault(require("./configMySQL"));
function GetAccount(account) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = "SELECT * FROM accountemployee WHERE account=?";
            con.query(sql, account, (err, result, field) => {
                if (err) {
                    rej(err);
                }
                res(result);
            });
        });
    });
}
exports.GetAccount = GetAccount;
