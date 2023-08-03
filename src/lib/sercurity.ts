import crypto from "crypto"
class sercurity {
    static key: string = "12345678"
    constructor() {

    }
    static Hash(s: string, lenght: number | undefined) {
        var d = lenght || 10;
        return crypto.createHash("shake256", { outputLength: d })
            .update(s)
            .update(sercurity.key).digest().toString("base64url")
    }
    static CreateSign(n?: number | undefined) {
        var d = n || 10;
        var v1 = crypto.randomBytes(d).toString("base64url")
        var date = new Date().getTime()

        var v2 = sercurity.Hash(`${v1}` + date, d)

        return { v1: v1, date: date, v2: v2 }
    }
    static VertifySign(v1: string, date: number, v2: string, lenght?: number | undefined) {
        var d = lenght || 10;

        var tempv2 = this.Hash(`${v1}` + date, d)
        return (tempv2 === v2)
    }
    static RandomKey(d?: number | undefined) {
        return crypto.randomBytes(d || 10).toString("base64url")
    }
    static CreateBase64Url(s: string) {
        return Buffer.from(s).toString("base64url")
    }
}

export default sercurity
export interface sercurityO {
    v1: string,
    date: number,
    v2: string
}