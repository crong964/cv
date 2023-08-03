 
import BaseModel from "./BaseModel";

export default class Product extends BaseModel {
  idProduct: number | undefined;
  namePro: string | undefined;
  idSmallCategory: number | undefined;
  idBigCategory: number | undefined;
  image: string | undefined;
  importPrices: number | undefined;
  Price: number | undefined;
  amount: number | undefined;
  bt: string | undefined;
  constructor() {
    super();
    this.idProduct = undefined;
    this.Price = undefined;
    this.amount = undefined;
    this.idBigCategory = undefined;
    this.idSmallCategory = undefined;
    this.importPrices = undefined;
    this.image = undefined;
    this.namePro = undefined;
    this.bt = undefined
  }
  setAll(p: any): void {
    super.setAll(p)

  }
}
