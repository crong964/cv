import {
  GetAllByIdImportedBillDB,
  InsertContainImportedBillDB,
} from "../database/ContainImportedBillDB";
import { err } from "../lib/lib";
import ContainImportedBill from "../model/ContainImportedBill";

class ContainImportedBillController {
  constructor() {}
  async InsertContainImportedBill(
    idChildProduct: string,
    idImportedBill: string,
    amount: number,
    importPrice: number
  ) {
    var check: boolean = false;
    await InsertContainImportedBillDB(
      idChildProduct,
      idImportedBill,
      amount,
      importPrice
    )
      .then((v) => {
        check = true;
      })
      .catch((v) => {
        check = false;
      });
    return check;
  }
  async GetAllByIdImportedBill(idImportedBill: string) {
    var list: ContainImportedBill[] = [];
    await GetAllByIdImportedBillDB(idImportedBill)
      .then((v: any) => {
        for (let i = 0; i < v.length; i++) {
          const element = v[i];
          var containimportedbill = new ContainImportedBill();
          containimportedbill.setAll(element);
          list.push(containimportedbill);
        }
      })
      .catch((v) => {
        err("GetAllByIdImportedBill ContainImportedBillController", v);
      });
    return list;
  }
}

export default new ContainImportedBillController();
