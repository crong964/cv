import mysql from "mysql";
import config, { con_mysql2 } from "./configMySQL";
export function InsertTempCartDB(idChildProduct: string, idInforUser: number) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);
    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql =
        "INSERT INTO tempcart(idInforUser, idChildProduct) VALUES (?,?)";
      con.query(sql, [idInforUser, idChildProduct], (err, result, fiels) => {
        if (err) {
          rej(err);
        }
        con.end();
        res(result);
      });
    });
  });
}
export function GetTempProductInCartByDB(
  idChildProduct: string,
  idInforUser: number
) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);
    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = `SELECT * 
FROM tempcart
WHERE idChildProduct =? AND idInforUser=?`;
      con.query(sql, [idChildProduct, idInforUser], (err, result, fiels) => {
        if (err) {
          rej(err);
        }
        con.end();
        res(result);
      });
    });
  });
}
export function GetAllTempProductInCartDB(idInforUser: number) {
  return new Promise((res, rej) => {
    var con = mysql.createConnection(config);
    con.connect((err) => {
      if (err) {
        rej(err);
      }
      var sql = `SELECT c.idChildProduct, c.nameChildProduct, c.importPrice,c.image FROM tempcart t,childproduct c WHERE t.idChildProduct=c.idChildProduct AND 
        t.idInforUser=?`;
      con.query(sql, idInforUser, (err, result, fiels) => {
        if (err) {
          rej(err);
        }
        con.end();
        res(result);
      });
    });
  });
}

export function RemoveTemProductInCartDB(
  idChildProduct: string,
  idInforUser: number
) {
  return new Promise((res, rej) => {
    var sql = `DELETE FROM tempcart WHERE idInforUser=? AND idChildProduct=?`;
    con_mysql2.query(sql, [idInforUser, idChildProduct], (err, result, fiels) => {
      if (err) {
        rej(err);
      }
      res(result);
    });
  });
}
