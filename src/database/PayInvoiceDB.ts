import con_mysql2  from "./configMySQL";



export function AddPayInvoiceDB(userid: number, payid: string, orderid: number, bankcode: string, totolmoney: number, orderinfo: string) {
    return new Promise((exc, rej) => {
        var sql = `INSERT INTO payinvoice(userid, payid, orderid, bankcode, totolmoney,orderinfo) VALUES (?,?,?,?,?,?)`
        con_mysql2.query(sql, [userid, payid, orderid, bankcode, totolmoney,orderinfo], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function GetAllPayInvoiceDB() {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM payinvoice`
        con_mysql2.query(sql, (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function GetPayInvoiceByIdDB(id: string) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM payinvoice WHERE payid=?`
        con_mysql2.query(sql, id, (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}

export function UpdatePayInvoiceDB(payid: string, BankTranNo: string, TransactionNo: string) {
    return new Promise((exc, rej) => {
        var sql = `UPDATE payinvoice SET banktranno=?,transactionno=?,status = 1 WHERE payid=?`
        con_mysql2.query(sql, [BankTranNo, TransactionNo, payid], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function GetAllPayInvoiceByBilIdDB(billId: string,status:string) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM payinvoice where orderid=? AND status like ?`
        con_mysql2.query(sql,[billId,`%${status}%`], (err, res, fields) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}