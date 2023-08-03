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
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const buffer_1 = require("buffer");
const admin_1 = __importDefault(require("../../admin"));
const sercurity_1 = __importDefault(require("../../lib/sercurity"));
const client_1 = require("../../middleware/client");
const AccountUserControllder_1 = __importDefault(require("../../controller/AccountUserControllder"));
const InforuserController_1 = __importDefault(require("../../controller/InforuserController"));
const RefreshTokenUserController_1 = __importDefault(require("../../controller/RefreshTokenUserController"));
const account = (0, express_1.default)();
account.get("/", (0, client_1.AuthorOrUnauthor)(), (req, res) => {
    let t = req.body;
    if (t.isLogin) {
        res.redirect(`${admin_1.default.address}`);
        return;
    }
    var s = JSON.stringify(sercurity_1.default.CreateSign());
    var crt = buffer_1.Buffer.from(s).toString("base64url");
    var pa = (0, path_1.join)(admin_1.default.path, "client/page/html/sginup/signin.ejs");
    res.render(pa, { ip: admin_1.default.address, crt: crt, name: undefined });
});
account.post("/", (0, client_1.verifi_post)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var post = req.body;
    var s = yield AccountUserControllder_1.default.GetAccountUserByAccAndPass(post.account, post.password);
    if (s == undefined || s.idUser == undefined) {
        res.redirect(`${admin_1.default.address}account`);
        return;
    }
    var date = (new Date()).getTime();
    var v1 = sercurity_1.default.RandomKey(10);
    var v2 = sercurity_1.default.Hash(`${v1}` + date, 10);
    res.cookie("date", date, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24), sameSite: "lax" });
    res.cookie("userid", s.idUser, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24 * 365) });
    res.cookie("v2", v2, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24) });
    res.cookie("v1", v1, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24 * 365) });
    yield RefreshTokenUserController_1.default.AddRefreshTokenUser(s.idUser, v1);
    res.redirect(`${admin_1.default.address}`);
}));
account.get("/signup", (req, res) => {
    var s = JSON.stringify(sercurity_1.default.CreateSign());
    var crt = buffer_1.Buffer.from(s).toString("base64url");
    var pa = (0, path_1.join)(admin_1.default.path, "client/page/html/sginup/signup.ejs");
    res.render(pa, { ip: admin_1.default.address, crt: crt, name: undefined });
});
account.post("/signup", (0, client_1.verifi_post)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var g = req.body;
    if (g.password !== g.password2) {
        res.redirect(`${admin_1.default.address}signup`);
        return;
    }
    var check = yield AccountUserControllder_1.default.Has(g.account);
    if (check) {
        res.redirect(`${admin_1.default.address}account/signup?tb=trungtk`);
        return;
    }
    var s = yield InforuserController_1.default.AddInforuser(g.address, g.phonenumber);
    if ((s === null || s === void 0 ? void 0 : s.insertId) == 0 || (s === null || s === void 0 ? void 0 : s.insertId) == undefined || s == undefined) {
        res.redirect(`${admin_1.default.address}account/signup?tb=khongthemdc`);
        return;
    }
    var checkL = yield AccountUserControllder_1.default.AddAccountUser(g.account, g.password, s.insertId + "");
    if (checkL == undefined) {
        res.redirect(`${admin_1.default.address}account/signup?tb=kotk`);
        return;
    }
    res.redirect(`${admin_1.default.address}account/`);
}));
account.get("/ver", (0, client_1.UserAuthorization)(), (req, res) => {
    res.json({ mess: "xác thực thành công" });
});
account.get("/signout", (0, client_1.UserAuthorization)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var author = req.cookies;
    var userid = req.cookies['userid'];
    var check = yield RefreshTokenUserController_1.default.DeleteRefreshTokenUser(userid, author.v1);
    res.clearCookie("v1");
    res.clearCookie("userid");
    res.redirect(`${admin_1.default.address}`);
}));
exports.default = account;
