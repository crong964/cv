import { ResultSetHeader } from "mysql2";
import {
  GetAllImportBillDB,
  GetImportBillByIdDB,
  InsertImportBillDB,
  RemoveBill,
  UpdateStatusDB
} from "../database/ImportBillDB";
import { err } from "../lib/lib";
import ImportBill from "../model/ImportBill";

class ImportBillController {
  private static listImportBill: Map<string, ImportBill> = new Map<string,
    ImportBill>();
  constructor() { }
  async Has(idImportBill: string) {
    var check = ImportBillController.listImportBill.has(idImportBill);
    if (check) {
      return check;
    }
    await GetImportBillByIdDB(idImportBill)
      .then((v: any) => {
        if (v.length > 0) {
          var importBill: ImportBill = new ImportBill();
          importBill.setAll(v[0]);
          if (importBill.idImportBill) {
            ImportBillController.listImportBill.set(
              importBill.idImportBill,
              importBill
            );
          }
          check = true;
        } else {
          check = false;
        }
      })
      .catch((v) => {
        err("HasImportBill ImportBillController", v);
        check = false;
      });
    return check;
  }
  async GetImportBillById(idImportBill: string) {
    var temp = ImportBillController.listImportBill.get(idImportBill);
    if (temp) {
      return temp;
    }
    await GetImportBillByIdDB(idImportBill)
      .then((v: any) => {
        if (v.length > 0) {
          temp = new ImportBill();
          temp.setAll(v[0]);
          if (temp.idImportBill) {
            ImportBillController.listImportBill.set(temp.idImportBill, temp);
          }
        }
      })
      .catch((v) => {
        err("GetImportBillById ImportBillController", v);
      });
    return temp;
  }
  async InsertImportBill(idImportBill: string, idForUser: number, createdDay: string, finishDay: string, supplier: string) {
    var check = false;
    await InsertImportBillDB(idImportBill, idForUser, createdDay, finishDay, supplier)
      .then((v) => {
        check = true;
      })
      .catch((v) => {
        err("InsertImportBill ImportBillController", v);
      });
    return check;
  }
  async GetAllImportBill(pa: any) {
    pa.status = pa.status || ""
    var list: ImportBill[] = [];
    try {
      var v = await GetAllImportBillDB(pa) as []
      for (let i = 0; i < v.length; i++) {
        const element = v[i];
        let importBill = new ImportBill();
        importBill.setAll(element);
        if (importBill.idImportBill) {
          ImportBillController.listImportBill.set(
            importBill.idImportBill,
            importBill
          );
          list.push(importBill);
        }
      }
    } catch (error) {
      err("GetAllImportBill ImportBillController", error);
    }
    return list;
  }
  async RemoveBill(idImportBill: string) {
    var check
    try {
      check = await RemoveBill(idImportBill) as ResultSetHeader
      ImportBillController.listImportBill.delete(idImportBill)
    } catch (error) {
      err("RemoveBill ImportBillController", error)
    }
    return check
  }
  async UpdateStatus(idImportBill: string, status: number) {
    var check
    try {
      check = await UpdateStatusDB(idImportBill, status) as ResultSetHeader
      ImportBillController.listImportBill.delete(idImportBill)
    } catch (error) {
      err("UpdateStatus ImportBillController", error)
    }
    return check
  }
}

export default new ImportBillController();
