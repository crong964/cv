import { ResultSetHeader, RowDataPacket } from "mysql2";
import {
  AddProductDB,
  DeleteProductDB,
  GetAllProductByBigCategaryDB,
  GetAllProductDB,
  GetProductDB,
  UpdateAmountProductDB,
  UpdateProductDB,
} from "../database/ProductDB";
import { convertMoney, err } from "../lib/lib";
import Product from "../model/Product";

class ProductController {
  private static ListProduct: Map<number, Product> = new Map<number, Product>();

  constructor() { }

  async GetAllProduct() {
    var list: Product[] = [];
    await GetAllProductDB()
      .then((v: any) => {
        for (let i = 0; i < v.length; i++) {
          const element = v[i];
          var product: Product = new Product();
          product.setAll(element);
          if (product.idProduct) {
            ProductController.ListProduct.set(product.idProduct, product);
            list.push(product);
          }
        }
      })
      .catch((v) => {
        err(" GetAllProductDB ProductController", v);
      });

    return list;
  }
  async Has(idProduct: number) {
    var check = ProductController.ListProduct.has(idProduct);
    if (check) {
      return check;
    }
    await GetProductDB(idProduct)
      .then((v: any) => {
        for (let i = 0; i < v.length; i++) {
          const element = v[i];
          var product = new Product();
          product.setAll(element);
          ProductController.ListProduct.set(idProduct, product);
          check = true;
          break;
        }
      })
      .catch((v) => {
        err("HasProduct ProductController", v);
        check = false;
      });
    return check;
  }
  async IncreaseAmountProduct(idProduct: number, quantity: number) {
    var check = false;
    await UpdateAmountProductDB(idProduct, quantity)
      .then((v) => {
        check = true;
        var tem = ProductController.ListProduct.get(idProduct);
        if (tem && tem.amount != undefined) {
          tem.amount +=parseInt(quantity+"");
        }
      })
      .catch((v) => {
        err("IncreaseAmountProduct ProductController", v);
        check = false;
      });
    return check;
  }
  async DecreaseAmountProduct(idProduct: number, quantity: number) {
    var check = false;
    quantity *= -1;
    await UpdateAmountProductDB(idProduct, quantity)
      .then((v) => {
        check = true;
        var tem = ProductController.ListProduct.get(idProduct);
        if (tem != undefined && tem.amount != undefined) {
          tem.amount +=parseInt(quantity+"");
        }
      })
      .catch((v) => {
        err("DecreaseAmountProduct ProductController", v);
        check = false;
      });
    return check;
  }
  async AddProduct(namePro: string, Price: string, ImportPrice: string, idBigCategory: string, idSmallCategory: string, image: string, bt: string) {
    var check = (await AddProductDB(namePro, Price, ImportPrice, idBigCategory, idSmallCategory, image, bt)) as ResultSetHeader;
    check.serverStatus;
    return check.insertId;
  }
  async GetProduct(id: number) {
    var list, product;
    try {
      list = (await GetProductDB(id)) as RowDataPacket[];
    } catch (error) {
      list = undefined;
      err("GetProduct ProductController", "");
      console.log(error);
    }
    if (list && list[0]) {
      product = new Product();
      product.setAll(list[0]);
    }
    return product;
  }
  async DeleteProduct(id: string) {
    var check;
    try {
      check = (await DeleteProductDB(id)) as ResultSetHeader;
    } catch (error) {
      err("DeleteProduct ProductController", error as string);
    }
    return check;
  }
  async UpdateProduct(idProduct: string, namePro: string, Price: string, ImportPrice: string,
    idBigCategory: string,
    idSmallCategory: string,
    image: string,
    bt: string
  ) {
    var check = undefined;
    try {
      check = (await UpdateProductDB(
        idProduct,
        namePro,
        Price,
        ImportPrice,
        idBigCategory,
        idSmallCategory,
        image,
        bt
      )) as ResultSetHeader;
    } catch (error) {
      err("UpdateProduct ProductController", error as string);
    }
    return check;
  }
  async GetAllProductByBigCategary(idBigCategory: string, page?: number, count?: number) {
    page = page = page || 0;
    page = page * 10;
    count = count || 10;
    var list: Product[] = [];
    try {
      var l = (await GetAllProductByBigCategaryDB(idBigCategory, page, count
      )) as RowDataPacket[];
      for (let i = 0; i < l.length; i++) {
        const element = l[i];
        var te = new Product();
        te.setAll(element);
        te.Price = convertMoney(te.Price) as number
        list.push(te);
      }
    } catch (error) {
      err("GetAllProductByBigCategary ProductController", error as string);
    }
    return list;
  }
}

export default new ProductController();


