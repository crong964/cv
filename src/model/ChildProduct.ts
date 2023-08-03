import BaseModel from "./BaseModel";
export default class ChildProduct extends BaseModel {
  idChildProduct: string | undefined;
  nameChildProduct: string | undefined;
  idProduct: number | undefined;
  image: string | undefined;
  importPrice: number;
  price: number;
  amount: number;
  constructor() {
    super();
    this.idChildProduct = undefined;
    this.nameChildProduct = undefined;
    this.idProduct = undefined;
    this.image = undefined;
    this.importPrice = 0;
    this.price = 0;
    this.amount = 0;
    

  }
  setAll(p: any): void {
    super.setAll(p)

  }
}
