import { Router } from "express";
import { vali } from "../../lib/lib";
import { RenderHtmlFinal_AD } from "../../lib/admin";
import { join } from "path";
import ip from "../../admin";
import InforUserController from "../../controller/InforUserController";
import { InforUser } from "../../model/InforUser";

const inforuser = Router()

inforuser.use(vali)

inforuser.get("/", async (req, res) => {
    var pa = join(ip.path, "/server/page/html/inforuser/inforuserlist.ejs")
    var start = parseInt(req.query.start as string)
    var count = parseInt(req.query.count as string)
    var ls = await InforUserController.GetAllInforuser({ start, count })
    RenderHtmlFinal_AD(req, res, pa, { ls: ls, statusS: InforUser.statusS })
})


export default inforuser