"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProductInCartDB = exports.DelProductInCartDB = exports.GetProductInCartDB = exports.InsertProductInCartDB = void 0;
const configMySQL_1 = require("./configMySQL");
function InsertProductInCartDB(idChildPro, idUser) {
    return new Promise((exc, rej) => {
        var sql = `INSERT INTO shoppingcart(idUser, idChildProduct) VALUES (?,?)`;
        configMySQL_1.con_mysql2.query(sql, [idUser, idChildPro], (err, res) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.InsertProductInCartDB = InsertProductInCartDB;
function GetProductInCartDB(idChildPro, idUser) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM shoppingcart,childproduct WHERE shoppingcart.idUser=? AND shoppingcart.idChildProduct=? AND childproduct.idChildProduct=shoppingcart.idChildProduct LIMIT 1`;
        configMySQL_1.con_mysql2.query(sql, [idUser, idChildPro], (err, res) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetProductInCartDB = GetProductInCartDB;
function DelProductInCartDB(idChildPro, idUser) {
    return new Promise((exc, rej) => {
        var sql = `DELETE FROM shoppingcart WHERE idUser=? AND idChildProduct=? `;
        configMySQL_1.con_mysql2.query(sql, [idUser, idChildPro], (err, res) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.DelProductInCartDB = DelProductInCartDB;
function GetAllProductInCartDB(idUser) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM shoppingcart,childproduct WHERE shoppingcart.idUser=? AND childproduct.idChildProduct=shoppingcart.idChildProduct `;
        configMySQL_1.con_mysql2.query(sql, [idUser], (err, res) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetAllProductInCartDB = GetAllProductInCartDB;
