import mysql from "mysql";

import con_mysql2 from "./configMySQL";

export function GetAccount(account: string, password: string) {
  return new Promise((exc, rej) => {
    var sql = "SELECT * FROM accountemployee WHERE account=? AND password=?";
    con_mysql2.query(sql, [account, password], (err, res, fiedls) => {
      if (err) {
        rej(err)
      }
      exc(res)
    })
  })
}
