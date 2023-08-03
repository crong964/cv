"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderHtmlFinal = exports.renderClient = void 0;
const admin_1 = __importDefault(require("../admin"));
function renderClient(res, data) {
    data.ip = data.ip || admin_1.default.address;
    res.render(data.path, data);
}
exports.renderClient = renderClient;
function RenderHtmlFinal(req, res, view, data) {
    data.ip = admin_1.default.address;
    data.name = req.body.nameUserInSerVer;
    res.render(view, data);
}
exports.RenderHtmlFinal = RenderHtmlFinal;
