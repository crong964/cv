import { Router, Request, Response } from "express";
import ContainImportedBillController from "../../controller/ContainImportedBillController";
import ImportedBillController from "../../controller/ImportedBillController";
import { vali } from "../../lib/lib";
import path from "path";
import ip from "../../admin";
import sercurity from "../../lib/sercurity";


const containImportedBill = Router();
interface search {
  idImportedBill: string | undefined;
}

containImportedBill.use(vali);

containImportedBill.get("/:idImportedBill", async (req, res) => {
  const { idImportedBill } = req.params as unknown as search;
  if (idImportedBill == undefined) {
    res.json({ list: [] });
    return;
  }

  var check = await ImportedBillController.Has(idImportedBill);
  if (!check) {
    res.json({ err: true, mess: "không có" });
    return;
  }

  var f = await Promise.all([
    ContainImportedBillController.GetAllByIdImportedBill(idImportedBill),
    ImportedBillController.GetImportedBillById(idImportedBill)])

  
  var pa = path.join(ip.path, "/server/page/html/imported_product_table.ejs")
  res.render(pa, { list: f[0], importedBill: f[1], ip: ip.address })

});

export default containImportedBill;
