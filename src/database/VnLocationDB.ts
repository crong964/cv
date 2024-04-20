import { vn_location_mysql2 } from "./configMySQL";


export function GetAllProvincesListDB() {
    return new Promise((exc, rej) => {
        var sql = "SELECT * FROM devvn_tinhthanhpho"
        vn_location_mysql2.query(sql, (err, v, fiels) => {
            if (err) {
                rej(err)
            }
            exc(v)
        })
    })
}
export function GetAllDistrictsListDB(provincesCode: string) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM devvn_quanhuyen WHERE matp=?`
        vn_location_mysql2.query(sql, [provincesCode], (err, v, fiels) => {
            if (err) {
                rej(err)
            }
            exc(v)
        })
    })
}
export function GetAllWardListDB(districts: string) {
    return new Promise((exc, rej) => {
        var sql = `SELECT * FROM devvn_xaphuongthitran WHERE maqh=?;`
        vn_location_mysql2.query(sql, [districts], (err, v, fiels) => {
            if (err) {
                rej(err)
            }
            exc(v)
        })
    })
}