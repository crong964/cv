import con_mysql2  from "./configMySQL";

export function AddDB(idChildProduct: string, idorder: number, price: number, quantity: number) {
    return new Promise((exc, rej) => {
        var sql = "INSERT INTO orderdetail(idChildProduct ,idorder, price ,quantity) VALUES (?,?,?,?)"
        con_mysql2.query(sql, [idChildProduct, idorder, price, quantity], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    }) 
}
export function UpdateDB(idChildProduct: string, idorder: number, quantity: number) {
    return new Promise((exc, rej) => {
        var sql = "UPDATE orderdetail SET quantity WHERE idChildProduct=? AND idorder=?"
        con_mysql2.query(sql, [quantity, idChildProduct, idorder], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function GetAllByIdOderDB(idOrder: string) {
    return new Promise((exc, rej) => {
        var sql = `SELECT o.idChildProduct,o.idorder,o.price,o.quantity,c.image,c.nameChildProduct FROM orderdetail o,childproduct c WHERE o.idChildProduct=c.idChildProduct AND o.idorder=?`
        con_mysql2.query(sql, [idOrder], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}