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
exports.UpdateChildProductDB = exports.AddChildProductDB = exports.UpdateAmountChildProductDB = exports.GetChildProductDB = exports.GetAllChildProductByIdProductDB = void 0;
const mysql_1 = __importDefault(require("mysql"));
const configMySQL_1 = __importStar(require("./configMySQL"));
function GetAllChildProductByIdProductDB(idProduct) {
    return new Promise((res, rej) => {
        var sql = `SELECT * FROM childproduct WHERE idProduct = ?`;
        configMySQL_1.con_mysql2.query(sql, [idProduct], (err, va, fiels) => {
            if (err) {
                rej(err);
            }
            res(va);
        });
    });
}
exports.GetAllChildProductByIdProductDB = GetAllChildProductByIdProductDB;
function GetChildProductDB(idChildProduct) {
    return new Promise((res, rej) => {
        var sql = `SELECT * FROM childproduct WHERE idChildProduct=?`;
        configMySQL_1.con_mysql2.query(sql, idChildProduct, (err, result, fiels) => {
            if (err) {
                rej(err);
            }
            res(result);
        });
    });
}
exports.GetChildProductDB = GetChildProductDB;
function UpdateAmountChildProductDB(idChildProduct, quantity) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = `UPDATE childproduct
      SET amount= amount + ?
      WHERE idChildProduct= ? `;
            con.query(sql, [quantity, idChildProduct], (err, result, fiels) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.UpdateAmountChildProductDB = UpdateAmountChildProductDB;
function AddChildProductDB(idChildProduct, idProduct, nameChildProduct, importPrice, price, image) {
    return new Promise((res, rej) => {
        var sql = `INSERT INTO childproduct(idChildProduct, idProduct, nameChildProduct, importPrice, price, image) VALUES (?,?,?,?,?,?)`;
        configMySQL_1.con_mysql2.query(sql, [idChildProduct, idProduct, nameChildProduct, importPrice, price, image], ((err, result, fiels) => {
            if (err) {
                rej(err);
            }
            res(result);
        }));
    });
}
exports.AddChildProductDB = AddChildProductDB;
function UpdateChildProductDB(idChildProduct, nameChildProduct, importPrice, price, image) {
    return new Promise((res, rej) => {
        var sql = `UPDATE childproduct 
      SET nameChildProduct=?,importPrice=?,price=?,image=? 
      WHERE idChildProduct=?`;
        configMySQL_1.con_mysql2.query(sql, [nameChildProduct, importPrice, price, image, idChildProduct], (err, result, fields) => {
            if (err) {
                rej(err);
            }
            res(result);
        });
    });
}
exports.UpdateChildProductDB = UpdateChildProductDB;
