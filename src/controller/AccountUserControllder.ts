import { RowDataPacket } from "mysql2";
import { AddAccountUserDB, GetAccountUserByAccAndPassDB, GetAccountUserByAccDB, GetAccountUserByIdDB, GetAllAccountUserDB } from "../database/AccountUserDB";
import AccountUser from "../model/AccountUser";
import { err } from "../lib/lib";

class AccountUserControllder {
    static list: Map<string, AccountUser> = new Map<string, AccountUser>()
    constructor() {

    }
    async GetAccountUserByAccAndPass(account: string, password: string) {
        var v
        try {
            var ls = await GetAccountUserByAccAndPassDB(account, password) as RowDataPacket[]
            v = new AccountUser()
            for (let i = 0; i < ls.length; i++) {
                const element = ls[i];
                v.setAll(element)
                break
            }
        } catch (error) {
            err("GetAccountUserByAccAndPass AccountUserControllder", error)
        }
        return v
    }
    async GetAccountUserByAcc(account: string) {
        var v
        if (await this.Has(account)) {
            v = AccountUserControllder.list.get(account)
        }
        return v
    }
    async Has(account: string) {
        var v = false
        if (AccountUserControllder.list.has(account)) {
            v = true
        } else {
            try {
                var l = await GetAccountUserByAccDB(account) as RowDataPacket[]
                for (let i = 0; i < l.length; i++) {
                    const element = l[i];
                    var temp = new AccountUser()
                    temp.setAll(element)
                    if (temp?.account) {
                        AccountUserControllder.list.set(temp?.account, temp)
                        v = true
                    }
                    break
                }
            } catch (error) {
                err("Has AccountUserControllder", error)
            }
        }
        return v
    }
    async AddAccountUser(account: string, password: string, id: string) {
        var c
        try {
            c = await AddAccountUserDB(account, password, id)
        } catch (error) {
            c = undefined
            err("AddAccountUser AccountUserControllder", error)
        }
        return c
    }
    async GetAllAccountUser() {
        var list = []
        try {
            var ls = await GetAllAccountUserDB() as []
            for (let i = 0; i < ls.length; i++) {
                const element = ls[i];
                var account = new AccountUser()

            }
        } catch (error) {
            err("GetAllAccountUser AccountUserControllder", error)
        }
    }
    async GetAccountUserById(userid: string) {
        var v
        try {
            var l = await GetAccountUserByIdDB(userid) as RowDataPacket[]
            for (let i = 0; i < l.length; i++) {
                const element = l[i];
                v = new AccountUser()
                v.setAll(element)
                break
            }

        } catch (error) {
            err("GetAccountUserById AccountUserControllder", error)
        }
        return v
    }
}


export default new AccountUserControllder()




