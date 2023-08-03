"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBigCategoryByidDB = exports.UpdateBigCategoryDB = exports.GetBigCategoryByNameDB = exports.AddBigCategoryDB = exports.GetAllBigcategoryDB = void 0;
const configMySQL_1 = require("./configMySQL");
function GetAllBigcategoryDB() {
    return new Promise((res, rej) => {
        var sql = "SELECT * FROM bigcategory";
        configMySQL_1.con_mysql2.query(sql, ((err, reuslt, fields) => {
            if (err) {
                rej(err);
            }
            res(reuslt);
        }));
    });
}
exports.GetAllBigcategoryDB = GetAllBigcategoryDB;
function AddBigCategoryDB(name) {
    return new Promise((res, rej) => {
        var sql = "INSERT INTO bigcategory(name) VALUES (?)";
        configMySQL_1.con_mysql2.query(sql, [name], ((err, reuslt, fields) => {
            if (err) {
                rej(err);
            }
            res(reuslt);
        }));
    });
}
exports.AddBigCategoryDB = AddBigCategoryDB;
function GetBigCategoryByNameDB(name) {
    return new Promise((res, rej) => {
        var sql = "SELECT * FROM bigcategory WHERE name = ? limit 1";
        configMySQL_1.con_mysql2.query(sql, [name], ((err, reuslt, fields) => {
            if (err) {
                rej(err);
            }
            res(reuslt);
        }));
    });
}
exports.GetBigCategoryByNameDB = GetBigCategoryByNameDB;
function UpdateBigCategoryDB(id, name) {
    return new Promise((res, rej) => {
        var sql = "UPDATE bigcategory SET name=? WHERE idBigCategory=?";
        configMySQL_1.con_mysql2.query(sql, [name, id], ((err, reuslt, fields) => {
            if (err) {
                rej(err);
            }
            res(reuslt);
        }));
    });
}
exports.UpdateBigCategoryDB = UpdateBigCategoryDB;
function DeleteBigCategoryByidDB(id) {
    return new Promise((res, rej) => {
        var sql = "DELETE FROM bigcategory WHERE idBigCategory=?";
        configMySQL_1.con_mysql2.query(sql, [id], (err, resu, fields) => {
            if (err) {
                rej(err);
            }
            res(resu);
        });
    });
}
exports.DeleteBigCategoryByidDB = DeleteBigCategoryByidDB;
