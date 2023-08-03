import mysql from "mysql";
import config, { con_mysql2 } from "./configMySQL";
import { ResultSetHeader } from "mysql2";

export function GetAllProductDB() {
  return new Promise((res, rej) => {
    var sql = "SELECT * FROM product";
    con_mysql2.query(sql, (err, va, fiels) => {
      if (err) {
        rej(err);
      }
      res(va)
    });
  });
}
export function UpdateAmountProductDB(idProduct: number, quantity: number) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);
    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = `UPDATE product SET amount = amount + ? WHERE idProduct = ?`;
      con.query(sql, [quantity, idProduct], (err, result, field) => {
        if (err) {
          rej(err);
        }
        con.end();
        res(result);
      });
    });
  });
}
export function GetProductDB(idProduct: number) {
  return new Promise((res, rej) => {

    var sql = `SELECT * FROM product WHERE idProduct=?`;
    con_mysql2.query(sql, idProduct, (err, result, field) => {
      if (err) {
        rej(err);
      }
      res(result);
    });
  });

}
export function AddProductDB(namePro: string,
  Price: string,
  ImportPrice: string,
  idBigCategory: string,
  idSmallCategory: string,
  image: string,
  bt: string) {
  return new Promise((res, rej) => {
    var sql: string = "INSERT INTO product( namePro, idSmallCategory, idBigCategory, image, importPrices, Price,bt) VALUES (?,?,?,?,?,?,?)"
    con_mysql2.query(sql, [namePro, idSmallCategory, idBigCategory, image, ImportPrice, Price, bt], (err, result, fiel) => {
      if (err) {
        rej(err)
      }
      res(result)
    })
  })
}
export function DeleteProductDB(id: string) {
  return new Promise((res, rej) => {
    var sql: string = "DELETE FROM product WHERE idProduct= ?"
    con_mysql2.query(sql, id, (err, result, fiel) => {
      if (err) {
        rej(err)
      }
      res(result)
    })
  })
}
export function UpdateProductDB(idProduct: string, namePro: string,
  Price: string,
  ImportPrice: string,
  idBigCategory: string,
  idSmallCategory: string,
  image: string,
  bt: string) {
  return new Promise((res, rej) => {
    var sql = `UPDATE product 
    SET namePro=?,idSmallCategory=?,idBigCategory=?,image=?,importPrices=?,Price=?,bt=?
    WHERE idProduct=? `
    con_mysql2.query(sql, [namePro, idSmallCategory, idBigCategory, image, ImportPrice, Price, bt, idProduct],
      (err, resutlt, fiels) => {
        if (err) {
          rej(err)
        }
        res(resutlt)
      })
  })
}
export function GetAllProductByBigCategaryDB(idBigCategory: string, start: number, count: number) {
  return new Promise((exc, rej) => {
    var sql = `SELECT * FROM product WHERE idBigCategory=? LIMIT ?,?`
    con_mysql2.query(sql, [idBigCategory, start, count], ((err, res, fields) => {
      if (err) {
        rej(err)
      }
      exc(res)
    }))
  })
}