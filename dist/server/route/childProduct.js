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
const ChildProductController_1 = __importDefault(require("../../controller/ChildProductController"));
const path_1 = require("path");
const admin_1 = __importDefault(require("../../admin"));
const childProduct = (0, express_1.Router)();
childProduct.use(lib_1.vali);
childProduct.get("/:idProduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var idProduct = parseInt(req.params.idProduct);
    var list = yield ChildProductController_1.default.GetAllChildProductByIdProduct(idProduct);
    var pa = (0, path_1.join)(admin_1.default.path, "/server/page/html/childPRoduct.ejs");
    res.render(pa, { ip: admin_1.default.address, list });
}));
exports.default = childProduct;
