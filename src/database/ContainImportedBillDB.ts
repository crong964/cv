import mysql from "mysql";
import config from "./configMySQL";
export function InsertContainImportedBillDB(
  idChildProduct: string,
  idImportedBill: string,
  amount: number,
  importPrice: number
) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = `INSERT INTO containimportedbill(idImportedBill, idChildProduct, importedAmount, importPrice) 
      VALUES (?,?,?,?)`;
      con.query(
        sql,
        [idImportedBill, idChildProduct, amount, importPrice],
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
export function GetAllByIdImportedBillDB(idImportedBill: string) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);

    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = `
          SELECT c.idChildProduct,c.importPrice,c.importedAmount,p.image,p.nameChildProduct
          FROM containimportedbill c,childproduct p 
          WHERE p.idChildProduct = c.idChildProduct AND c.idImportedBill = ?`;
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
