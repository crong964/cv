import con_mysql2  from "./configMySQL"

export function GetAllBigcategoryDB() {
    return new Promise((res, rej) => {
        var sql = "SELECT * FROM bigcategory"
        con_mysql2.query(sql, ((err, reuslt, fields) => {
            if (err) {
                rej(err)
            }
            res(reuslt)
        }))
    })
}

export function AddBigCategoryDB(name: string) {
    return new Promise((res, rej) => {
        var sql = "INSERT INTO bigcategory(name) VALUES (?)"
        con_mysql2.query(sql, [name], ((err, reuslt, fields) => {
            if (err) {
                rej(err)
            }
            res(reuslt)
        }))
    })
}
export function GetBigCategoryByNameDB(name: string) {
    return new Promise((res, rej) => {
        var sql = "SELECT * FROM bigcategory WHERE name = ? limit 1"
        con_mysql2.query(sql, [name], ((err, reuslt, fields) => {
            if (err) {
                rej(err)
            }
            res(reuslt)
        }))
    })
}
export function UpdateBigCategoryDB(id: string, name: string) {
    return new Promise((res, rej) => {
        var sql = "UPDATE bigcategory SET name=? WHERE idBigCategory=?"
        con_mysql2.query(sql, [name, id], ((err, reuslt, fields) => {
            if (err) {
                rej(err)
            }
            res(reuslt)
        }))
    })
}

export function DeleteBigCategoryByidDB(id: string) {
    return new Promise((res, rej) => {
        var sql = "DELETE FROM bigcategory WHERE idBigCategory=?"
        con_mysql2.query(sql, [id], (err, resu, fields) => {
            if (err) {
                rej(err)
            }
            res(resu)
        })
    })
}