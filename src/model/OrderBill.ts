import { formatDate } from "../lib/lib";
import BaseModel from "./BaseModel";

class OrderBill extends BaseModel {
    public static paystatus = ["chưa thành toán", "thành toán sau", "đã thành toán", "hoàn lại"]
    public static shipmentstatus = ['chưa giao', 'đang giao', 'hoàn thành', 'hủy giao',]
    id: number
    createday: string | undefined
    ship: number
    address: string | undefined
    totolmoney: number | undefined
    numberphone: string | undefined
    userid: number | undefined
    pay: number
    shipS: string | undefined
    payS: string | undefined
    lat: number
    lng: number
    constructor() {
        super()
        this.id = 0
        this.createday = undefined
        this.ship = 0
        this.pay = 0
        this.address = undefined
        this.totolmoney = undefined
        this.numberphone = undefined
        this.userid = undefined

        this.shipS = undefined
        this.payS = undefined
        this.lat = 0
        this.lng = 0
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