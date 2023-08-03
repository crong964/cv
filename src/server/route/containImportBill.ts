import { Router, Request } from "express";
import { join } from "path";
import ip from "../../admin";

import ImportBillController from "../../controller/ImportBillController";
import ContainImportBillController from "../../controller/ContainImportBillController";
import ImportedBillController from "../../controller/ImportedBillController";

const containImportBill = Router()

interface search {
    idImportBill: string | undefined;
}
containImportBill.get("/:idImportBill", async (req, res) => {
    var pa = join(ip.path, "/server/page/html/containImportBill/allchildProInImportBill.ejs")
    const { idImportBill } = req.params as unknown as search;

    if (idImportBill == undefined) {
        res.json({ err: true, mess: "không có bill này" });
        return;
    }
    var check = await ImportBillController.Has(idImportBill);
    if (!check) {
        res.json({ err: true, mess: "không có bill này" });
        return;
    }


    var list = await Promise.all([ImportBillController.GetImportBillById(idImportBill),
    ContainImportBillController.GetAllByIdImportBill(idImportBill),
    ImportedBillController.GetAllImportedBillById(idImportBill)])

    var listImportChildPro = list[1]
    var dem = 0
    for (let i = 0; i < listImportChildPro.length; i++) {
        const e: any = listImportChildPro[i];
        if (e.amount > e.importedAmount) {
            dem += 1
        }

    }
   
    res.render(pa, {
        dem: dem,
        idImportedBill: new Date().getTime(),
        ip: ip.address,
        bill: list[0],
        listImportChildPro: list[1],
        listImportedBill: list[2]
    })
})


export default containImportBill