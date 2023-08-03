export default class BaseModel{
    constructor(){

    }
    setAll(p:any){
        for (const key in this) {
            const element = p[key];
            this[key]=element
        }
    }
    json():{}{
        var s:any={}
        for (const key in this) {
            if(this[key]!=undefined){
                s[key]=this[key]
            }
        }
        return s
    }
}