import con_mysql2  from "./configMySQL";

export function AddRefreshTokenUserDB(idUser: string, refreshtoken: string) {
    return new Promise((exc, rej) => {
        var sql = `INSERT INTO refreshtokenuser(idUser, refreshtoken) VALUES (?,?)`
        con_mysql2.query(sql, [idUser, refreshtoken], (err, result, fields) => {
            if (err) {
                rej(err)
            }
            exc(result)
        })
    })
}
export function GetRefreshTokenUserDB(userId: number, refreshtoken: string) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM refreshtokenuser WHERE idUser=? AND refreshtoken=? LIMIT 1`
        con_mysql2.query(sql, [userId, refreshtoken], (err, result, fields) => {
            if (err) {
                rej(err)
            }
            exc(result)
        })
    })
}
export function DeleteRefreshTokenUserDB(idUser: number, refreshtoken: string) {
    return new Promise((exc, rej) => {
        var sql = `DELETE FROM refreshtokenuser WHERE idUser=? AND refreshtoken=?`
        con_mysql2.query(sql, [idUser, refreshtoken], (err, result, fields) => {
            if (err) {
                rej(err)
            }
            exc(result)
        })
    })
}