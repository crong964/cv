import mysql from "mysql";
import config from "./configMySQL";
export function InsertContainImportBillDB(
  idChildProduct: string,
  idImportBill: string,
  amount: number,
  importPrice: number
) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = `INSERT INTO containimportbill(idImportBill, idChildProduct, amount,importPrice) VALUES (?,?,?,?)`;
      con.query(
        sql,
        [idImportBill, idChildProduct, amount, importPrice],
        (err, result, field) => {
          if (err) {
            rej(err);
          }
          con.end();
          res(result);
        }
      );
    });
  });
}
export function GetAllByIdImportBillDB(idImportBill: string) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = `SELECT c.idChildProduct,c.amount,c.importPrice,c.importedAmount,p.image,p.nameChildProduct
      FROM containimportbill c,childproduct p 
      WHERE p.idChildProduct = c.idChildProduct AND c.idImportBill= ? `;
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
export function UpdateImportedQuantityContainImportBillDB(
  idImportBill: string,
  idChildProduct: string,
  quantity: number
) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = `UPDATE containimportbill 
      SET importedAmount = importedAmount + ?
      WHERE idImportBill = ? AND idChildProduct = ? `;
      con.query(
        sql,
        [quantity, idImportBill, idChildProduct],
        (err, result, field) => {
          if (err) {
            rej(err);
          }
          con.end();
          res(result);
        }
      );
    });
  });
}
export function GetContainImportChildProductDB(
  idImportBill: string,
  idChildProduct: string
) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = `SELECT * FROM containimportbill  WHERE idImportBill= ? AND idChildProduct= ? `;
      con.query(sql, [idImportBill, idChildProduct], (err, result, field) => {
        if (err) {
          rej(err);
        }
        con.end();
        res(result);
      });
    });
  });
}
