"use strict";
function computeTotalMoney(money, id, s) {
    var element = s;
    var cellID = document.getElementById(id + "");
    cellID.innerHTML = convertMoney(money * parseInt(element.value)) + "";
}
function importChildPro() {
    var fromFletch = document.getElementById("fromFletch");
    var data = new FormData(fromFletch);
    var datapost = {
        idImportBill: "",
        idImportedBill: "",
        list: [],
    };
    var idImportBill = data.get("idImportBill");
    var idImportedBill = data.get("idImportedBill");
    var importQuantityls = data.getAll("importQuantity");
    var idChildProductls = data.getAll("idChildProduct");
    if (idImportBill && idImportedBill) {
        datapost.idImportBill = idImportBill;
        datapost.idImportedBill = idImportedBill;
    }
    var list = idChildProductls
        .map((v, id) => {
        var idChildPro = v;
        var importQuantity = parseInt(importQuantityls[id]);
        var childpro = {
            idChildPro: idChildPro,
            importQuantity: importQuantity,
        };
        return childpro;
    })
        .filter((v) => {
        if (v.importQuantity <= 0) {
            return false;
        }
        return true;
    });
    datapost.list = list;
    fetchPostUrl("http://localhost:1000/admin/importedBill/addNewImportedBill", datapost, (data) => {
        alert(JSON.stringify(data));
        location.reload();
    });
}
