import BaseModel from "./BaseModel";

export class Inforuser extends BaseModel {
    address: string | undefined
    numberPhone: string | undefined
    id:number|undefined
    name: string | undefined
    constructor() {
        super()
        this.address = undefined
        this.numberPhone = undefined
        this.id=undefined
        this.name = undefined
    }
}

