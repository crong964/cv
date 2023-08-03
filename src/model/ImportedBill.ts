import { formatDate } from "../lib/lib";
import BaseModel from "./BaseModel";

export default class ImportedBill extends BaseModel {
  idImportedBill: string | undefined;
  createdDay: string | undefined;
  idForUser: number | undefined;
  idImportBill: string | undefined;
  status: string | undefined
  paymentDate: string | undefined
  constructor() {
    super();
    this.createdDay = undefined;
    this.idForUser = undefined;
    this.idImportBill = undefined;
    this.idImportedBill = undefined;
    this.status = undefined;
    this.paymentDate = undefined 
  }
  setAll(p: any): void {
    super.setAll(p);
    var date
    if (this.paymentDate ) {
      date = new Date(this.paymentDate)
      this.paymentDate = formatDate(date.getTime()+"")
    }
    if (this.createdDay ) {
      date = new Date(this.createdDay)
      this.createdDay = formatDate(date.getTime()+"")
    }
  }
}
