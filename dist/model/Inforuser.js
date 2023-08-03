"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inforuser = void 0;
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Inforuser extends BaseModel_1.default {
    constructor() {
        super();
        this.address = undefined;
        this.numberPhone = undefined;
        this.id = undefined;
        this.name = undefined;
    }
}
exports.Inforuser = Inforuser;
