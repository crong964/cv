import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { AddInforuserDB, GetAllInforuserDB, GetInforuserDB, UpdateInforuserDB } from "../database/InforUserDB";
import { Limit, err } from "../lib/lib";
import { InforUser } from "../model/InforUser";

class InforUserController {
    static List: Map<string, InforUser> = new Map<string, InforUser>()
    constructor() {

    }
    async AddInforuser(address: string, numberPhone: string) {
        var ch = undefined
        try {
            ch = await AddInforuserDB(address, numberPhone) as ResultSetHeader
        } catch (error) {
            err("AddInforuser InforUserController", error)
        }
        return ch
    }
    async Has(id: string) {
        if (InforUserController.List.has(id)) {
            return true
        }
        var ch = false
        try {
            var l = await GetInforuserDB(id) as RowDataPacket[]
            for (let i = 0; i < l.length; i++) {
                const element = l[i];
                var s = new InforUser()
                s.setAll(element)
                if (s.id) {
                    InforUserController.List.set(s.id + "", s)
                    ch = true
                }
                break
            }
        } catch (error) {
            err("Has InforUserController", error)
            ch = false
        }
        return ch
    }
    async GetInforuser(id: string) {
        var c
        if (await this.Has(id)) {
            c = InforUserController.List.get(id)
        }
        return c
    }
    async GetAllInforuser(limit?: Limit) {
        var s: Limit = { start: 0, count: 20 }
        s.start = (limit?.start || 0) * 20
        s.count = limit?.count || 20

        var ls = []
        try {
            var l = await GetAllInforuserDB(s) as []
            for (let i = 0; i < l.length; i++) {
                const element = l[i];
                var temp = new InforUser()
                temp.setAll(element)
                ls.push(temp)
            }
        } catch (error) {
            err("GetAllInforuser InforUserController", error)
        }
        return ls
    }
    async UpdateInforuser(address: string, numberPhone: string, name: string, id: string) {
        var c
        try {
            c = await UpdateInforuserDB(address, numberPhone, name, id) as ResultSetHeader
            InforUserController.List.delete(id)
        } catch (error) {
            err("UpdateInforuser InforUserController", error)
        }
        return c
    }
}

export default new InforUserController()