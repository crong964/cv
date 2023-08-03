import mysql from "mysql";
import config from "./configMySQL";

export function GetAccount(account: string,password:string) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
        if (err) {
            rej(err);
          }
      var sql = "SELECT * FROM accountemployee WHERE account=? AND password=?";
      con.query(sql, [account,password], (err, result, field) => {
        if (err) {
          rej(err);
        }
        con.end();
        res(result);
        
      });
    });
  });
}
