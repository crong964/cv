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
exports.UpdateStatusDB = exports.RemoveBill = exports.InsertImportBillDB = exports.GetAllImportBillDB = exports.GetImportBillByIdDB = void 0;
const configMySQL_1 = __importStar(require("./configMySQL"));
const mysql_1 = __importDefault(require("mysql"));
function GetImportBillByIdDB(idImportBill) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = "SELECT * FROM importbill WHERE idImportBill=?";
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
exports.GetImportBillByIdDB = GetImportBillByIdDB;
function GetAllImportBillDB(pa) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = "SELECT * FROM importbill WHERE status > -1 AND status like ?";
            con.query(sql, [`%${pa.status}%`], (err, result, field) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.GetAllImportBillDB = GetAllImportBillDB;
function InsertImportBillDB(idImportBill, idForUser, createdDay, finishDay, supplier) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = "INSERT INTO importbill(idImportBill, createdDay, idForUser, finishDay, supplier) VALUES (?,?,?,?,?)";
            con.query(sql, [idImportBill, createdDay, idForUser, finishDay, supplier], (err, result, field) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.InsertImportBillDB = InsertImportBillDB;
function RemoveBill(idImportBill) {
    return new Promise((res, rej) => {
        var sql = `UPDATE importbill SET status= -1 WHERE idImportBill = ?`;
        configMySQL_1.con_mysql2.query(sql, [idImportBill], ((err, result, fiels) => {
            if (err) {
                rej(err);
            }
            res(result);
        }));
    });
}
exports.RemoveBill = RemoveBill;
function UpdateStatusDB(idImportBill, status) {
    return new Promise((res, rej) => {
        var sql = `UPDATE importbill SET status= ? WHERE idImportBill = ?`;
        configMySQL_1.con_mysql2.query(sql, [status, idImportBill], ((err, result, fiels) => {
            if (err) {
                rej(err);
            }
            res(result);
        }));
    });
}
exports.UpdateStatusDB = UpdateStatusDB;
