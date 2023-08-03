import { GetAllSmallcategoryDB } from "../database/SmallcategoryDB";
import { err } from "../lib/lib";
import Smallcategory from "../model/Smallcategory";


class SmallcategoryControllder {
    constructor() {

    }
    async GetAllSmallcategory() {
        var list: Smallcategory[] = []
        try {
            await GetAllSmallcategoryDB()
                .then((v: any) => {
                    for (let i = 0; i < v.length; i++) {
                        const element = v[i];
                        var smallcategory = new Smallcategory()
                        smallcategory.setAll(element)
                        list.push(smallcategory)
                    }
                })
        } catch (error) {
            err("GetAllSmallcategory SmallcategoryControllder", "")
            console.log(error);
        }
        return list
    }
}

export default new SmallcategoryControllder()