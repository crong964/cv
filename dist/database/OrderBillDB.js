"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllLimitDB = exports.UpdateMoneyOrderBillDB = exports.GetOrderBillDB = exports.GetAllLimiByUserIdDB = exports.GetAllByUseridDB = exports.AddDB = void 0;
const configMySQL_1 = require("./configMySQL");
function AddDB(address, numberphone, userid) {
    return new Promise((exc, rej) => {
        var sql = "INSERT INTO orderbill(address, numberphone, userid) VALUES (?,?,?)";
        configMySQL_1.con_mysql2.query(sql, [address, numberphone, userid], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.AddDB = AddDB;
function GetAllByUseridDB(userid) {
    return new Promise((exc, rej) => {
        var sql = "SELECT * FROM orderbill WHERE userid=?";
        configMySQL_1.con_mysql2.query(sql, [userid], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetAllByUseridDB = GetAllByUseridDB;
function GetAllLimiByUserIdDB(userid, grapsql, limit) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM orderbill WHERE userid=? And ${grapsql.fiel}=? limit ?,?`;
        configMySQL_1.con_mysql2.query(sql, [userid, grapsql.va, limit.start, limit.count], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetAllLimiByUserIdDB = GetAllLimiByUserIdDB;
function GetOrderBillDB(idOrder) {
    return new Promise((exc, rej) => {
        var sql = "SELECT * FROM orderbill WHERE id=? Limit 1";
        configMySQL_1.con_mysql2.query(sql, [idOrder], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetOrderBillDB = GetOrderBillDB;
function UpdateMoneyOrderBillDB(totalmoney, idOrder) {
    return new Promise((exc, rej) => {
        var sql = "UPDATE orderbill SET totolmoney=? WHERE id=?";
        configMySQL_1.con_mysql2.query(sql, [totalmoney, idOrder], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.UpdateMoneyOrderBillDB = UpdateMoneyOrderBillDB;
function GetAllLimitDB(limit) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM orderbill limit ?,?`;
        configMySQL_1.con_mysql2.query(sql, [limit.start, limit.count], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetAllLimitDB = GetAllLimitDB;
