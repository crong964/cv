"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusImportedBillDB = exports.InsertImportedBillDB = exports.GetAllImportedBillByIdDB = exports.GetImportedBillDB = void 0;
const mysql_1 = __importDefault(require("mysql"));
const configMySQL_1 = __importStar(require("./configMySQL"));
function GetImportedBillDB(idImportedBill) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = "SELECT * FROM importedbill WHERE idImportedBill = ? ";
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
exports.GetImportedBillDB = GetImportedBillDB;
function GetAllImportedBillByIdDB(idImportBill) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = "SELECT * FROM importedbill where idImportBill = ?";
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
exports.GetAllImportedBillByIdDB = GetAllImportedBillByIdDB;
function InsertImportedBillDB(idImportBill, idImportedBill, idForUser) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = `INSERT INTO importedbill(idImportedBill, idForUser, idImportBill)  VALUES (?,?,?)`;
            con.query(sql, [idImportedBill, idForUser, idImportBill], (err, result, field) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.InsertImportedBillDB = InsertImportedBillDB;
function UpdateStatusImportedBillDB(idImportedBill, paymentDate, status) {
    return new Promise((exc, rej) => {
        var sql = "UPDATE importedbill SET status = ?,paymentDate = ? WHERE idImportedBill= ? ";
        configMySQL_1.con_mysql2.query(sql, [status, paymentDate, idImportedBill], (err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        });
    });
}
exports.UpdateStatusImportedBillDB = UpdateStatusImportedBillDB;
