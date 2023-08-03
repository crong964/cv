"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRefreshTokenUserDB = exports.GetRefreshTokenUserDB = exports.AddRefreshTokenUserDB = void 0;
const configMySQL_1 = require("./configMySQL");
function AddRefreshTokenUserDB(idUser, refreshtoken) {
    return new Promise((exc, rej) => {
        var sql = `INSERT INTO refreshtokenuser(idUser, refreshtoken) VALUES (?,?)`;
        configMySQL_1.con_mysql2.query(sql, [idUser, refreshtoken], (err, result, fields) => {
            if (err) {
                rej(err);
            }
            exc(result);
        });
    });
}
exports.AddRefreshTokenUserDB = AddRefreshTokenUserDB;
function GetRefreshTokenUserDB(userId, refreshtoken) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM refreshtokenuser WHERE idUser=? AND refreshtoken=? LIMIT 1`;
        configMySQL_1.con_mysql2.query(sql, [userId, refreshtoken], (err, result, fields) => {
            if (err) {
                rej(err);
            }
            exc(result);
        });
    });
}
exports.GetRefreshTokenUserDB = GetRefreshTokenUserDB;
function DeleteRefreshTokenUserDB(idUser, refreshtoken) {
    return new Promise((exc, rej) => {
        var sql = `DELETE FROM refreshtokenuser WHERE idUser=? AND refreshtoken=?`;
        configMySQL_1.con_mysql2.query(sql, [idUser, refreshtoken], (err, result, fields) => {
            if (err) {
                rej(err);
            }
            exc(result);
        });
    });
}
exports.DeleteRefreshTokenUserDB = DeleteRefreshTokenUserDB;
