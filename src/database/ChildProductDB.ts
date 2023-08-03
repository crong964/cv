import mysql from "mysql";
import config, { con_mysql2 } from "./configMySQL";

export function GetAllChildProductByIdProductDB(idProduct: number) {
  return new Promise((res, rej) => {
    var sql = `SELECT * FROM childproduct WHERE idProduct = ?`;
    con_mysql2.query(sql, [idProduct], (err, va, fiels) => {
      if (err) {
        rej(err);
      }
      res(va);
    });
  });
}
export function GetChildProductDB(idChildProduct: string) {
  return new Promise((res, rej) => {
    var sql = `SELECT * FROM childproduct WHERE idChildProduct=?`;
    con_mysql2.query(sql, idChildProduct, (err, result, fiels) => {
      if (err) {
        rej(err);
      }
      res(result);
    });
  });

}
export function UpdateAmountChildProductDB(
  idChildProduct: string,
  quantity: number
) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);
    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = `UPDATE childproduct
      SET amount= amount + ?
      WHERE idChildProduct= ? `;
      con.query(sql, [quantity, idChildProduct], (err, result, fiels) => {
        if (err) {
          rej(err);
        }
        con.end();
        res(result);
      });
    });
  });
}
export function AddChildProductDB(idChildProduct: string, idProduct: string, nameChildProduct: string, importPrice: string, price: string, image: string) {
  return new Promise((res, rej) => {
    var sql = `INSERT INTO childproduct(idChildProduct, idProduct, nameChildProduct, importPrice, price, image) VALUES (?,?,?,?,?,?)`
    con_mysql2.query(sql, [idChildProduct, idProduct, nameChildProduct, importPrice, price, image], ((err, result, fiels) => {
      if (err) {
        rej(err)
      }
      res(result)
    }))
  })
}
export function UpdateChildProductDB(
  idChildProduct: string,
  nameChildProduct: string,
  importPrice: string,
  price: string,
  image: string) {
  return new Promise((res, rej) => {
    var sql = `UPDATE childproduct 
      SET nameChildProduct=?,importPrice=?,price=?,image=? 
      WHERE idChildProduct=?`
    con_mysql2.query(sql, [nameChildProduct, importPrice, price, image, idChildProduct], (err, result, fields) => {
      if (err) {
        rej(err)
      }
      res(result)
    })
  })
}
