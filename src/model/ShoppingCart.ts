import BaseModel from "./BaseModel";
import ChildProduct from "./ChildProduct";

export default class ShoppingCart extends ChildProduct {
    idUser: number
    constructor() {
        super()
        this.idUser = 0
    }
}

