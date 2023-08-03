"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetContainImportChildProductDB = exports.UpdateImportedQuantityContainImportBillDB = exports.GetAllByIdImportBillDB = exports.InsertContainImportBillDB = void 0;
const mysql_1 = __importDefault(require("mysql"));
const configMySQL_1 = __importDefault(require("./configMySQL"));
function InsertContainImportBillDB(idChildProduct, idImportBill, amount, importPrice) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = `INSERT INTO containimportbill(idImportBill, idChildProduct, amount,importPrice) VALUES (?,?,?,?)`;
            con.query(sql, [idImportBill, idChildProduct, amount, importPrice], (err, result, field) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.InsertContainImportBillDB = InsertContainImportBillDB;
function GetAllByIdImportBillDB(idImportBill) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = `SELECT c.idChildProduct,c.amount,c.importPrice,c.importedAmount,p.image,p.nameChildProduct
      FROM containimportbill c,childproduct p 
      WHERE p.idChildProduct = c.idChildProduct AND c.idImportBill= ? `;
            con.query(sql, idImportBill, (err, result, field) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.GetAllByIdImportBillDB = GetAllByIdImportBillDB;
function UpdateImportedQuantityContainImportBillDB(idImportBill, idChildProduct, quantity) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = `UPDATE containimportbill 
      SET importedAmount = importedAmount + ?
      WHERE idImportBill = ? AND idChildProduct = ? `;
            con.query(sql, [quantity, idImportBill, idChildProduct], (err, result, field) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.UpdateImportedQuantityContainImportBillDB = UpdateImportedQuantityContainImportBillDB;
function GetContainImportChildProductDB(idImportBill, idChildProduct) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = `SELECT * FROM containimportbill  WHERE idImportBill= ? AND idChildProduct= ? `;
            con.query(sql, [idImportBill, idChildProduct], (err, result, field) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.GetContainImportChildProductDB = GetContainImportChildProductDB;
