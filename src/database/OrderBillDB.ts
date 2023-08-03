import { GrapSql, Limit } from "../lib/lib";
import { con_mysql2 } from "./configMySQL";

export function AddDB(address: string, numberphone: string, userid: string) {
    return new Promise((exc, rej) => {
        var sql = "INSERT INTO orderbill(address, numberphone, userid) VALUES (?,?,?)"
        con_mysql2.query(sql, [address, numberphone, userid], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function GetAllByUseridDB(userid: string) {
    return new Promise((exc, rej) => {
        var sql = "SELECT * FROM orderbill WHERE userid=?"
        con_mysql2.query(sql, [userid], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function GetAllLimiByUserIdDB(userid: string, grapsql: GrapSql, limit: Limit) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM orderbill WHERE userid=? And ${grapsql.fiel}=? limit ?,?`
        con_mysql2.query(sql, [userid, grapsql.va, limit.start, limit.count], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function GetOrderBillDB(idOrder: string) {
    return new Promise((exc, rej) => {
        var sql = "SELECT * FROM orderbill WHERE id=? Limit 1"
        con_mysql2.query(sql, [idOrder], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function UpdateMoneyOrderBillDB(totalmoney: number, idOrder: string) {
    return new Promise((exc, rej) => {
        var sql = "UPDATE orderbill SET totolmoney=? WHERE id=?"
        con_mysql2.query(sql, [totalmoney, idOrder], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function GetAllLimitDB(limit: Limit) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM orderbill limit ?,?`
        con_mysql2.query(sql, [limit.start, limit.count], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}