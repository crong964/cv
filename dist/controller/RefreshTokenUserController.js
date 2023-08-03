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
const RefreshTokenUserDB_1 = require("../database/RefreshTokenUserDB");
const lib_1 = require("../lib/lib");
const RefreshTokenUser_1 = __importDefault(require("../model/RefreshTokenUser"));
class RefreshTokenUserController {
    constructor() {
    }
    AddRefreshTokenUser(idUser, refreshtoken) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, RefreshTokenUserDB_1.AddRefreshTokenUserDB)(idUser, refreshtoken));
            }
            catch (error) {
                (0, lib_1.err)("AddRefreshTokenUser RefreshTokenUserController", error);
            }
            return check;
        });
    }
    DeleteRefreshTokenUser(idUser, refreshtoken) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = (yield (0, RefreshTokenUserDB_1.DeleteRefreshTokenUserDB)(idUser, refreshtoken));
            }
            catch (error) {
                (0, lib_1.err)("DeleteRefreshTokenUser RefreshTokenUserController", error);
            }
            return check;
        });
    }
    GetRefreshTokenUser(userId, refreshtoken) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log();
            var v;
            try {
                var ls = yield (0, RefreshTokenUserDB_1.GetRefreshTokenUserDB)(userId, refreshtoken);
                for (let i = 0; i < ls.length; i++) {
                    const element = ls[i];
                    v = new RefreshTokenUser_1.default();
                    v.setAll(element);
                    break;
                }
            }
            catch (error) {
                (0, lib_1.err)("GetRefreshTokenUser RefreshTokenUserController", error);
            }
            return v;
        });
    }
}
exports.default = new RefreshTokenUserController();
