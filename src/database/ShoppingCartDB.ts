import { con_mysql2 } from "./configMySQL";


export function InsertProductInCartDB(idChildPro: string, idUser: number) {
    return new Promise((exc, rej) => {
        var sql = `INSERT INTO shoppingcart(idUser, idChildProduct) VALUES (?,?)`
        con_mysql2.query(sql, [idUser, idChildPro], (err, res) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}

export function GetProductInCartDB(idChildPro: string, idUser: number) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM shoppingcart,childproduct WHERE shoppingcart.idUser=? AND shoppingcart.idChildProduct=? AND childproduct.idChildProduct=shoppingcart.idChildProduct LIMIT 1`
        con_mysql2.query(sql, [idUser, idChildPro], (err, res) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function DelProductInCartDB(idChildPro: string, idUser: number) {
    return new Promise((exc, rej) => {
        var sql = `DELETE FROM shoppingcart WHERE idUser=? AND idChildProduct=? `
        con_mysql2.query(sql, [idUser, idChildPro], (err, res) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}

export function GetAllProductInCartDB(idUser: number) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM shoppingcart,childproduct WHERE shoppingcart.idUser=? AND childproduct.idChildProduct=shoppingcart.idChildProduct `
        con_mysql2.query(sql, [idUser], (err, res) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}