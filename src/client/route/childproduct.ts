import { Router } from "express";
import ChildProductController from "../../controller/ChildProductController";

const childproduct = Router()


childproduct.get('/:id', async (req, res) => {
    var id = req.params.id
    

    if (id == undefined) {
        res.json({})
        return
    }

    var childproduct = await ChildProductController.Get(id)
    if (childproduct == undefined) {
        res.json({})
        return
    }
    
    res.json({
        id: childproduct.idChildProduct,
        quantity: childproduct.amount,
        price: childproduct.price,
        image: childproduct.image,
        nameChildPro:childproduct.nameChildProduct
    })
})
export default childproduct