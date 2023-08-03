"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllByIdImportedBillDB = exports.InsertContainImportedBillDB = void 0;
const mysql_1 = __importDefault(require("mysql"));
const configMySQL_1 = __importDefault(require("./configMySQL"));
function InsertContainImportedBillDB(idChildProduct, idImportedBill, amount, importPrice) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = `INSERT INTO containimportedbill(idImportedBill, idChildProduct, importedAmount, importPrice) 
      VALUES (?,?,?,?)`;
            con.query(sql, [idImportedBill, idChildProduct, amount, importPrice], (err, result, field) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.InsertContainImportedBillDB = InsertContainImportedBillDB;
function GetAllByIdImportedBillDB(idImportedBill) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = `
          SELECT c.idChildProduct,c.importPrice,c.importedAmount,p.image,p.nameChildProduct
          FROM containimportedbill c,childproduct p 
          WHERE p.idChildProduct = c.idChildProduct AND c.idImportedBill = ?`;
            con.query(sql, idImportedBill, (err, result, field) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.GetAllByIdImportedBillDB = GetAllByIdImportedBillDB;
