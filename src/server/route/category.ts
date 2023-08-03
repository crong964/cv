import { Router, Request, Response, NextFunction } from "express";
import path from "path";
import ip from "../../admin";
import BigcategoryController from "../../controller/BigcategoryController";
import SmallcategoryControllder from "../../controller/SmallcategoryControllder";




const BigCategory = Router()

BigCategory.get("/", async (req, res) => {
    var list = await Promise.all([BigcategoryController.GetAllBigcategory(),
    SmallcategoryControllder.GetAllSmallcategory()])


    res.render(path.join(ip.path, "/server/page/html/category.ejs"), { ip: ip.address, list1: list[0], list2: list[1] })
})
BigCategory.post("/", async (req, res) => {
    console.log(req.body);
    res.redirect(`${ip.address}admin/category`)
})
BigCategory.post("/Add", async (req, res) => {
    if (!req.body.name) {

        res.redirect(`${ip.address}admin/category`)
        return
    }
    var name: string = req.body.name
    name.trim()
    var check = await BigcategoryController.GetBigCategoryByName(name)
    if (check) {
        res.redirect(`${ip.address}admin/category`)
        return
    }
    var check = await BigcategoryController.AddBigCategory(name)
    res.redirect(`${ip.address}admin/category`)
})
BigCategory.post("/Edit", async (req, res) => {
    if (!req.body.id && !req.body.name) {
        res.redirect(`${ip.address}admin/category`)
        return
    }
    var name: string = req.body.name
    var id: string = req.body.idBigCategory
    name.trim()
    id.trim()
    var check = await BigcategoryController.UpdateBigCategory(id, name)
    res.redirect(`${ip.address}admin/category`)
    console.log(check);

})
BigCategory.post("/Delete", async (req, res) => {
    var id: string = req.body.id
    if (id != undefined) {
        await BigcategoryController.DeleteBigCategoryByid(id)
    }
    res.redirect(`${ip.address}admin/category`)
})
export default BigCategory