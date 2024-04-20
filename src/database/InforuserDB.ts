import { Limit } from "../lib/lib"
import con_mysql2  from "./configMySQL"

export function AddInforuserDB(address: string, numberPhone: string) {
    return new Promise((exc, rej) => {
        var sql = `INSERT INTO inforuser( address, numberPhone) VALUES (?,?)`
        con_mysql2.query(sql, [address, numberPhone], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function GetInforuserDB(id: string) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM inforuser WHERE id=? LIMIT 1`
        con_mysql2.query(sql, [id], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })

}
export function GetAllInforuserDB(limit: Limit) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM inforuser LIMIT ?,?`
        con_mysql2.query(sql, [limit.start, limit.count], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })

}

export function UpdateInforuserDB(address: string, numberPhone: string, name: string, id: string) {
    return new Promise((exc, rej) => {
        var sql = `UPDATE inforuser SET address=?,numberPhone=?,name=? WHERE id=?`
        con_mysql2.query(sql, [address, numberPhone, name, id], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}