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
exports.RemoveTemProductInCartDB = exports.GetAllTempProductInCartDB = exports.GetTempProductInCartByDB = exports.InsertTempCartDB = void 0;
const mysql_1 = __importDefault(require("mysql"));
const configMySQL_1 = __importStar(require("./configMySQL"));
function InsertTempCartDB(idChildProduct, idInforUser) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = "INSERT INTO tempcart(idInforUser, idChildProduct) VALUES (?,?)";
            con.query(sql, [idInforUser, idChildProduct], (err, result, fiels) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.InsertTempCartDB = InsertTempCartDB;
function GetTempProductInCartByDB(idChildProduct, idInforUser) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = `SELECT * 
FROM tempcart
WHERE idChildProduct =? AND idInforUser=?`;
            con.query(sql, [idChildProduct, idInforUser], (err, result, fiels) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.GetTempProductInCartByDB = GetTempProductInCartByDB;
function GetAllTempProductInCartDB(idInforUser) {
    return new Promise((res, rej) => {
        var con = mysql_1.default.createConnection(configMySQL_1.default);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = `SELECT c.idChildProduct, c.nameChildProduct, c.importPrice,c.image FROM tempcart t,childproduct c WHERE t.idChildProduct=c.idChildProduct AND 
        t.idInforUser=?`;
            con.query(sql, idInforUser, (err, result, fiels) => {
                if (err) {
                    rej(err);
                }
                con.end();
                res(result);
            });
        });
    });
}
exports.GetAllTempProductInCartDB = GetAllTempProductInCartDB;
function RemoveTemProductInCartDB(idChildProduct, idInforUser) {
    return new Promise((res, rej) => {
        var sql = `DELETE FROM tempcart WHERE idInforUser=? AND idChildProduct=?`;
        configMySQL_1.con_mysql2.query(sql, [idInforUser, idChildProduct], (err, result, fiels) => {
            if (err) {
                rej(err);
            }
            res(result);
        });
    });
}
exports.RemoveTemProductInCartDB = RemoveTemProductInCartDB;
