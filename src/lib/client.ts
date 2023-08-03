import { Response, Request } from "express"
import ip from "../admin"
interface RenderClient {
    ip?: string
    name?: string
    path: string

}
export function renderClient(res: Response, data: RenderClient | any) {
    data.ip = data.ip || ip.address
    res.render(data.path, data)
}

export function RenderHtmlFinal(req: Request, res: Response, view: string, data: any) {
    data.ip = ip.address
    data.name = req.body.nameUserInSerVer
    res.render(view, data)
}

