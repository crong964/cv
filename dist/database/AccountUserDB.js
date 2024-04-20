"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccountUserByIdDB = exports.GetAllAccountUserDB = exports.AddAccountUserDB = exports.GetAccountUserByAccDB = exports.GetAccountUserByAccAndPassDB = void 0;
const configMySQL_1 = require("./configMySQL");
function GetAccountUserByAccAndPassDB(account, password) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM accountuser WHERE account=? AND password=? LIMIT 1`;
        configMySQL_1.con_mysql2.query(sql, [account, password], (err, res, fiedls) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetAccountUserByAccAndPassDB = GetAccountUserByAccAndPassDB;
function GetAccountUserByAccDB(account) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM accountuser WHERE account=? LIMIT 1`;
        configMySQL_1.con_mysql2.query(sql, [account], (err, res, fiedls) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetAccountUserByAccDB = GetAccountUserByAccDB;
function AddAccountUserDB(account, password, id) {
    return new Promise((exc, rej) => {
        var sql = `INSERT INTO accountuser(account, password, idUser) VALUES (?,?,?)`;
        configMySQL_1.con_mysql2.query(sql, [account, password, id], (err, res, fiedls) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.AddAccountUserDB = AddAccountUserDB;
function GetAllAccountUserDB() {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM accountuser `;
        configMySQL_1.con_mysql2.query(sql, (err, res, fiedls) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetAllAccountUserDB = GetAllAccountUserDB;
function GetAccountUserByIdDB(userid) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM accountuser WHERE idUser=?`;
        configMySQL_1.con_mysql2.query(sql, [userid], (err, res, fiedls) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetAccountUserByIdDB = GetAccountUserByIdDB;
