import { Router } from "express";
import dateFormat from "dateformat"
import crypto from "crypto"
import querystring from "qs"
import ip from "../../admin";
import { verifi_post } from "../../middleware/client";
import OrderBillController from "../../controller/OrderBillController";
import PayInvoiceControllder from "../../controller/PayInvoiceControllder";

const payinvoice = Router()

interface pay {
    vnp_Version: string
    vnp_Command: string
    vnp_TmnCode: string
    vnp_Locale: string
    vnp_CurrCode: string
    vnp_TxnRef: string
    vnp_OrderInfo: string
    vnp_OrderType: string
    vnp_Amount: number
    vnp_ReturnUrl: string
    vnp_IpAddr: string
    vnp_CreateDate: string
    vnp_SecureHash: string
    vnp_BankCode: string
}


payinvoice.post('/create_payment_url', verifi_post({ lenght: 20, va: "pay" }), async (req, res) => {

    var totolmoney = parseInt(req.body.totolmoney);
    var userid = req.cookies.userid
    var billid = req.body.bilid
    var orderbill = await OrderBillController.GetOrderBill(billid)

    if (orderbill == undefined) {
        res.redirect(`${ip.address}shoppingcart?tb=khongcohoadon`)
        return
    }
    if (orderbill.userid != userid) {
        res.redirect(`${ip.address}shoppingcart?tb=khongphainguoidung`)
        return
    }

    if (orderbill.totolmoney != totolmoney) {
        res.redirect(`${ip.address}shoppingcart?tb=khongdungtien`)
        return
    }

    var tmnCode = "7VPICSE9";
    var secretKey = "AVIMEZWBAWNRHFFEBPWTLJOWLFKOGOMP";

    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
    var returnUrl = `${ip.address}vnpay/return`;

    var createDate = dateFormat(Date.now(), 'yyyymmddHHmmss');
    var payId = 'LINH' + dateFormat(Date.now(), 'yyyymmddHHmmss');

    var bankCode = req.body.bankCode;
    var orderInfo = `thanh toan ma don hang ${billid} voi tong tien la ${totolmoney}`;
    var vnp_Params: any | pay = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = payId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = "other";
    vnp_Params['vnp_Amount'] = totolmoney * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = "127.0.0.1";
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_BankCode'] = bankCode;

    var check = await PayInvoiceControllder.AddPayInvoice(userid, payId, billid, bankCode, totolmoney, orderInfo)

    if (check == undefined) {

    }
    vnp_Params = sortObject(vnp_Params);


    var signData = querystring.stringify(vnp_Params, { encode: false });

    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData).toString("utf-8")).digest("hex");

    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    console.log(vnp_Params);

    res.redirect(vnpUrl)
});

payinvoice.get('/vnpay_ipn', function (req, res) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var secretKey = "AVIMEZWBAWNRHFFEBPWTLJOWLFKOGOMP";
    var hmac = crypto.createHmac("sha512", secretKey);
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var signed = hmac.update(Buffer.from(signData).toString("utf-8")).digest("hex")



    if (secureHash === signed) {
        var orderId = vnp_Params['vnp_TxnRef'];
        var rspCode = vnp_Params['vnp_ResponseCode'];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({ RspCode: '00', Message: 'success' })
    }
    else {
        res.status(200).json({ RspCode: '00', Message: 'Fail checksum' })
    }
});
payinvoice.get("/return", async (req, res) => {
    var payId = req.query.vnp_TxnRef as string
    var vnp_TransactionNo = req.query.vnp_TransactionNo as string
    var vnp_BankTranNo = req.query.vnp_BankTranNo as string
    var check = await Promise.all([PayInvoiceControllder.UpdatePayInvoice(payId, vnp_BankTranNo, vnp_TransactionNo),
        OrderBillController.UpdatePay(payId, 2)])

    console.log(check);
    res.json(req.query)
})




export default payinvoice


function sortObject(obj: any) {
    let sorted: any = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

// http://localhost:1000/return?
// vnp_Amount=2000000000&
// vnp_BankCode=NCB&
// vnp_BankTranNo=VNP14102650& --Mã giao dịch tại Ngân hàng
// vnp_CardType=ATM&
// vnp_OrderInfo=1__20000000&
// vnp_PayDate=20230828102509&
// vnp_ResponseCode=00&
// vnp_TmnCode=7VPICSE9&
// vnp_TransactionNo=14102650& --Mã giao dịch ghi nhận tại hệ thống VNPAY
// vnp_TransactionStatus=00&
// vnp_TxnRef=LINH20230828100840&
// vnp_SecureHash=7a73330547617da8c78e1190fcf11cb641f8fb08e9a3cfb34d857bdd9a79f9c537b29c7f529d1bc1c1cb6c1b9aafc3be9bd1a9bc2d0a595e923faf2e8af064a5