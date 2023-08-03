import {
  GetAllByIdImportBillDB,
  GetContainImportChildProductDB,
  InsertContainImportBillDB,
  UpdateImportedQuantityContainImportBillDB,
} from "../database/ContainImportBillDB";
import { err } from "../lib/lib";
import ContainImportBill from "../model/ContainImportBill";

class ContainImportBillController {
  private static listContainImportBill: Map<string, ContainImportBill> =
    new Map<string, ContainImportBill>();
  constructor() { }
  async InsertContainImportBill(
    idChildProduct: string,
    idImportBill: string,
    amount: number,
    importPrice: number
  ) {
    var check: boolean = false;
    await InsertContainImportBillDB(
      idChildProduct,
      idImportBill,
      amount,
      importPrice
    )
      .then((v) => {
        check = true;
      })
      .catch((v) => {
        err("InsertContainImportBill ContainImportBillController", v);
        check = false;
      });
    return check;
  }

  async GetAllByIdImportBill(idImportBill: string) {
    var list: ContainImportBill[] = [];
    await GetAllByIdImportBillDB(idImportBill)
      .then((v: any) => {
        for (let i = 0; i < v.length; i++) {
          const element = v[i];
          var containimportbill: ContainImportBill = new ContainImportBill();
          containimportbill.setAll(element);
          if (containimportbill.idChildProduct) {
            list.push(containimportbill);
            ContainImportBillController.listContainImportBill.set(
              `${idImportBill}-${containimportbill.idChildProduct}`,
              containimportbill
            );
          }
        }
      })
      .catch((v) => {
        err("GetAllByIdImportBill ContainImportBillController", v);
      });
    return list;
  }
  async IncreaseImportedAmount(
    idImportBill: string,
    idChildProduct: string,
    quantity: number
  ) {
    var has = await this.Has(idImportBill, idChildProduct);
    if (!has) {
      return has;
    }
    await UpdateImportedQuantityContainImportBillDB(
      idImportBill,
      idChildProduct,
      quantity
    )
      .then((v) => {
        has = true;
        var tem = ContainImportBillController.listContainImportBill.get(
          `${idImportBill}-${idChildProduct}`
        );
        if (tem && tem.importedAmount != undefined) {
          tem.importedAmount += parseInt(quantity+"");
        }
      })
      .catch((v) => {
        err("IncreaseImportedAmount ContainImportBillController", v);
        has = false;
      });

    return has;
  }
  async Has(idImportBill: string, idChildProduct: string) {
    var check = ContainImportBillController.listContainImportBill.has(
      `${idImportBill}-${idChildProduct}`
    );
    if (check) {
      return check;
    }
    await GetContainImportChildProductDB(idImportBill, idChildProduct)
      .then((v: any) => {
        for (let i = 0; i < v.length; i++) {
          check = true;
          const element = v[i];
          var tem = new ContainImportBill();
          tem.setAll(element);
          ContainImportBillController.listContainImportBill.set(
            `${idImportBill}-${idChildProduct}`,
            tem
          );
          break;
        }
      })
      .catch((v) => {
        err("HasContainImport ContainImportBillController", v);
        check = false;
      });
    return check;
  }
  async CheckImportedQuantity(
    idImportBill: string,
    idChildProduct: string,
    quantity: number
  ) {
    var check: boolean = false;
    var key = `${idImportBill}-${idChildProduct}`;
    var temp = ContainImportBillController.listContainImportBill.get(key);
    if (
      temp != undefined &&
      temp.amount != undefined &&
      temp.importedAmount != undefined
    ) {
      if (temp.amount >= temp.importedAmount + quantity) {
        check = true;
      } else {
        check = false;
      }
    }
    return check;
  }
}

export default new ContainImportBillController();
