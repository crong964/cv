import con_mysql2  from "./configMySQL"

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
export function UpdateSmallcategoryDB(idSmallCategory: string, nameSmallCategory: string) {
    return new Promise((res, rej) => {
        var sql = `UPDATE smallcategory SET nameSmallCategory=? WHERE idSmallCategory=?`
        con_mysql2.query(sql, [nameSmallCategory,idSmallCategory], ((err, result, fields) => {
            if (err) {
                rej(err)
            }
            res(result)

        }))
    })
}