import BaseModel from "./BaseModel";

class AccountUser extends BaseModel {
    account: string | undefined
    password: string | undefined
    idUser: string | undefined
    constructor() {
        super()
        this.account = undefined
        this.idUser = undefined
        this.password = undefined
    }
}

export default AccountUser