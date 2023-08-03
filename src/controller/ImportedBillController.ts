import { ResultSetHeader } from "mysql2";
import {
  GetAllImportedBillByIdDB,
  GetImportedBillDB,
  InsertImportedBillDB,
  UpdateStatusImportedBillDB,
} from "../database/ImportedBillDB";
import { err } from "../lib/lib";
import ImportedBill from "../model/ImportedBill";

class ImportedBillController {
  private static list: Map<string, ImportedBill> = new Map<
    string,
    ImportedBill
  >();
  constructor() { }
  async Has(idImportedBill: string) {
    var check = ImportedBillController.list.has(idImportedBill);
    if (check) {
      return check;
    }
    await GetImportedBillDB(idImportedBill)
      .then((v: any) => {
        for (let i = 0; i < v.length; i++) {
          const element = v[i];
          var importedbill = new ImportedBill();
          importedbill.setAll(element);
          if (importedbill.idImportedBill) {
            ImportedBillController.list.set(
              importedbill.idImportedBill,
              importedbill
            );
          }
          check = true;
        }
      })
      .catch((v) => {
        check = false;
        err("HasImportedBill ImportedBillController", v);
      });
    return check;
  }
  async InsertImportedBill(
    idImportBill: string,
    idImportedBill: string,
    idForUser: number
  ) {
    var check: boolean = false;
    await InsertImportedBillDB(idImportBill, idImportedBill, idForUser)
      .then((v) => {
        check = true;
      })
      .catch((v) => {
        check = false;
        err("InsertImportedBill ImportedBillController", v);
      });
    return check;
  }
  async GetAllImportedBillById(idImportBill: string) {
    var list: ImportedBill[] = [];
    await GetAllImportedBillByIdDB(idImportBill)
      .then((v: any) => {
        for (let i = 0; i < v.length; i++) {
          const element = v[i];
          var importedbill = new ImportedBill();
          importedbill.setAll(element);
          if (importedbill.idImportedBill) {
            ImportedBillController.list.set(
              importedbill.idImportedBill,
              importedbill
            );
            list.push(importedbill);
          }
        }
      })
      .catch((v) => {
        err("GetAllImportedBillById ImportedBillController", v);
      });
    return list;
  }
  async GetImportedBillById(idImportedBill: string) {
    var importedBill: ImportedBill | undefined
    try {
      if (await this.Has(idImportedBill) == true) {
        importedBill = ImportedBillController.list.get(idImportedBill)
      }
    } catch (error) {
      err("GetImportedBillById ImportedBillController", error as string)
    }
    return importedBill;
  }
  async UpdateStatusImportedBill(idImportedBill: string, paymentDate: string, status: string) {
    var check: ResultSetHeader | undefined = undefined
    try {
      check = await UpdateStatusImportedBillDB(idImportedBill, paymentDate, status) as ResultSetHeader
      ImportedBillController.list.delete(idImportedBill)
    } catch (error) {
      err("UpdateStatusImportedBill ImportedBillController", error as string);
    }
    return check
  }
}
export default new ImportedBillController();
