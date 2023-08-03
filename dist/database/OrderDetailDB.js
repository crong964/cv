"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllByIdOderDB = exports.UpdateDB = exports.AddDB = void 0;
const configMySQL_1 = require("./configMySQL");
function AddDB(idChildProduct, idorder, price, quantity) {
    return new Promise((exc, rej) => {
        var sql = "INSERT INTO orderdetail(idChildProduct ,idorder, price ,quantity) VALUES (?,?,?,?)";
        configMySQL_1.con_mysql2.query(sql, [idChildProduct, idorder, price, quantity], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.AddDB = AddDB;
function UpdateDB(idChildProduct, idorder, quantity) {
    return new Promise((exc, rej) => {
        var sql = "UPDATE orderdetail SET quantity WHERE idChildProduct=? AND idorder=?";
        configMySQL_1.con_mysql2.query(sql, [quantity, idChildProduct, idorder], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.UpdateDB = UpdateDB;
function GetAllByIdOderDB(idOrder) {
    return new Promise((exc, rej) => {
        var sql = `SELECT o.idChildProduct,o.idorder,o.price,o.quantity,c.image,c.nameChildProduct FROM orderdetail o,childproduct c WHERE o.idChildProduct=c.idChildProduct AND o.idorder=?`;
        configMySQL_1.con_mysql2.query(sql, [idOrder], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.GetAllByIdOderDB = GetAllByIdOderDB;
