import { con_mysql2 } from "./configMySQL"

export function GetAllSmallcategoryDB() {
    return new Promise((res, rej) => {
        var sql = "SELECT * FROM smallcategory"
        con_mysql2.query(sql, ((err, result, fields) => {
            if (err) {
                rej(err)
            }
            res(result)
            
        }))
    })
}