import con_mysql2 from "./configMySQL";
import mysql from "mysql"

export function GetImportBillByIdDB(idImportBill: string) {
  return new Promise((res, rej) => {

    var sql = "SELECT * FROM importbill WHERE idImportBill=?";
    con_mysql2.query(sql, idImportBill, (err, result, field) => {
      if (err) {
        rej(err);
      }
      res(result);
    });
  });
}
export function GetAllImportBillDB(pa: any) {
  return new Promise((res, rej) => {

    var sql = "SELECT * FROM importbill WHERE status > -1 AND status like ?";
    con_mysql2.query(sql, [`%${pa.status}%`], (err, result, field) => {
      if (err) {
        rej(err);
      }

      res(result);
    });
  });

}

export function InsertImportBillDB(idImportBill: string, idForUser: number, createdDay: string, finishDay: string, supplier: string) {
  return new Promise((res, rej) => {

    var sql = "INSERT INTO importbill(idImportBill, createdDay, idForUser, finishDay, supplier) VALUES (?,?,?,?,?)";
    con_mysql2.query(sql, [idImportBill, createdDay, idForUser, finishDay, supplier], (err, result, field) => {
      if (err) {
        rej(err);
      }

      res(result);
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
export function UpdateStatusDB(idImportBill: string, status: number) {
  return new Promise((res, rej) => {
    var sql = `UPDATE importbill SET status= ? WHERE idImportBill = ?`

    con_mysql2.query(sql, [status, idImportBill], ((err, result, fiels) => {
      if (err) {
        rej(err)
      }
      res(result)
    }))
  })
}