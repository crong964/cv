import { GetAccount } from "../database/AccountEmployeeDB";
import AccountEmployee from "../model/AccountEmployee";

class AccountEmployeeController {
  private static ListAccountEmployee: Map<string, AccountEmployee | undefined> =
    new Map<string, AccountEmployee | undefined>();
  constructor() {}
  async Has(account: string, password: string) {
    var accountEmployee: undefined | AccountEmployee =
      AccountEmployeeController.ListAccountEmployee.get(account);

    if (accountEmployee != undefined) {
      return true;
    }

    await GetAccount(account, password)
      .then((v: any) => {
        if (v.length > 0) {
          accountEmployee = new AccountEmployee();
          accountEmployee.setAll(v[0]);
          if (accountEmployee.account) {
            AccountEmployeeController.ListAccountEmployee.set(
              accountEmployee.account,
              accountEmployee
            );
          }
        }
      })
      .catch((v) => {
        console.log(`error in class AccountEmployeeController\\n + ${v}`);
        accountEmployee == undefined;
      });
    return accountEmployee != undefined;
  }
}

export default new AccountEmployeeController();
