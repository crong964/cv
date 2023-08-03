import BaseModel from "./BaseModel";

class Smallcategory extends BaseModel {
    idSmallCategory : number | undefined
    nameSmallCategory: string | undefined 
    constructor() {
        super();
        this.idSmallCategory  = undefined
        this.nameSmallCategory = undefined
    }
}

export default Smallcategory