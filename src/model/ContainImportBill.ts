
import BaseModel from "./BaseModel";

export default class ContainImportBill extends BaseModel {
  idChildProduct: string | undefined;
  amount: number ;
  importPrice: number;
  importedAmount: number ;
  nameChildProduct: string | undefined;
  image: string | undefined;
  constructor() {
    super();
    this.importedAmount = 0;
    this.importPrice = 0;
    this.idChildProduct = undefined;
    this.amount = 0;
    this.nameChildProduct = undefined;
    this.image = undefined;
  }
}
