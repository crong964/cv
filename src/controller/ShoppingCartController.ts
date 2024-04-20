import { ResultSetHeader } from "mysql2";
import { DelProductInCartDB, GetAllProductInCartDB, GetProductInCartDB, InsertProductInCartDB } from "../database/ShoppingCartDB";
import { err } from "../lib/lib";
import ShoppingCart from "../model/ShoppingCart";

class ShoppingCartController {
    constructor() {

    }
    async InsertProductInCart(idChildPro: string, idUser: number) {
        var check
        if (await this.Has(idChildPro, idUser) == false) {
            try {
                check = await InsertProductInCartDB(idChildPro, idUser) as ResultSetHeader
            } catch (error) {
                check=undefined
                err('InsertProductInCart ShoppingCartController', error )
            }
        }
        return check
    }
    async Has(idChildPro: string, idUser: number) {
        var check = false;
        try {
            var ls = await GetProductInCartDB(idChildPro, idUser) as []
            for (let i = 0; i < ls.length; i++) {

                check = true
            }
        } catch (error) {
            err('Has ShoppingCartController', error as string)
        }
        return check
    }
    async DelProductInCart(idChildPro: string, idUser: number) {
        var check = await DelProductInCartDB(idChildPro, idUser) as ResultSetHeader
        return check
    }
    async GetAllProductInCar(idUser: number) {
        var ls: ShoppingCart[] = []
        try {
            var l = await GetAllProductInCartDB(idUser) as []
            for (let i = 0; i < l.length; i++) {
                const element = l[i];
                var tem = new ShoppingCart()
                tem.setAll(element)
                ls.push(element)
            }
        } catch (error) {
            err('GetAllProductInCar ShoppingCartController', error as string)
        }
        return ls
    }
    async Get(idChildPro: string, idUser: number) {
        var temp
        try {
            var list = await GetProductInCartDB(idChildPro, idUser) as []
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                temp = new ShoppingCart()
                temp.setAll(element)
                break
            }
        } catch (error) {
            err('Get ShoppingCartController', error as any)
        }
        return temp
    }
}

export default new ShoppingCartController()