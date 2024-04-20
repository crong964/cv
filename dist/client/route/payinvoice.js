"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dateformat_1 = __importDefault(require("dateformat"));
const crypto_1 = __importDefault(require("crypto"));
const qs_1 = __importDefault(require("qs"));
const admin_1 = __importDefault(require("../../admin"));
const client_1 = require("../../middleware/client");
const OrderBillController_1 = __importDefault(require("../../controller/OrderBillController"));
const PayInvoiceControllder_1 = __importDefault(require("../../controller/PayInvoiceControllder"));
const payinvoice = (0, express_1.Router)();
payinvoice.post('/create_payment_url', (0, client_1.verifi_post)({ lenght: 20, va: "pay" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var totolmoney = parseInt(req.body.totolmoney);
    var userid = req.cookies.userid;
    var billid = req.body.bilid;
    var orderbill = yield OrderBillController_1.default.GetOrderBill(billid);
    if (orderbill == undefined) {
        res.redirect(`${admin_1.default.address}shoppingcart?tb=khongcohoadon`);
        return;
    }
    if (orderbill.userid != userid) {
        res.redirect(`${admin_1.default.address}shoppingcart?tb=khongphainguoidung`);
        return;
    }
    if (orderbill.totolmoney != totolmoney) {
        res.redirect(`${admin_1.default.address}shoppingcart?tb=khongdungtien`);
        return;
    }
    var tmnCode = "7VPICSE9";
    var secretKey = "AVIMEZWBAWNRHFFEBPWTLJOWLFKOGOMP";
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = `${admin_1.default.address}vnpay/return`;
    var createDate = (0, dateformat_1.default)(Date.now(), 'yyyymmddHHmmss');
    var payId = 'LINH' + (0, dateformat_1.default)(Date.now(), 'yyyymmddHHmmss');
    var bankCode = req.body.bankCode;
    var orderInfo = `thanh toan ma don hang ${billid} voi tong tien la ${totolmoney}`;
    var vnp_Params = {};
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
    var check = yield PayInvoiceControllder_1.default.AddPayInvoice(userid, payId, billid, bankCode, totolmoney, orderInfo);
    if (check == undefined) {
    }
    vnp_Params = sortObject(vnp_Params);
    var signData = qs_1.default.stringify(vnp_Params, { encode: false });
    var hmac = crypto_1.default.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData).toString("utf-8")).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + qs_1.default.stringify(vnp_Params, { encode: false });
    console.log(vnp_Params);
    res.redirect(vnpUrl);
}));
payinvoice.get('/vnpay_ipn', function (req, res) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    vnp_Params = sortObject(vnp_Params);
    var secretKey = "AVIMEZWBAWNRHFFEBPWTLJOWLFKOGOMP";
    var hmac = crypto_1.default.createHmac("sha512", secretKey);
    var signData = qs_1.default.stringify(vnp_Params, { encode: false });
    var signed = hmac.update(Buffer.from(signData).toString("utf-8")).digest("hex");
    if (secureHash === signed) {
        var orderId = vnp_Params['vnp_TxnRef'];
        var rspCode = vnp_Params['vnp_ResponseCode'];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({ RspCode: '00', Message: 'success' });
    }
    else {
        res.status(200).json({ RspCode: '00', Message: 'Fail checksum' });
    }
});
payinvoice.get("/return", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var payId = req.query.vnp_TxnRef;
    var vnp_TransactionNo = req.query.vnp_TransactionNo;
    var vnp_BankTranNo = req.query.vnp_BankTranNo;
    var check = yield Promise.all([PayInvoiceControllder_1.default.UpdatePayInvoice(payId, vnp_BankTranNo, vnp_TransactionNo),
        OrderBillController_1.default.UpdatePay(payId, 2)]);
    console.log(check);
    res.json(req.query);
}));
exports.default = payinvoice;
function sortObject(obj) {
    let sorted = {};
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
