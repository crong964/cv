import BaseModel from "./BaseModel";

export default class InforEmployee extends BaseModel{
    account:string|undefined
    idInforUser:number|undefined
    nameUser:string|undefined
    phoneNumber:string|undefined
    constructor(){
        super()
        this.account=undefined
        this.idInforUser=undefined
        this.nameUser=undefined,
        this.phoneNumber=undefined
    }
    
}