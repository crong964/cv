import { formatDate } from "../lib/lib";
import BaseModel from "./BaseModel";

class PayInvoice extends BaseModel {
    public static statusS = ["chưa xác nhận", "đã xác nhận", "hoàn lại"]
    userid: number
    payid: string
    orderid: number
    bankcode: string
    day: string
    status: number
    totolmoney: number
    returnpaymoney: number
    banktranno: string
    transactionno: string
    orderinfo: string
    constructor() {
        super()
        this.userid = 0
        this.payid = ""
        this.orderid = 0
        this.bankcode = ""
        this.day = ""
        this.status = 0
        this.totolmoney = 0
        this.returnpaymoney = 0
        this.banktranno = ""
        this.transactionno = ""
        this.orderinfo = ""
    }
    setAll(p: any): void {
        super.setAll(p)
        if (this.day != undefined) {
            this.day = formatDate(new Date(this.day).getTime() + "") as any
        }
    }
}


export default PayInvoice