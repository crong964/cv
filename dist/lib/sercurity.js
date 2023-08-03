"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class sercurity {
    constructor() {
    }
    static Hash(s, lenght) {
        var d = lenght || 10;
        return crypto_1.default.createHash("shake256", { outputLength: d })
            .update(s)
            .update(sercurity.key).digest().toString("base64url");
    }
    static CreateSign(n) {
        var d = n || 10;
        var v1 = crypto_1.default.randomBytes(d).toString("base64url");
        var date = new Date().getTime();
        var v2 = sercurity.Hash(`${v1}` + date, d);
        return { v1: v1, date: date, v2: v2 };
    }
    static VertifySign(v1, date, v2, lenght) {
        var d = lenght || 10;
        var tempv2 = this.Hash(`${v1}` + date, d);
        return (tempv2 === v2);
    }
    static RandomKey(d) {
        return crypto_1.default.randomBytes(d || 10).toString("base64url");
    }
    static CreateBase64Url(s) {
        return Buffer.from(s).toString("base64url");
    }
}
sercurity.key = "12345678";
exports.default = sercurity;
