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
const lib_1 = require("../../lib/lib");
const admin_1 = require("../../lib/admin");
const path_1 = require("path");
const admin_2 = __importDefault(require("../../admin"));
const InforUserController_1 = __importDefault(require("../../controller/InforUserController"));
const InforUser_1 = require("../../model/InforUser");
const inforuser = (0, express_1.Router)();
inforuser.use(lib_1.vali);
inforuser.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var pa = (0, path_1.join)(admin_2.default.path, "/server/page/html/inforuser/inforuserlist.ejs");
    var start = parseInt(req.query.start);
    var count = parseInt(req.query.count);
    var ls = yield InforUserController_1.default.GetAllInforuser({ start, count });
    (0, admin_1.RenderHtmlFinal_AD)(req, res, pa, { ls: ls, statusS: InforUser_1.InforUser.statusS });
}));
exports.default = inforuser;
