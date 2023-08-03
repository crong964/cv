import { ResultSetHeader } from "mysql2";
import { AddBigCategoryDB, DeleteBigCategoryByidDB, GetAllBigcategoryDB, GetBigCategoryByNameDB, UpdateBigCategoryDB } from "../database/BigcategoryDB";
import { err } from "../lib/lib";
import Bigcategory from "../model/Bigcategory";

class BigcategoryController {
    constructor() {

    }
    async GetAllBigcategory() {
        var list: Bigcategory[] = []
        try {
            await GetAllBigcategoryDB()
                .then((v: any) => {
                    for (let i = 0; i < v.length; i++) {
                        const element = v[i];
                        let temp = new Bigcategory()
                        temp.setAll(element)
                        list.push(temp)
                    }
                })
        } catch (error) {
            err("GetAllBigcategory BigcategoryController", "")
            console.log(error);
        }
        return list
    }
    async AddBigCategory(name: string) {
        var check: ResultSetHeader | undefined = undefined
        await AddBigCategoryDB(name)
            .catch((v) => {
                err("AddBigCategory BigcategoryController", v)
            })
            .then((v) => {
                check = v as ResultSetHeader
            })
        return check
    }
    async GetBigCategoryByName(name: string) {
        var check = undefined
        await GetBigCategoryByNameDB(name)
            .catch((v) => {
                err("GetBigCategoryByName BigcategoryController", v)
            })
            .then((v: any) => {
                if (v[0]) {
                    check = new Bigcategory()
                    check.setAll(v[0])
                }
            })
        return check
    }
    async UpdateBigCategory(id: string, name: string) {
        var check: ResultSetHeader | any
        await UpdateBigCategoryDB(id, name)
            .catch((v) => {
                err("UpdateBigCategory BigcategoryController", v)
                check = undefined
            })
            .then((v: any) => {
                check = v as ResultSetHeader
            }) as ResultSetHeader
        return check
    }
    async DeleteBigCategoryByid(id: string) {
        var check
        try {
            check = await DeleteBigCategoryByidDB(id) as ResultSetHeader
            
        } catch (error) {
            err("UpdateBigCategory BigcategoryController", error as string)
        }
        return check
    }
}

export default new BigcategoryController()