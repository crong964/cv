import { Router } from "express";
import VnLocationController from "../../controller/VnLocationController";

const vnlocation = Router()

vnlocation.get("/provinces", async (req, res) => {
    var l = await VnLocationController.GetAllProvincesList()
    res.json(l)
})
vnlocation.get("/districts", async (req, res) => {
    var dept = req.query.provincesCode as string
    if (dept == undefined) {
        res.json({
            err: true
        })
        return
    }
    var l = await VnLocationController.GetAllDistrictsList(dept)
    res.json({
        err: false,
        list: l
    })
})
vnlocation.get("/ward", async (req, res) => {
    var dept = req.query.districtsCode as string
    if (dept == undefined) {
        res.json({
            err: true
        })
        return
    }
    var l = await VnLocationController.GetAllWardList(dept)
    res.json({
        err: false,
        list: l
    })
})

export default vnlocation