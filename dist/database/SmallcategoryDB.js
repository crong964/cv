"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllSmallcategoryDB = void 0;
const configMySQL_1 = require("./configMySQL");
function GetAllSmallcategoryDB() {
    return new Promise((res, rej) => {
        var sql = "SELECT * FROM smallcategory";
        configMySQL_1.con_mysql2.query(sql, ((err, result, fields) => {
            if (err) {
                rej(err);
            }
            res(result);
        }));
    });
}
exports.GetAllSmallcategoryDB = GetAllSmallcategoryDB;
