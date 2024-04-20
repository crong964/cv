"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InforUser = void 0;
const BaseModel_1 = __importDefault(require("./BaseModel"));
class InforUser extends BaseModel_1.default {
    constructor() {
        super();
        this.status = 0;
        this.address = undefined;
        this.numberPhone = undefined;
        this.id = undefined;
        this.name = undefined;
    }
}
exports.InforUser = InforUser;
InforUser.statusS = ['kích hoạt', 'khóa'];
