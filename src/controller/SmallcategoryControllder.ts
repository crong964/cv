import { ResultSetHeader } from "mysql2/promise";
import { GetAllSmallcategoryDB, UpdateSmallcategoryDB } from "../database/SmallcategoryDB";
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
    async UpdateSmallcategory(idSmallCategory: string, nameSmallCategory: string) {
        var check
        try {
            check = await UpdateSmallcategoryDB(idSmallCategory, nameSmallCategory) as ResultSetHeader

        } catch (error) {
            err("UpdateSmallcategory SmallcategoryControllder", error)
        }
        return check
    }
}

export default new SmallcategoryControllder()