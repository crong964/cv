"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderHtmlFinal_AD = void 0;
const admin_1 = __importDefault(require("../admin"));
function RenderHtmlFinal_AD(req, res, views, data) {
    data.ip = admin_1.default.address;
    res.render(views, data);
}
exports.RenderHtmlFinal_AD = RenderHtmlFinal_AD;
