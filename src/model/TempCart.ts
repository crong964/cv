import ip from "../admin";
import BaseModel from "./BaseModel";
export default class TempCart extends BaseModel {
  idChildProduct: string | undefined;
  image: string | undefined;
  importPrice: number | undefined;
  nameChildProduct: string | undefined;
  constructor() {
    super();
    this.idChildProduct = undefined;
    this.nameChildProduct = undefined;
    this.image = undefined;
    this.importPrice = undefined;
  }
  setAll(p: any): void {
      super.setAll(p)
      if (this.image) {
        this.image=ip.address+`static/imageProduct/${this.image}`
      }
  }
}
