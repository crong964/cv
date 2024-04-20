"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPayInvoiceByBilIdDB = exports.UpdatePayInvoiceDB = exports.GetPayInvoiceByIdDB = exports.GetAllPayInvoiceDB = exports.AddPayInvoiceDB = void 0;
const configMySQL_1 = require("./configMySQL");
function AddPayInvoiceDB(userid, payid, orderid, bankcode, totolmoney, orderinfo) {
    return new Promise((exc, rej) => {
        var sql = `INSERT INTO payinvoice(userid, payid, orderid, bankcode, totolmoney,orderinfo) VALUES (?,?,?,?,?,?)`;
        configMySQL_1.con_mysql2.query(sql, [userid, payid, orderid, bankcode, totolmoney, orderinfo], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.AddPayInvoiceDB = AddPayInvoiceDB;
function GetAllPayInvoiceDB() {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM payinvoice`;
        configMySQL_1.con_mysql2.query(sql, (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetAllPayInvoiceDB = GetAllPayInvoiceDB;
function GetPayInvoiceByIdDB(id) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM payinvoice WHERE payid=?`;
        configMySQL_1.con_mysql2.query(sql, id, (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetPayInvoiceByIdDB = GetPayInvoiceByIdDB;
function UpdatePayInvoiceDB(payid, BankTranNo, TransactionNo) {
    return new Promise((exc, rej) => {
        var sql = `UPDATE payinvoice SET banktranno=?,transactionno=?,status = 1 WHERE payid=?`;
        configMySQL_1.con_mysql2.query(sql, [BankTranNo, TransactionNo, payid], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.UpdatePayInvoiceDB = UpdatePayInvoiceDB;
function GetAllPayInvoiceByBilIdDB(billId, status) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM payinvoice where orderid=? AND status like ?`;
        configMySQL_1.con_mysql2.query(sql, [billId, `%${status}%`], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetAllPayInvoiceByBilIdDB = GetAllPayInvoiceByBilIdDB;
