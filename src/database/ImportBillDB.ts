import config, { con_mysql2 } from "./configMySQL";
import mysql from "mysql"

export function GetImportBillByIdDB(idImportBill: string) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = "SELECT * FROM importbill WHERE idImportBill=?";
      con.query(sql, idImportBill, (err, result, field) => {
        if (err) {
          rej(err);
        }
        con.end();
        res(result);
      });
    });
  });
}
export function GetAllImportBillDB() {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = "SELECT * FROM importbill WHERE status > -1";
      con.query(sql, (err, result, field) => {
        if (err) {
          rej(err);
        }
        con.end();
        res(result);
      });
    });
  });
}

export function InsertImportBillDB(idImportBill: string, idForUser: number,createdDay:string,finishDay:string,supplier:string) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = "INSERT INTO importbill(idImportBill, createdDay, idForUser, finishDay, supplier) VALUES (?,?,?,?,?)";
      con.query(sql, [idImportBill, createdDay, idForUser, finishDay, supplier], (err, result, field) => {
        if (err) {
          rej(err);
        }
        con.end();
        res(result);
      });
    });
  });
}
export function RemoveBill(idImportBill: string) {
  return new Promise((res, rej) => {
    var sql = `UPDATE importbill SET status= -1 WHERE idImportBill = ?`

    con_mysql2.query(sql, [idImportBill], ((err, result, fiels) => {
      if (err) {
        rej(err)
      }
      res(result)
    }))
  })
}