import { ResultSetHeader } from "mysql2";
import { AddPayInvoiceDB, GetAllPayInvoiceByBilIdDB, GetAllPayInvoiceDB, GetPayInvoiceByIdDB, UpdatePayInvoiceDB } from "../database/PayInvoiceDB";
import { err } from "../lib/lib";
import PayInvoice from "../model/PayInvoice";


class PayInvoiceControllder {
    constructor() {

    }
    async AddPayInvoice(userid: number, payid: string, orderid: number, bankcode: string, totolmoney: number, orderinfo: string) {
        var check
        try {
            check = await AddPayInvoiceDB(userid, payid, orderid, bankcode, totolmoney, orderinfo) as ResultSetHeader
        } catch (error) {
            err('AddPayInvoice PayInvoiceControllder', error)
        }
        return check
    }
    async GetAllPayInvoice() {
        var l: PayInvoice[] = []
        try {
            var list = await GetAllPayInvoiceDB() as []
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                var temp = new PayInvoice()
                temp.setAll(element)
                l.push(temp)
            }
        } catch (error) {
            err('GetAllPayInvoice PayInvoiceControllder', error)
        }
        return l
    }
    async GetPayInvoiceById(id: string) {
        var l: PayInvoice | undefined
        try {
            var list = await GetPayInvoiceByIdDB(id) as []
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                l = new PayInvoice()
                l.setAll(element)
                break
            }
        } catch (error) {
            err('GetPayInvoiceById PayInvoiceControllder', error)
        }
        return l
    }
    async UpdatePayInvoice(payid: string, BankTranNo: string, TransactionNo: string) {
        var check
        try {
            check = await UpdatePayInvoiceDB(payid, BankTranNo, TransactionNo)
        } catch (error) {
            err('UpdatePayInvoice PayInvoiceControllder', error)

        }
        return check
    }
    async GetAllPayInvoiceByBilId(billId: string, sta?: string) {
        var l = []
        var s = sta || ""
        try {
            var ls = await GetAllPayInvoiceByBilIdDB(billId,s) as []
            for (let i = 0; i < ls.length; i++) {
                const element = ls[i];
                var temp = new PayInvoice()
                temp.setAll(element)
                l.push(temp)
            }
        } catch (error) {
            err('GetAllPayInvoiceByBilId PayInvoiceControllder', error)
        }
        return l
    }
}

export default new PayInvoiceControllder()