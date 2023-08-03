import { Router } from "express";
import path from "path";
import { render, us } from "../../lib/lib";
import ip from "../../admin";

import accountEmployeeController from "../../controller/AccountEmployeeController";
import inforEmployeeController from "../../controller/InforEmployeeController";

const login = Router();
login.get("/", (req, res) => {
  if (req.cookies.id == undefined) {
    var pa: string = path.join(__dirname, "/../server/page/html/login.html");
    render(res, ip.address, pa);
    return;
  }

  res.redirect("/");
});

login.post("/", async (req, res) => {
  var p: us = req.body;
  console.log(p.username);

  var check = await Promise.all([
    accountEmployeeController.Has(p.username, p.password),
    inforEmployeeController.GetInforEmByAcount(p.username),
  ]);
  console.log(check);

  if (!check[0] || check[1] == undefined) {
    var pa: string = path.join(__dirname, "/../server/page/html/login.html");
    render(res, ip.address, pa);
    return;
  }
  res.cookie("id", check[1].idInforUser, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 356,
  });
  res.redirect("/");
});
export default login;
