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
exports.AuthorOrUnauthor = exports.CheckUserAuthorization = exports.UserAuthorization = exports.verifi_post = void 0;
const sercurity_1 = __importDefault(require("../lib/sercurity"));
const admin_1 = __importDefault(require("../admin"));
const RefreshTokenUserController_1 = __importDefault(require("../controller/RefreshTokenUserController"));
const InforUserController_1 = __importDefault(require("../controller/InforUserController"));
const lib_1 = require("../lib/lib");
function verifi_post(pass) {
    var d = (pass === null || pass === void 0 ? void 0 : pass.lenght) || 10;
    var v = (pass === null || pass === void 0 ? void 0 : pass.va) || "crt";
    var time = (pass === null || pass === void 0 ? void 0 : pass.time) || 1000 * 60 * 8;
    return (req, res, next) => {
        var crt;
        try {
            crt = JSON.parse(Buffer.from(req.body[v], "base64url").toString());
        }
        catch (error) {
            res.end();
            (0, lib_1.err)("verifi_post ", error);
            return;
        }
        var check = sercurity_1.default.VertifySign(crt.v1, crt.date, crt.v2, d);
        var checktime = new Date().getTime() - crt.date;
        if (check && checktime < time) {
            next();
        }
        else {
            res.redirect(`${admin_1.default.address}`);
        }
    };
}
exports.verifi_post = verifi_post;
function UserAuthorization() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (!(yield CheckUserAuthorization(req, res))) {
            res.status(401);
            res.redirect(`${admin_1.default.address}account`);
            return;
        }
        next();
    });
}
exports.UserAuthorization = UserAuthorization;
function CheckUserAuthorization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var author = req.cookies;
        var userid = req.cookies['userid'];
        var check = (!userid || !author.v1);
        if (check) {
            return !check;
        }
        var now = (new Date()).getTime();
        var time = now - author.date;
        if (time > (1000 * 60 * 60 * 3) || author.date == undefined) {
            var rf = yield RefreshTokenUserController_1.default.GetRefreshTokenUser(userid, author.v1);
            if (rf == undefined) {
                return false;
            }
            var date = now;
            var v2 = sercurity_1.default.Hash(`${author.v1}` + date, 10);
            res.cookie('date', date, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24) });
            res.cookie('v2', v2, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24) });
            return true;
        }
        var las = sercurity_1.default.VertifySign(author.v1, author.date, author.v2, 10);
        return las;
    });
}
exports.CheckUserAuthorization = CheckUserAuthorization;
function AuthorOrUnauthor() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (yield CheckUserAuthorization(req, res)) {
            req.body.isLogin = true;
            var temp = yield InforUserController_1.default.GetInforuser(req.cookies['userid']);
            req.body.nameUserInSerVer = temp === null || temp === void 0 ? void 0 : temp.name;
        }
        else {
            req.body.isLogin = false;
            req.body.nameUserInSerVer = undefined;
        }
        next();
    });
}
exports.AuthorOrUnauthor = AuthorOrUnauthor;
