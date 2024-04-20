import { formatDate } from "../lib/lib";
import BaseModel from "./BaseModel";

class ImportBill extends BaseModel {
  public static statusS = ['chưa hoàn thành', 'đã hoàn thành']
  idImportBill: string | undefined;
  createdDay: string | undefined;
  finishDay: string | undefined
  supplier: string | undefined
  idForUser: number | undefined;
  status: any | undefined;
  constructor() {
    super();
    this.createdDay = undefined;
    this.idForUser = undefined;
    this.finishDay = undefined
    this.supplier = undefined;
    this.status = undefined;
    this.idImportBill = undefined;
  }
  setAll(p: any): void {
    super.setAll(p);
    
    if (this.createdDay && this.finishDay) {
      this.createdDay = formatDate(new Date(this.createdDay).getTime() + "")
      this.finishDay = formatDate(new Date(this.finishDay).getTime() + "")
    }
  }
}


export default ImportBill