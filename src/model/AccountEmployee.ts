import BaseModel from "./BaseModel";

export default class AccountEmployee extends BaseModel{
    public account:string|undefined
    public password:string|undefined
    constructor(){
        super()
        this.account=undefined
        this.password=undefined
    }
    
}