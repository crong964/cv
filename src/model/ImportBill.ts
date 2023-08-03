import { formatDate } from "../lib/lib";
import BaseModel from "./BaseModel";
function Ordered() {
  return "Đã Đặt";
}
function PartiallyPickup() {
  return "ĐÃ Giao Một Phần";
}
function Completeted() {
  return "Đã Hoàn Thành";
}
var status: any = {
  "0": Ordered(),
  "1": PartiallyPickup(),
  "2": Completeted(),
};

export default class ImportBill extends BaseModel {
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
    if (this.status) {
      this.status = status[this.status];
    }
    if (this.createdDay && this.finishDay) {
      this.createdDay = formatDate(new Date(this.createdDay).getTime() + "")
      this.finishDay = formatDate(new Date(this.finishDay).getTime() + "")
    }
  }
}
