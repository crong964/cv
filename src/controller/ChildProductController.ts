import ChildProduct from "../model/ChildProduct";
import {
  AddChildProductDB,
  GetAllChildProductByIdProductDB,
  GetChildProductDB,
  UpdateAmountChildProductDB,
  UpdateChildProductDB,
} from "../database/ChildProductDB";
import { err } from "../lib/lib";

import { ResultSetHeader } from "mysql2";
class ChildProductController {
  private static listChildProduct: Map<string, ChildProduct> = new Map<string, ChildProduct>();

  constructor() { }

  async GetAllChildProductByIdProduct(idProduct: number) {
    var list: ChildProduct[] = [];
    await GetAllChildProductByIdProductDB(idProduct)
      .then((v: any) => {
        for (let i = 0; i < v.length; i++) {
          const element = v[i];
          var childProduct = new ChildProduct();
          childProduct.setAll(element);
          list.push(childProduct);
          if (childProduct.idChildProduct) {
            ChildProductController.listChildProduct.set(
              childProduct.idChildProduct,
              childProduct
            );
          }
        }
      })
      .catch((v) => {
        err("ChildProductController GetAllChildProductByIdProduct", v);
      });
    return list;
  }
  async Has(idChildProduct: string) {
    var check = ChildProductController.listChildProduct.has(idChildProduct);
    if (check) {
      return check;
    }

    var temp: ChildProduct | undefined = undefined;
    await GetChildProductDB(idChildProduct)
      .then((v: any) => {
        for (let i = 0; i < v.length; i++) {
          const element = v[i];
          temp = new ChildProduct();
          temp.setAll(element);
          if (temp.idChildProduct) {
            ChildProductController.listChildProduct.set(
              temp.idChildProduct,
              temp
            );
          }
        }
      })
      .catch((v) => {
        err("ChildProductController HasChildProduct", v);
      });
    return temp != undefined;
  }
  async Get(idChildProduct: string) {
    if (await this.Has(idChildProduct)) {


    }
    return ChildProductController.listChildProduct.get(idChildProduct);
  }
  async IncreaseAmountChildProduct(idChildProduct: string, quantity: string) {
    var check = await this.Has(idChildProduct);
    if (!check) {
      return false;
    }
    await UpdateAmountChildProductDB(idChildProduct, parseInt(quantity))
      .then((v) => {
        check = true;
        var temp = ChildProductController.listChildProduct.get(idChildProduct);
        if (temp ) {
          temp.amount += parseInt(quantity);
        }
      })
      .catch((v) => {
        err("ChildProductController IncreaseAmountChildProduct", v);
        check = false;
      });
    return check;
  }
  async DecreaseAmountChildProduct(idChildProduct: string, quantity: number) {
    quantity *= -1;
    var check = false;
    await UpdateAmountChildProductDB(idChildProduct, quantity)
      .then((v) => {
        var tem = ChildProductController.listChildProduct.get(idChildProduct + "");
        if (tem != undefined) {
          tem.amount += parseInt(quantity + "");

        }
        check = true;
      })
      .catch((v) => {
        err("ChildProductController DecreaseAmountChildProduct", v);
        check = false;
      });
    return check;
  }
  async AddChildProduct(idChildProduct: string, idProduct: string, nameChildProduct: string, importPrice: string, price: string, image: string) {
    var check
    try {
      check = await AddChildProductDB(idChildProduct, idProduct, nameChildProduct, importPrice, price, image) as ResultSetHeader
    } catch (error) {
      err("AddChildProduct ChildProductController", error as string)
    }
    return check
  }
  async UpdateChildProduct(
    idChildProduct: string,
    nameChildProduct: string,
    importPrice: string,
    price: string,
    image: string) {
    var check
    try {
      check = await UpdateChildProductDB(idChildProduct, nameChildProduct, importPrice, price, image) as ResultSetHeader
    } catch (error) {
      err("UpdateChildProduct ChildProductController", error as string)
    }
    return check
  }
}

export default new ChildProductController();
