"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.con_mysql2 = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
var config = {
    host: "localhost",
    database: "store",
    user: "root",
    password: "",
};
exports.con_mysql2 = mysql2_1.default.createPool(config);
// {
//   host: "store-huy91027-8633.aivencloud.com",
//   port: 18654,
//   user: "avnadmin",
//   
//   database:""
// }
exports.con_mysql2.getConnection((err, conc) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("success connection");
    }
});
exports.default = config;
