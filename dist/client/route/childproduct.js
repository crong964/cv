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
const ChildProductController_1 = __importDefault(require("../../controller/ChildProductController"));
const childproduct = (0, express_1.Router)();
childproduct.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    if (id == undefined) {
        res.json({});
        return;
    }
    var childproduct = yield ChildProductController_1.default.Get(id);
    if (childproduct == undefined) {
        res.json({});
        return;
    }
    res.json({
        id: childproduct.idChildProduct,
        quantity: childproduct.amount,
        price: childproduct.price,
        image: childproduct.image,
        nameChildPro: childproduct.nameChildProduct
    });
}));
exports.default = childproduct;
