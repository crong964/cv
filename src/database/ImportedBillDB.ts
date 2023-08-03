import mysql from "mysql";
import config, { con_mysql2 } from "./configMySQL";

export function GetImportedBillDB(idImportedBill: string) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = "SELECT * FROM importedbill WHERE idImportedBill = ? ";
      con.query(sql, idImportedBill, (err, result, field) => {
        if (err) {
          rej(err);
        }
        con.end();
        res(result);
      });
    });
  });
}
export function GetAllImportedBillByIdDB(idImportBill: string) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = "SELECT * FROM importedbill where idImportBill = ?";
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
export function InsertImportedBillDB(
  idImportBill: string,
  idImportedBill: string,
  idForUser: number
) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = `INSERT INTO importedbill(idImportedBill, idForUser, idImportBill)  VALUES (?,?,?)`;
      con.query(sql, [idImportedBill, idForUser, idImportBill], (err, result, field) => {
        if (err) {
          rej(err);
        }
        con.end();
        res(result);
      });
    });
  });
}
export function UpdateStatusImportedBillDB(idImportedBill: string, paymentDate: string, status: string) {
  return new Promise((exc, rej) => {
    var sql = "UPDATE importedbill SET status = ?,paymentDate = ? WHERE idImportedBill= ? ";
    con_mysql2.query(sql, [status, paymentDate, idImportedBill], (err, res, fields) => {
      if (err) {
        rej(err)
      }
      exc(res)
    })
  })
}
