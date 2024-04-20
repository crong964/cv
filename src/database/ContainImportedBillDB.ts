import mysql from "mysql";
import con_mysql2 from "./configMySQL";
export function InsertContainImportedBillDB(
  idChildProduct: string,
  idImportedBill: string,
  amount: number,
  importPrice: number
) {
  return new Promise((res, rej) => {
    var sql = `INSERT INTO containimportedbill(idImportedBill, idChildProduct, importedAmount, importPrice) 
      VALUES (?,?,?,?)`;
    con_mysql2.query(
      sql,
      [idImportedBill, idChildProduct, amount, importPrice],
      (err, result, field) => {
        if (err) {
          rej(err);
        }
        con_mysql2.end();
        res(result);
      }
    );
  });

}
export function GetAllByIdImportedBillDB(idImportedBill: string) {
  return new Promise((res, rej) => {

    var sql = `
          SELECT c.idChildProduct,c.importPrice,c.importedAmount,p.image,p.nameChildProduct
          FROM containimportedbill c,childproduct p 
          WHERE p.idChildProduct = c.idChildProduct AND c.idImportedBill = ?`;
    con_mysql2.query(sql, idImportedBill, (err, result, field) => {
      if (err) {
        rej(err);
      }
      con_mysql2.end();
      res(result);
    });
  });

}
