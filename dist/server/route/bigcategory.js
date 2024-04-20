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
const BigcategoryController_1 = __importDefault(require("../../controller/BigcategoryController"));
const SmallcategoryControllder_1 = __importDefault(require("../../controller/SmallcategoryControllder"));
const sercurity_1 = __importDefault(require("../../lib/sercurity"));
const admin_2 = require("../../lib/admin");
const bigcategory = (0, express_1.Router)();
bigcategory.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var list = yield Promise.all([BigcategoryController_1.default.GetAllBigcategory(),
        SmallcategoryControllder_1.default.GetAllSmallcategory()]);
    var srt = sercurity_1.default.CreateBase64Url(JSON.stringify(sercurity_1.default.CreateSign(14)));
    var pa = path_1.default.join(admin_1.default.path, "/server/page/html/category.ejs");
    (0, admin_2.RenderHtmlFinal_AD)(req, res, pa, { list1: list[0], list2: list[1], srt: srt });
}));
bigcategory.post("/Add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name) {
        res.redirect(`${admin_1.default.address}admin/category`);
        return;
    }
    var name = req.body.name;
    name.trim();
    var check = yield BigcategoryController_1.default.GetBigCategoryByName(name);
    if (check) {
        res.redirect(`${admin_1.default.address}admin/category`);
        return;
    }
    var check = yield BigcategoryController_1.default.AddBigCategory(name);
    res.redirect(`${admin_1.default.address}admin/category`);
}));
bigcategory.post("/Edit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.id && !req.body.name) {
        res.redirect(`${admin_1.default.address}admin/category`);
        return;
    }
    var name = req.body.name;
    var id = req.body.idBigCategory;
    name.trim();
    id.trim();
    var check = yield BigcategoryController_1.default.UpdateBigCategory(id, name);
    res.redirect(`${admin_1.default.address}admin/category`);
    console.log(check);
}));
bigcategory.post("/Delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.body.id;
    if (id != undefined) {
        yield BigcategoryController_1.default.DeleteBigCategoryByid(id);
    }
    res.redirect(`${admin_1.default.address}admin/category`);
}));
exports.default = bigcategory;
