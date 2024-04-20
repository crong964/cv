import express from "express"
import { join } from "path"
import { Buffer } from "buffer"
import ip from "../../admin"
import sercurity, { sercurityO } from "../../lib/sercurity"
import { AuthorOrUnauthor, Login, UserAuthorization, verifi_post } from "../../middleware/client"
import AccountUserControllder from "../../controller/AccountUserControllder"
import InforuserController from "../../controller/InforUserController"
import RefreshTokenUserController from "../../controller/RefreshTokenUserController"



const account = express()
interface signupPost {
    account: string
    password: string
    password2: string
    phonenumber: string
    address: string
}
interface signin {
    account: string
    password: string
}
account.get("/", AuthorOrUnauthor(), (req, res) => {
    let t: Login = req.body
    if (t.isLogin) {
        res.redirect(`${ip.address}`)
        return
    }

    var s = JSON.stringify(sercurity.CreateSign())
    var crt = Buffer.from(s).toString("base64url")
    var pa = join(ip.path, "client/page/html/sginup/signin.ejs")
    res.render(pa, { ip: ip.address, crt: crt, name: undefined })
})
account.post("/", verifi_post(), async (req, res) => {
    var post: signin = req.body
    var s = await AccountUserControllder.GetAccountUserByAccAndPass(post.account, post.password)
    if (s == undefined || s.idUser == undefined) {
        res.redirect(`${ip.address}account`)
        return
    }

    var date = (new Date()).getTime()
    var v1 = sercurity.RandomKey(10)
    var v2 = sercurity.Hash(`${v1}` + date, 10)


    res.cookie("date", date, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24),sameSite:"lax" })
    res.cookie("userid", s.idUser, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24 * 365) })
    res.cookie("v2", v2, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24) })
    res.cookie("v1", v1, { httpOnly: true, maxAge: (1000 * 60 * 60 * 24 * 365) })

    await RefreshTokenUserController.AddRefreshTokenUser(s.idUser, v1)
    res.redirect(`${ip.address}`)
})
account.get("/signup", (req, res) => {
    var s = JSON.stringify(sercurity.CreateSign())
    var crt = Buffer.from(s).toString("base64url")
    var pa = join(ip.path, "client/page/html/sginup/signup.ejs")

    res.render(pa, { ip: ip.address, crt: crt, name: undefined })
})
account.post("/signup", verifi_post(), async (req, res) => {
    var g: signupPost = req.body

    if (g.password !== g.password2) {
        res.redirect(`${ip.address}signup`)
        return
    }

    var check = await AccountUserControllder.Has(g.account)


    if (check) {
        res.redirect(`${ip.address}account/signup?tb=trungtk`)
        return
    }

    var s = await InforuserController.AddInforuser(g.address, g.phonenumber)
    if (s?.insertId == 0 || s?.insertId == undefined || s == undefined) {
        res.redirect(`${ip.address}account/signup?tb=khongthemdc`)
        return
    }
    var checkL = await AccountUserControllder.AddAccountUser(g.account, g.password, s.insertId + "")
    if (checkL == undefined) {
        res.redirect(`${ip.address}account/signup?tb=kotk`)
        return
    }
    res.redirect(`${ip.address}account/`)
})
account.get("/ver", UserAuthorization(), (req, res) => {
    res.json({ mess: "xác thực thành công" })
})
account.get("/signout", UserAuthorization(), async (req, res) => {
    var author: sercurityO = req.cookies;
    var userid = req.cookies['userid']

    var check = await RefreshTokenUserController.DeleteRefreshTokenUser(userid, author.v1)
    res.clearCookie("v1")
    res.clearCookie("userid")
    res.redirect(`${ip.address}`)
})
export default account