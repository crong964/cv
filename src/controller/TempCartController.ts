import { ResultSetHeader } from "mysql2";
import {
  GetAllTempProductInCartDB,
  GetTempProductInCartByDB,
  InsertTempCartDB,
  RemoveTemProductInCartDB,
} from "../database/TempCartDB";
import { err } from "../lib/lib";
import TempCart from "../model/TempCart";
class TempCartController {
  private static listTempCart: Map<string, boolean> = new Map();
  constructor() { }
  async Has(idInforUser: number, idChildProduct: string) {
    var check: boolean = TempCartController.listTempCart.has(
      `${idInforUser}-${idChildProduct}`
    );
    if (check) {
      return check;
    }
    check = false;
    await GetTempProductInCartByDB(idChildProduct, idInforUser)
      .then((v: any) => {
        if (v.length > 0) {
          TempCartController.listTempCart.set(
            `${idInforUser}-${idChildProduct}`,
            true
          );
          check = true;
        }
      })
      .catch((v) => {
        err("HasTempProInCart TempCartController", v);
        check = false;
      });
    return check;
  }
  async GetAllTempProductInCart(idInforUser: number) {
    var list: TempCart[] = [];
    await GetAllTempProductInCartDB(idInforUser)
      .then((v: any) => {
        for (let i = 0; i < v.length; i++) {
          const element = v[i];
          var tempcart = new TempCart();
          tempcart.setAll(element);
          list.push(tempcart);
        }
      })
      .catch((v) => {
        err("GetAllTempProductInCart TempCartController", v);
      });
    return list;
  }

  async InsertTempCart(idChildProduct: string, idInforUser: number) {
    var check = true;
    await InsertTempCartDB(idChildProduct, idInforUser)
      .then((v) => {
        check = true;
      })
      .catch((v) => {
        err("InsertTempCart TempCartController", v);
        check = false;
      });

    return check;
  }
  Get() {
    return TempCartController.listTempCart;
  }
  async RemoveTemProductInCart(idChildProduct: string, idInforUser: number) {
    var check
    TempCartController.listTempCart.delete(`${idInforUser}-${idChildProduct}`);
    try {
      check = await RemoveTemProductInCartDB(idChildProduct, idInforUser) as ResultSetHeader
    } catch (error) {
      err("RemoveTemProductInCart TempCartController", error as string);
    }

    return check;
  }

}

export default new TempCartController();
