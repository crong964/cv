import { ResultSetHeader } from "mysql2";
import { AddDB, GetAllByIdOderDB, UpdateDB } from "../database/OrderDetailDB";
import { err } from "../lib/lib";
import OrderDetail from "../model/OrderDetail";

class OrderDetailController {
    constructor() {

    }
    async Add(idChildProduct: string, idorder: number, price: number, quantity: number) {
        var check
        try {
            check = await AddDB(idChildProduct, idorder, price, quantity) as ResultSetHeader
        } catch (error) {
            err("Add OrderDetailController", error as string)
            check=undefined
        }
        return check

    }
    async Update(idChildProduct: string, idorder: number, quantity: number) {
        var check
        try {
            check = await UpdateDB(idChildProduct, idorder, quantity) as ResultSetHeader
        } catch (error) {
            err("Update OrderDetailController", error as string)
        }
        return check
    }
    async GetAllByIdOder(idOrder: string) {
        var ls: OrderDetail[] = []
        try {
            var s = await GetAllByIdOderDB(idOrder) as []
            for (let i = 0; i < s.length; i++) {
                const element = s[i];
                var te = new OrderDetail()
                te.setAll(element)
                ls.push(te)
            }
        } catch (error) {
            err("GetAllByIdOder OrderDetailController", error as string)
        }
        return ls
    }
}

export default new OrderDetailController()