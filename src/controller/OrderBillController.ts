import { ResultSetHeader } from "mysql2";
import { AddDB, GetAllByUseridDB, GetAllLimiByUserIdDB, GetAllLimitDB, GetOrderBillDB, UpdateMoneyOrderBillDB } from "../database/OrderBillDB";
import { GrapSql, Limit, err, statusBill } from "../lib/lib";
import OrderBill from "../model/OrderBill";

class OrderBillController {
    constructor() {

    }
    async Add(address: string, numberphone: string, userid: string) {
        var check
        try {
            check = await AddDB(address, numberphone, userid) as ResultSetHeader
        } catch (error) {
            err("Add OrderBillController", error)
        }
        return check
    }
    async GetAllByUserid(userid: string) {
        var list: OrderBill[] = []
        try {
            var te = await GetAllByUseridDB(userid) as []
            for (let i = 0; i < te.length; i++) {
                const element = te[i];
                var temp = new OrderBill()
                temp.setAll(element)
                list.push(temp)
            }
        } catch (error) {
            err("GetAll OrderBillController", error)
        }
        return list
    }
    async GetOrderBill(idOrder: string) {
        var temp
        try {
            var s = await GetOrderBillDB(idOrder) as []
            temp = new OrderBill()
            for (let id = 0; id < s.length; id++) {
                const element = s[id];
                temp.setAll(element)
                break
            }
        } catch (error) {
            err("GetOrderBill OrderBillController", error)
        }
        return temp
    }
    async UpdateMoneyOrderBill(totalmoney: number, idOrder: string) {
        var check
        try {
            check = await UpdateMoneyOrderBillDB(totalmoney, idOrder) as ResultSetHeader
        } catch (error) {
            err("UpdateMoneyOrderBill OrderBillController", error)
        }
        return check
    }
    async GetAllLimiByUserId(userid: string, grapsql: GrapSql, limit?: Limit) {
        var s: Limit = limit || { start: 0, count: 20 }
        var list: OrderBill[] = []
        try {
            var t = await GetAllLimiByUserIdDB(userid, grapsql, s) as []
            for (let i = 0; i < t.length; i++) {
                const element = t[i];
                let tem = new OrderBill()
                tem.setAll(element)
                list.push(tem)
            }
        } catch (error) {
            err("GetAllLimiByUserId OrderBillController", error)
        }
        return list
    }
    async GetAllLimit(limit?: Limit) {
        var s: Limit = { start: 0, count: 10 }
        s.start = limit?.start || 0
        s.count = limit?.count || 10

        var list: OrderBill[] = []
        try {
            var t = await GetAllLimitDB(s) as []
            for (let i = 0; i < t.length; i++) {
                const element = t[i];
                var o = new OrderBill()
                o.setAll(element)
                list.push(o)
            }
        } catch (error) {
            err("GetAllLimit OrderBillController", error)
        }
        return list
    }
}

export default new OrderBillController()