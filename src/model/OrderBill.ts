import { formatDate } from "../lib/lib";
import BaseModel from "./BaseModel";

class OrderBill extends BaseModel {
    public static  paystatus = ["chưa thành toán", "đã thành toán", "thành toán sau"]
    public static shipmentstatus = ['chưa giao', 'đang giao']
    id: number | undefined
    createday: string | undefined
    ship: number
    address: string | undefined
    totolmoney: number | undefined
    numberphone: string | undefined
    userid: number | undefined
    pay: number
    shipS: string | undefined
    payS: string | undefined
    constructor() {
        super()
        this.id = undefined
        this.createday = undefined
        this.ship = 0
        this.pay = 0
        this.address = undefined
        this.totolmoney = undefined
        this.numberphone = undefined
        this.userid = undefined

        this.shipS = undefined
        this.payS = undefined
    }
    setAll(p: any): void {
        super.setAll(p)
        if (this.createday != undefined) {
            this.createday = formatDate(new Date(this.createday).getTime() + "")
        }
        this.shipS = OrderBill.shipmentstatus[this.ship]
        this.payS = OrderBill.paystatus[this.pay]
    }


}

export default OrderBill