import { NextFunction, Request, Response } from "express";
import fs from "fs";
export function render(res: Response, ip: string, pa: string) {
  fs.readFile(pa, (err, data) => {
    var d = data.toString("utf8");
    while (d.indexOf("<??>") > 0) {
      d = d.replace("<??>", ip);
    }
    res.send(d);
  });
}
export function err(where: string, mess: any) {
  console.log(`in ${where} class,\\n err: ${mess}`);
}
export interface us {
  username: string;
  password: string;
}
export function vali(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies.id) {
    res.redirect("/");
  }
  next();
}
export function convertMoney(params: number | undefined) {
  if (!params) {
    return 0;
  }
  var s = params + "";
  var temp = "";
  var n = 0;
  for (let i = s.length - 1; i > 0; i--) {
    const element = s[i];
    temp = element + temp;
    n += 1;
    if (n % 3 == 0) {
      temp = "." + temp;
      n = 0;
    }
  }
  temp = s[0] + temp + " Đ";
  return temp;
}

export function formatDate(d: string | undefined) {
  if (!d) {
    return;
  }
  var p = new Date(parseInt(d));
  return `${p.getDate()}-${p.getMonth() + 1
    }-${p.getFullYear()} ${p.getHours()}:${p.getMinutes()}:${p.getSeconds()}`;
}

export interface GrapSql {
  fiel: string
  va: string
}
export enum statusBill{
  ship='ship',
  pay='pay'
}
export interface Limit {
  start: number
  count: number
}