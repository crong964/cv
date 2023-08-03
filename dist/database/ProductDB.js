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
exports.GetAllProductByBigCategaryDB = exports.UpdateProductDB = exports.DeleteProductDB = exports.AddProductDB = exports.GetProductDB = exports.UpdateAmountProductDB = exports.GetAllProductDB = void 0;
const mysql_1 = __importDefault(require("mysql"));
const configMySQL_1 = __importStar(require("./configMySQL"));
function GetAllProductDB() {
    return new Promise((res, rej) => {
        var sql = "SELECT * FROM product";
        configMySQL_1.con_mysql2.query(sql, (err, va, fiels) => {
            if (err) {
                rej(err);
            }
            res(va);
        });
    });
}
exports.GetAllProductDB = GetAllProductDB;
function UpdateAmountProductDB(idProduct, quantity) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = `UPDATE product SET amount = amount + ? WHERE idProduct = ?`;
            con.query(sql, [quantity, idProduct], (err, result, field) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.UpdateAmountProductDB = UpdateAmountProductDB;
function GetProductDB(idProduct) {
    return new Promise((res, rej) => {
        var sql = `SELECT * FROM product WHERE idProduct=?`;
        configMySQL_1.con_mysql2.query(sql, idProduct, (err, result, field) => {
            if (err) {
                rej(err);
            }
            res(result);
        });
    });
}
exports.GetProductDB = GetProductDB;
function AddProductDB(namePro, Price, ImportPrice, idBigCategory, idSmallCategory, image, bt) {
    return new Promise((res, rej) => {
        var sql = "INSERT INTO product( namePro, idSmallCategory, idBigCategory, image, importPrices, Price,bt) VALUES (?,?,?,?,?,?,?)";
        configMySQL_1.con_mysql2.query(sql, [namePro, idSmallCategory, idBigCategory, image, ImportPrice, Price, bt], (err, result, fiel) => {
            if (err) {
                rej(err);
            }
            res(result);
        });
    });
}
exports.AddProductDB = AddProductDB;
function DeleteProductDB(id) {
    return new Promise((res, rej) => {
        var sql = "DELETE FROM product WHERE idProduct= ?";
        configMySQL_1.con_mysql2.query(sql, id, (err, result, fiel) => {
            if (err) {
                rej(err);
            }
            res(result);
        });
    });
}
exports.DeleteProductDB = DeleteProductDB;
function UpdateProductDB(idProduct, namePro, Price, ImportPrice, idBigCategory, idSmallCategory, image, bt) {
    return new Promise((res, rej) => {
        var sql = `UPDATE product 
    SET namePro=?,idSmallCategory=?,idBigCategory=?,image=?,importPrices=?,Price=?,bt=?
    WHERE idProduct=? `;
        configMySQL_1.con_mysql2.query(sql, [namePro, idSmallCategory, idBigCategory, image, ImportPrice, Price, bt, idProduct], (err, resutlt, fiels) => {
            if (err) {
                rej(err);
            }
            res(resutlt);
        });
    });
}
exports.UpdateProductDB = UpdateProductDB;
function GetAllProductByBigCategaryDB(idBigCategory, start, count) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM product WHERE idBigCategory=? LIMIT ?,?`;
        configMySQL_1.con_mysql2.query(sql, [idBigCategory, start, count], ((err, res, fields) => {
            if (err) {
                rej(err);
            }
            exc(res);
        }));
    });
}
exports.GetAllProductByBigCategaryDB = GetAllProductByBigCategaryDB;
