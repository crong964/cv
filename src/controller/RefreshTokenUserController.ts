import { ResultSetHeader, RowDataPacket } from "mysql2"
import { AddRefreshTokenUserDB, DeleteRefreshTokenUserDB, GetRefreshTokenUserDB } from "../database/RefreshTokenUserDB"
import { err } from "../lib/lib"
import RefreshTokenUser from "../model/RefreshTokenUser"

class RefreshTokenUserController {
    constructor() {

    }
    async AddRefreshTokenUser(idUser: string, refreshtoken: string) {
        var check
        try {
            check = await AddRefreshTokenUserDB(idUser, refreshtoken) as ResultSetHeader
        } catch (error) {
            err("AddRefreshTokenUser RefreshTokenUserController", error as string)
        }
        return check
    }
    async DeleteRefreshTokenUser(idUser: number, refreshtoken: string) {
        var check
        try {
            check = await DeleteRefreshTokenUserDB(idUser, refreshtoken) as ResultSetHeader
        } catch (error) {
            err("DeleteRefreshTokenUser RefreshTokenUserController", error as string)
        }
        return check

    }
    async GetRefreshTokenUser(userId: number, refreshtoken: string) {
        console.log();
        
        var v
        try {
            var ls = await GetRefreshTokenUserDB(userId, refreshtoken) as RowDataPacket[]
            for (let i = 0; i < ls.length; i++) {
                const element = ls[i];
                v = new RefreshTokenUser()
                v.setAll(element)
                break
            }
        } catch (error) {
            err("GetRefreshTokenUser RefreshTokenUserController", error as string)
        }
        return v
    }
}

export default new RefreshTokenUserController()