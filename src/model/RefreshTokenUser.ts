import BaseModel from "./BaseModel";

export default class RefreshTokenUser extends BaseModel {
     idUser: number|undefined
     refreshtoken: string|undefined
    constructor() {
        super()
        this.idUser=undefined
        this.refreshtoken=undefined
    }
}

