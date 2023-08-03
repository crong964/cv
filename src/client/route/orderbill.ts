import { Router } from "express";
import { AuthorOrUnauthor, UserAuthorization, verifi_post } from "../../middleware/client";
import OrderBillController from "../../controller/OrderBillController";
import { RenderHtmlFinal, renderClient } from "../../lib/client";
import ip from "../../admin";
import { join } from "path";
import OrderBill from "../../model/OrderBill";
import sercurity from "../../lib/sercurity";
import OrderDetailController from "../../controller/OrderDetailController";
import { statusBill } from "../../lib/lib";

const orderbill = Router()
orderbill.use(UserAuthorization(), AuthorOrUnauthor())
orderbill.get("/", async (req, res) => {
    var id = req.cookies.userid

    var type = req.query.type
    var va = req.query.va as string || "0"
    var list;
    if (type && (type == statusBill.pay || type == statusBill.ship)) {
        list = await OrderBillController.GetAllLimiByUserId(id, { fiel: type, va: va })
    } else {
        list = await OrderBillController.GetAllByUserid(id)
    }

    var pa = join(ip.path, 'client/page/html/orderbill/orderbilllist.ejs')

    var ser = sercurity.CreateBase64Url(JSON.stringify(sercurity.CreateSign(13)))
    
    RenderHtmlFinal(req, res, pa, {
        list: list, ser: ser,
        ship: OrderBill.shipmentstatus, pay: OrderBill.paystatus
    })
})
orderbill.post("/", verifi_post({ lenght: 13, va: 'ser' }), async (req, res) => {
    var id = req.body.id

    var ls = await Promise.all([OrderDetailController.GetAllByIdOder(id),
    OrderBillController.GetOrderBill(id)])

    var pa = join(ip.path, 'client/page/html/orderbill/orderbillDetail.ejs')
    RenderHtmlFinal(req,res,pa,{list: ls[0], bill: ls[1]})
})
export default orderbill