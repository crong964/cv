"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class AccountUser extends BaseModel_1.default {
    constructor() {
        super();
        this.account = undefined;
        this.idUser = undefined;
        this.password = undefined;
    }
}
exports.default = AccountUser;
