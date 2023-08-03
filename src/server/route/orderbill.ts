import express from "express";
import OrderBillController from "../../controller/OrderBillController";
import { RenderHtmlFinal_AD } from "../../lib/admin";
import { join } from "path";
import ip from "../../admin";
import OrderBill from "../../model/OrderBill";
import OrderDetailController from "../../controller/OrderDetailController";
const orderbill = express()


orderbill.get('/', async (req, res) => {
    var pa: string = join(ip.path, '/server/page/html/orderbill/orderbill.ejs')
    var list = await OrderBillController.GetAllLimit()

    RenderHtmlFinal_AD(req, res,
        pa, { list, ship: OrderBill.shipmentstatus, pay: OrderBill.paystatus })
})
orderbill.get('/:id', async (req, res) => {
    var pa: string = join(ip.path, '/server/page/html/orderbill/orderDetail.ejs')
    var id = req.params.id

    var l = await Promise.all([OrderBillController.GetOrderBill(id), OrderDetailController.GetAllByIdOder(id)])

    


    RenderHtmlFinal_AD(req, res,
        pa, { bill: l[0], de: l[1] })
})



export default orderbill