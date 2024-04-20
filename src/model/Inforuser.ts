import BaseModel from "./BaseModel";

export class InforUser extends BaseModel {
    public static statusS = ['kích hoạt', 'khóa']
    address: string | undefined
    numberPhone: string | undefined
    id: number | undefined
    name: string | undefined
    status: number
    constructor() {
        super()
        this.status = 0
        this.address = undefined
        this.numberPhone = undefined
        this.id = undefined
        this.name = undefined
    }
}

