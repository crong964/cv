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
const path_1 = require("path");
const admin_1 = __importDefault(require("../../admin"));
const InforUserController_1 = __importDefault(require("../../controller/InforUserController"));
const client_1 = require("../../lib/client");
const client_2 = require("../../middleware/client");
const AccountUserControllder_1 = __importDefault(require("../../controller/AccountUserControllder"));
const sercurity_1 = __importDefault(require("../../lib/sercurity"));
const user = (0, express_1.Router)();
user.use((0, client_2.UserAuthorization)(), (0, client_2.AuthorOrUnauthor)());
user.get("/profile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var pa = (0, path_1.join)(admin_1.default.path, "client/page/html/user/profile.ejs");
    var id = req.cookies.userid;
    var user = yield Promise.all([InforUserController_1.default.GetInforuser(id),
        AccountUserControllder_1.default.GetAccountUserById(id)]);
    var ser = sercurity_1.default.CreateBase64Url(JSON.stringify(sercurity_1.default.CreateSign(20)));
    (0, client_1.RenderHtmlFinal)(req, res, pa, { profi: user[0], acc: user[1], profiSer: ser });
}));
user.post("/profile", (0, client_2.verifi_post)({ va: "profiSer", lenght: 20 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.cookies.userid;
    var name = req.body.name;
    var numberPhone = req.body.numberPhone;
    var address = req.body.address;
    var pa = (0, path_1.join)(admin_1.default.path, "client/page/html/user/profile.ejs");
    yield InforUserController_1.default.UpdateInforuser(address, numberPhone, name, id);
    var user = yield Promise.all([InforUserController_1.default.GetInforuser(id),
        AccountUserControllder_1.default.GetAccountUserById(id)]);
    var ser = sercurity_1.default.CreateBase64Url(JSON.stringify(sercurity_1.default.CreateSign(20)));
    (0, client_1.RenderHtmlFinal)(req, res, pa, { profi: user[0], acc: user[1], profiSer: ser });
}));
exports.default = user;
