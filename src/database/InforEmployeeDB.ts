import mysql from "mysql";

import config from "./configMySQL";

export function GetEmByAccountDB(account: string) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = "SELECT * FROM inforemployee WHERE account=?";
      con.query(sql, account, (err, result, field) => {
        if (err) {
          rej(err);
        }
        con.end();
 res(result);
      });
    });
  });
}
