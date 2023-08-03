import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { AddInforuserDB, GetInforuserDB } from "../database/InforuserDB";
import { err } from "../lib/lib";
import { Inforuser } from "../model/Inforuser";

class InforuserController {
    static List: Map<string, Inforuser> = new Map<string, Inforuser>()
    constructor() {

    }
    async AddInforuser(address: string, numberPhone: string) {
        var ch = undefined
        try {
            ch = await AddInforuserDB(address, numberPhone) as ResultSetHeader
        } catch (error) {
            err("AddInforuser InforuserController", error as string)
        }
        return ch
    }
    async Has(id: string) {
        if (InforuserController.List.has(id)) {
            return true
        }
        var ch = false
        try {
            var l = await GetInforuserDB(id) as RowDataPacket[]
            for (let i = 0; i < l.length; i++) {
                const element = l[i];
                var s = new Inforuser()
                s.setAll(element)
                if (s.id) {
                    InforuserController.List.set(s.id + "", s)
                    ch = true
                }
                break
            }
        } catch (error) {
            err("Has InforuserController", error as string)
            ch = false
        }
        return ch
    }
    async GetInforuser(id: string) {
        var c
        if (await this.Has(id)) {
            c = InforuserController.List.get(id)
        }
        return c
    }
}

export default new InforuserController()