import { Router } from "express";
import { AuthorOrUnauthor, UserAuthorization, verifi_post } from "../../middleware/client";
import { join } from "path";
import ip from "../../admin";
import ShoppingCartController from "../../controller/ShoppingCartController";
import sercurity from "../../lib/sercurity";
import InforuserController from "../../controller/InforUserController";
import OrderBillController from "../../controller/OrderBillController";
import ChildProductController from "../../controller/ChildProductController";
import ProductController from "../../controller/ProductController";
import OrderDetailController from "../../controller/OrderDetailController";
import { err } from "../../lib/lib";
interface addbill {
    id: string[],
    quantity: [],
    lat: string
    lng: string
}
const shoppingcart = Router()

shoppingcart.use(UserAuthorization())

shoppingcart.get('/', AuthorOrUnauthor(), async (req, res) => {
    var pa = join(ip.path, 'client/page/html/shoppingcart/shoppingcart.ejs')
    var id = req.cookies.userid
    var ls = await Promise.all([ShoppingCartController.GetAllProductInCar(id),
    InforuserController.GetInforuser(id)])



    var va = sercurity.CreateBase64Url(JSON.stringify(sercurity.CreateSign(5)))
    res.render(pa, { ip: ip.address, list: ls[0], infor: ls[1], name: req.body.nameUserInSerVer, cart: va, l: ls[0].length })
})

shoppingcart.post('/add', verifi_post({ lenght: 5, va: "cart" }), async (req, res) => {
    var idChildPro = req.body.id
    var userid = req.cookies.userid

    var check = await ShoppingCartController.Has(idChildPro, userid)
    if (check) {
        res.json({
            mess: "đã có trong giỏ"
        })
        return
    }
    var v = await ShoppingCartController.InsertProductInCart(idChildPro, userid)
    if (v?.affectedRows && v?.affectedRows > 0) {
        res.json({
            mess: "thêm thành công"
        })
        return
    }
    res.json({
        mess: "thêm thất bại"
    })
})
shoppingcart.post('/del', verifi_post({ lenght: 5, va: "cart" }), async (req, res) => {
    var id = req.body.id
    var userid = req.cookies['userid']
    var check = await ShoppingCartController.DelProductInCart(id, userid)
    if (check.affectedRows <= 0) {
        res.json({
            err: true,
            mess: "xóa thành công"
        })
        return
    }
    res.json({
        err: false,
        mess: "xóa thành công"
    })
})
shoppingcart.post('/order', verifi_post({ lenght: 5, va: "cart" }), async (req, res) => {
    console.log(req.body);
    var userid = req.cookies.userid
    var infor = await InforuserController.GetInforuser(userid)
    var post: addbill = req.body
    if (post.id.length <= 0) {
        res.redirect(`${ip.address}shoppingcart?tb=thieutt`)
        return
    }
    if (infor?.address == undefined || infor?.numberPhone == undefined || infor?.id == undefined) {
        res.redirect(`${ip.address}shoppingcart?tb=thieuttnguoidung`)
        return
    }

    var check = await OrderBillController.Add(infor.address, infor.numberPhone, infor.id + "")
    var idOrder = check?.insertId
    if (idOrder == undefined) {
        res.redirect(`${ip.address}shoppingcart?tb=khôngthêmđượcidhóađơn`)
        return

    }
    var totalmoney = 0
    var list = post.id.map(async (v, i) => {
        var a = await ChildProductController.Get(v)
        var q = parseInt(post.quantity[i])
        var checklist = false

        if (a && a.amount > 0 && a.idChildProduct && a.price && idOrder && a.idProduct) {
            totalmoney += a.price * q
            var b = await ChildProductController.DecreaseAmountChildProduct(v, q)
            var c
            if (a?.idProduct) {
                c = await ProductController.DecreaseAmountProduct(a.idProduct, q)
            }
            var d = await OrderDetailController.Add(a.idChildProduct, idOrder, a.price, q)
            if (d?.affectedRows && d?.affectedRows > 0) {
                checklist = true
                await ShoppingCartController.DelProductInCart(v, infor?.id as any)
            } else {
                checklist = false
                await Promise.all([ChildProductController.IncreaseAmountChildProduct(v, q + ""),
                ProductController.IncreaseAmountProduct(a.idProduct, q)])
            }
        }
        return checklist
    })

    var checklist = await Promise.all(list)
    await OrderBillController.UpdateMoneyOrderBill(totalmoney, idOrder + "")
    res.redirect(`${ip.address}shoppingcart`)
})
shoppingcart.post("/buynow", verifi_post({ lenght: 5, va: "cart" }), async (req, res) => {
    var idChildPro = req.body.childproductId
    var userid = req.cookies.userid

    var check = await ShoppingCartController.Has(idChildPro, userid)
    if (check) {
        res.redirect(`${ip.address}shoppingcart?tb=cotrongdo`)
        return
    }
    var v = await ShoppingCartController.InsertProductInCart(idChildPro, userid)
    if (v?.affectedRows && v?.affectedRows > 0) {
        res.redirect(`${ip.address}shoppingcart?tb=themthanhcong`)
        return
    }
    res.redirect(`${ip.address}shoppingcart?tb=themthatbai`)

})
export default shoppingcart