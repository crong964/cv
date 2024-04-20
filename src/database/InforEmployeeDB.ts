import mysql from "mysql";

import con_mysql2 from "./configMySQL";

export function GetEmByAccountDB(account: string) {
  return new Promise((res, rej) => {

    var sql = "SELECT * FROM inforemployee WHERE account=?";
    con_mysql2.query(sql, account, (err, result, field) => {
      if (err) {
        rej(err);
      }

      res(result);
    });
  });

}
