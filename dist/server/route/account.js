"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lib_1 = require("../../lib/lib");
const admin_1 = require("../../lib/admin");
const path_1 = require("path");
const admin_2 = __importDefault(require("../../admin"));
const account = (0, express_1.Router)();
account.use(lib_1.vali);
account.get("/", (req, res) => {
    var pa = (0, path_1.join)(admin_2.default.path, "/server/page/html/account/accountlist.ejs");
    var acc;
    (0, admin_1.RenderHtmlFinal_AD)(req, res, pa, {});
});
exports.default = account;
