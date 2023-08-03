"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseModel {
    constructor() {
    }
    setAll(p) {
        for (const key in this) {
            const element = p[key];
            this[key] = element;
        }
    }
    json() {
        var s = {};
        for (const key in this) {
            if (this[key] != undefined) {
                s[key] = this[key];
            }
        }
        return s;
    }
}
exports.default = BaseModel;
