import con_mysql2  from "./configMySQL";

export function GetAccountUserByAccAndPassDB(account: string, password: string) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM accountuser WHERE account=? AND password=? LIMIT 1`
        con_mysql2.query(sql, [account, password], (err, res, fiedls) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function GetAccountUserByAccDB(account: string) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM accountuser WHERE account=? LIMIT 1`
        con_mysql2.query(sql, [account], (err, res, fiedls) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function AddAccountUserDB(account: string, password: string, id: string) {
    return new Promise((exc, rej) => {
        var sql = `INSERT INTO accountuser(account, password, idUser) VALUES (?,?,?)`
        con_mysql2.query(sql, [account, password, id], (err, res, fiedls) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}
export function GetAllAccountUserDB() {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM accountuser `
        con_mysql2.query(sql, (err, res, fiedls) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}

export function GetAccountUserByIdDB(userid: string) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM accountuser WHERE idUser=?`
        con_mysql2.query(sql, [userid], (err, res, fiedls) => {
            if (err) {
                rej(err)
            }
            exc(res)
        })
    })
}