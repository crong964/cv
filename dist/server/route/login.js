"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const admin_1 = __importDefault(require("../../admin"));
const AccountEmployeeController_1 = __importDefault(require("../../controller/AccountEmployeeController"));
const InforEmployeeController_1 = __importDefault(require("../../controller/InforEmployeeController"));
const admin_2 = require("../../lib/admin");
const login = (0, express_1.Router)();
login.get("/", (req, res) => {
    if (req.cookies.id == undefined) {
        var pa = path_1.default.join(admin_1.default.path, "/server/page/html/login.ejs");
        (0, admin_2.RenderHtmlFinal_AD)(req, res, pa, {});
        return;
    }
    res.redirect("/");
});
login.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var p = req.body;
    console.log(p.username);
    var check = yield Promise.all([
        AccountEmployeeController_1.default.Has(p.username, p.password),
        InforEmployeeController_1.default.GetInforEmByAcount(p.username),
    ]);
    if (!check[0] || check[1] == undefined) {
        var pa = path_1.default.join(admin_1.default.path, "/server/page/html/login.html");
        (0, admin_2.RenderHtmlFinal_AD)(req, res, pa, {});
        return;
    }
    res.cookie("id", check[1].idInforUser, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 356,
    });
    res.redirect(`${admin_1.default.address}admin`);
}));
exports.default = login;
