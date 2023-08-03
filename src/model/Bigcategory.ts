import BaseModel from "./BaseModel";

class Bigcategory extends BaseModel {
    idBigCategory: number | undefined
    name: string | undefined
    constructor() {
        super();
        this.idBigCategory = undefined
        this.name = undefined
    }
}

export default Bigcategory