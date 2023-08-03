import { Response, Request } from "express"
import ip from "../admin"
export function RenderHtmlFinal_AD(req: Request, res: Response, views: string, data: any) {
    data.ip = ip.address
    res.render(views, data)
}