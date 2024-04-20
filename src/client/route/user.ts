import { Router } from "express";
import { join } from "path";
import ip from "../../admin";
import InforUserController from "../../controller/InforUserController";
import { RenderHtmlFinal } from "../../lib/client";
import { AuthorOrUnauthor, UserAuthorization, verifi_post } from "../../middleware/client";
import AccountUserControllder from "../../controller/AccountUserControllder";
import sercurity from "../../lib/sercurity";

const user = Router()

user.use(UserAuthorization(), AuthorOrUnauthor())

user.get("/profile", async (req, res) => {
    var pa = join(ip.path, "client/page/html/user/profile.ejs")
    var id = req.cookies.userid
    var user = await Promise.all([InforUserController.GetInforuser(id),
    AccountUserControllder.GetAccountUserById(id)])

    var ser = sercurity.CreateBase64Url(JSON.stringify(sercurity.CreateSign(20)))
    RenderHtmlFinal(req, res, pa, { profi: user[0], acc: user[1], profiSer: ser })
})
user.post("/profile", verifi_post({ va: "profiSer", lenght: 20 }), async (req, res) => {
    var id = req.cookies.userid
    var name = req.body.name
    var numberPhone = req.body.numberPhone
    var address = req.body.address

   
    var pa = join(ip.path, "client/page/html/user/profile.ejs")
    await InforUserController.UpdateInforuser(address, numberPhone, name, id)

    var user = await Promise.all([InforUserController.GetInforuser(id),
    AccountUserControllder.GetAccountUserById(id)])
 
    var ser = sercurity.CreateBase64Url(JSON.stringify(sercurity.CreateSign(20)))
    RenderHtmlFinal(req, res, pa, { profi: user[0], acc: user[1], profiSer: ser })

})
export default user