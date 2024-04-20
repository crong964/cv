"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInforuserDB = exports.GetAllInforuserDB = exports.GetInforuserDB = exports.AddInforuserDB = void 0;
const configMySQL_1 = require("./configMySQL");
function AddInforuserDB(address, numberPhone) {
    return new Promise((exc, rej) => {
        var sql = `INSERT INTO inforuser( address, numberPhone) VALUES (?,?)`;
        configMySQL_1.con_mysql2.query(sql, [address, numberPhone], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.AddInforuserDB = AddInforuserDB;
function GetInforuserDB(id) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM inforuser WHERE id=? LIMIT 1`;
        configMySQL_1.con_mysql2.query(sql, [id], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetInforuserDB = GetInforuserDB;
function GetAllInforuserDB(limit) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM inforuser LIMIT ?,?`;
        configMySQL_1.con_mysql2.query(sql, [limit.start, limit.count], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetAllInforuserDB = GetAllInforuserDB;
function UpdateInforuserDB(address, numberPhone, name, id) {
    return new Promise((exc, rej) => {
        var sql = `UPDATE inforuser SET address=?,numberPhone=?,name=? WHERE id=?`;
        configMySQL_1.con_mysql2.query(sql, [address, numberPhone, name, id], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.UpdateInforuserDB = UpdateInforuserDB;
