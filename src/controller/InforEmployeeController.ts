import InforEmployee from "../model/InforEmployee";
import { GetEmByAccountDB } from "../database/InforEmployeeDB";
import { err } from "../lib/lib";
class InforEmployeeController {
  private static ListInforEmployee: Map<number, InforEmployee | undefined> =
    new Map<number, InforEmployee | undefined>();
  constructor() {}
  async GetInforEmByAcount(account: string) {
    var i: InforEmployee | undefined;
    await GetEmByAccountDB(account)
      .then((v: any) => {
        if (v.length > 0) {
          i = new InforEmployee();
          i.setAll(v[0]);
          if (i.idInforUser) {
            InforEmployeeController.ListInforEmployee.set(i.idInforUser, i);
          }
        }
      })
      .catch((v) => {
        err("InforEmployeeController", v);
      });

    return i;
  }
}

export default new InforEmployeeController();