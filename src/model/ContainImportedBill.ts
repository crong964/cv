
import BaseModel from "./BaseModel";

export default class ContainImportedBill extends BaseModel {
  idChildProduct: string | undefined;
  importPrice: number;
  importedAmount: number;
  nameChildProduct: string | undefined;
  image: string | undefined;
  constructor() {
    super();
    this.importedAmount = 0;
    this.importPrice = 0;
    this.idChildProduct = undefined;
    this.nameChildProduct = undefined;
    this.image = undefined;
  }
  setAll(p: any): void {
    super.setAll(p);
  }
}
