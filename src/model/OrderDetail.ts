
import ChildProduct from "./ChildProduct";

class OrderDetail extends ChildProduct {
    idorder: number | undefined
    price: number
    quantity: number
    constructor() {
        super()
        this.idorder = undefined
        this.price = 0
        this.quantity = 0
    }
}

export default OrderDetail