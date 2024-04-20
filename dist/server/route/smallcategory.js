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
const client_1 = require("../../middleware/client");
const admin_1 = __importDefault(require("../../admin"));
const SmallcategoryControllder_1 = __importDefault(require("../../controller/SmallcategoryControllder"));
const smallcategory = (0, express_1.Router)();
smallcategory.post("/update", (0, client_1.verifi_post)({ lenght: 14, va: "srt" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var post = req.body;
    var check = yield SmallcategoryControllder_1.default.UpdateSmallcategory(post.idSmallCategory, post.nameSmallCategory);
    res.redirect(`${admin_1.default.address}admin/category`);
}));
exports.default = smallcategory;
