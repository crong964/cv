import { GetAllDistrictsListDB, GetAllProvincesListDB, GetAllWardListDB } from "../database/VnLocationDB"
import { err } from "../lib/lib"

class VnLocationController {
    constructor() {

    }
    async GetAllProvincesList() {
        var check
        try {
            var l = await GetAllProvincesListDB() as []
            check=l
            
        } catch (error) {
            err("GetAllProvincesListDB() VnLocationController", error)
        }
        return check
    }
    async GetAllDistrictsList(provincesCode: string) {
        var check
        try {
            var l = await GetAllDistrictsListDB(provincesCode) as []
            check=l
            
        } catch (error) {
            err("GetAllDistrictsListDB(provincesCode: string) VnLocationController", error)
        }
        return check
    }
    async GetAllWardList(districts: string) {
        var check
        try {
            var l = await GetAllWardListDB(districts) as []
            check=l
            
        } catch (error) {
            err("GetAllWardListDB(districts: string) VnLocationController", error)
        }
        return check
    }
}

export default new VnLocationController()