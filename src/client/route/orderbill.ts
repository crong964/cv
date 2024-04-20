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
import PayInvoiceControllder from "../../controller/PayInvoiceControllder";

interface get_bank_list {
    bank_code: string
    bank_name: string
    logo_link: string
    bank_type: number,
    display_order: number
}
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



    RenderHtmlFinal(req, res, pa, {
        list: list,
        ship: OrderBill.shipmentstatus, pay: OrderBill.paystatus
    })
})
orderbill.get("/bill", async (req, res) => {
    var id = req.query.id as string
    if (id == undefined) {
        res.redirect(`${ip.address}orderbill`)
        return
    }

    var ls = await Promise.all([OrderDetailController.GetAllByIdOder(id),
    OrderBillController.GetOrderBill(id),
    PayInvoiceControllder.GetAllPayInvoiceByBilId(id)])

    if (ls[1]?.userid !== parseInt(req.cookies.userid)) {
        res.redirect(`${ip.address}orderbill`)
        return
    }
    var pa = join(ip.path, 'client/page/html/orderbill/orderbillDetail.ejs')
    var ser = sercurity.CreateBase64Url(JSON.stringify(sercurity.CreateSign(13)))
    var pay = sercurity.CreateBase64Url(JSON.stringify(sercurity.CreateSign(20)))

    var s: get_bank_list[] = await (await fetch('https://sandbox.vnpayment.vn/qrpayauth/api/merchant/get_bank_list', {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "post",
        body: "tmn_code=7VPICSE9"
    })).json() as []

    var s = s.map((v) => {
        v.logo_link = v.logo_link.replace("~/", "")
        return v
    })
        .filter((v) => {
            if (v.logo_link.indexOf(".png") > 0) {
                return true
            }
            return false
        })

    
    RenderHtmlFinal(req, res, pa, { list: ls[0], bill: ls[1], payl: ls[2], ser, pay, s })
})
orderbill.post("/paid", verifi_post({ lenght: 13, va: 'ser' }), async (req, res) => {
    var idbill = req.body.idbill
    var id = req.cookies.userid
    var bill = await OrderBillController.GetOrderBill(idbill)
    if (bill?.userid !== parseInt(id)) {
        res.json({
            err: true,
            mess: 'người dùng không có hàng'
        })
        return
    }
    var check = await OrderBillController.UpdatePay(idbill, 2)
    if (check?.affectedRows && check?.affectedRows >= 1) {
        res.json({
            err: true,
            mess: 'thành công'
        })
        return
    }
    res.json({
        err: false,
        mess: 'thất bại'
    })
    return
})
export default orderbill



