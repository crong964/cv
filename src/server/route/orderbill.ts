import express from "express";
import OrderBillController, { GrapOrderBill } from "../../controller/OrderBillController";
import { RenderHtmlFinal_AD } from "../../lib/admin";
import { join } from "path";
import ip from "../../admin";
import OrderBill from "../../model/OrderBill";
import OrderDetailController from "../../controller/OrderDetailController";
import sercurity from "../../lib/sercurity";
import { verifi_post } from "../../middleware/client";
import PayInvoiceControllder from "../../controller/PayInvoiceControllder";
import PayInvoice from "../../model/PayInvoice";
const orderbill = express()


orderbill.get('/', async (req, res) => {
    var pa: string = join(ip.path, '/server/page/html/orderbill/orderbill.ejs')
    var limit: GrapOrderBill = {
        start: parseInt(req.query.start as string) || 0,
        count: parseInt(req.query.count as string) || 10,
        fiel: req.query.type as string,
        va: req.query.va as string
    }

    var list = await OrderBillController.GetAllLimit(limit)
    var srt = sercurity.CreateBase64Url(JSON.stringify(sercurity.CreateSign(14)))
    RenderHtmlFinal_AD(req, res,
        pa, { list, ship: OrderBill.shipmentstatus, pay: OrderBill.paystatus, srt: srt })
})
orderbill.get('/billDetail', async (req, res) => {
    var pa: string = join(ip.path, '/server/page/html/orderbill/orderDetail.ejs')
    var id = req.query.id as string
    if (id == undefined) {
        res.redirect(`${ip}admin/orderbill/`)
        return
    }

    var l = await Promise.all([
        OrderBillController.GetOrderBill(id),
        OrderDetailController.GetAllByIdOder(id), PayInvoiceControllder.GetAllPayInvoiceByBilId(id)])

    // public static  paystatus = ["chưa thành toán", "đã thành toán", "thành toán sau","hoàn lại"]
    // public static shipmentstatus = ['chưa giao', 'đang giao','hoàn thành giào]
    switch (l[0]?.ship) {
        case 0:

            break;

        default:
            break;
    }

    var srt = sercurity.CreateBase64Url(JSON.stringify(sercurity.CreateSign(14)))

    RenderHtmlFinal_AD(req, res,
        pa, { bill: l[0], list: l[1], srt: srt, payl: l[2], statusS: PayInvoice.statusS })
})
orderbill.post('/ship', verifi_post({ lenght: 14, va: 'srt' }), async (req, res) => {
    var ship = parseInt(req.body.ship)
    var id = req.body.id

    var check = await OrderBillController.UpdateShip(id, ship)

    res.redirect(`${ip.address}admin/orderbill/billDetail?id=${id}`)
})



export default orderbill