import { NextFunction, Request, Response } from "express";
import sercurity, { sercurityO } from "../lib/sercurity";
import ip from "../admin";
import RefreshTokenUserController from "../controller/RefreshTokenUserController";
import InforuserController from "../controller/InforUserController";
import { err } from "../lib/lib";
export interface Login {
    nameUserInSerVer: string | undefined
    isLogin: boolean
}
export interface verifi_postO {
    lenght?: number | undefined
    va?: string | undefined
    time?: number | undefined
}
export function verifi_post(pass?: verifi_postO) {
    var d = pass?.lenght || 10;
    var v = pass?.va || "crt";
    var time = pass?.time || 1000 * 60 * 8
    return (req: Request, res: Response, next: NextFunction) => {
        var crt: sercurityO
        try {
            crt = JSON.parse(
                Buffer.from(req.body[v], "base64url").toString()
            );
        } catch (error) {
            res.end()
            err("verifi_post ", error as string)
            return
        }
        var check = sercurity.VertifySign(crt.v1, crt.date, crt.v2, d);
        var checktime = new Date().getTime() - crt.date;
        if (check && checktime < time) {
            next();
        } else {
            res.redirect(`${ip.address}`);
        }
    };
}
export function UserAuthorization() {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (! await CheckUserAuthorization(req, res)) {
            res.status(401)
            res.redirect(`${ip.address}account`)
            return
        }
        next();
    };
}
export async function CheckUserAuthorization(req: Request, res: Response) {
    var author: sercurityO = req.cookies;
    var userid = req.cookies['userid'] 
    var check = (!userid || !author.v1)
    if (check) {
        return !check
    } 
    var now = (new Date()).getTime()
    var time = now - author.date
    if (time > (1000 * 60 * 60 * 3) || author.date == undefined) {
        var rf = await RefreshTokenUserController.GetRefreshTokenUser(userid, author.v1)
        if (rf == undefined) {
            return false
        }

        var date = now
        var v2 = sercurity.Hash(`${author.v1}` + date, 10)
        res.cookie('date', date, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24) })
        res.cookie('v2', v2, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24) })
        return true
    } 
    var las = sercurity.VertifySign(author.v1, author.date, author.v2, 10)
    
    return las

}
export function AuthorOrUnauthor() {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (await CheckUserAuthorization(req, res)) {
            req.body.isLogin = true
            var temp = await InforuserController.GetInforuser(req.cookies['userid'])
            req.body.nameUserInSerVer = temp?.name
        } else {
            req.body.isLogin = false
            req.body.nameUserInSerVer = undefined
        }
        next()
    }
}