"use strict";
var totalmoney = 0;
function tableTemProduct(multitableData) {
    var data = new Date();
    return `
    <a href="http://localhost:1000/admin/imPortBill/" class="btn btn-info my-3">
            quay lại                     
    </a>
    <form id="formOrder">
    <h2 class=" text-center"> 
        Các sản phẩm nhập hàng
    </h2>
      <div class="form-row">
        <div class="form-group col-md-5 my-3 p-2">
          <label for="idImportBill" class="col-form-label">Mã hóa đơn</label>
          <input type="text" name="idImportBill" class="form-control" id="idImportBill" value="${data.getTime()}">
        </div>
      </div>
      <div class="row my-3 w-100">
          <div class="form-group col-md-4">
            <label for="createdDay" class="col-form-label">Ngày lập</label>
            <input type="date" name="createdDay" class="form-control" id="createdDay" require value="">
          </div>
          <div class="form-group col-md-4">
            <label for="finishDay" class="col-form-label">Ngày hoàn thành</label>
            <input type="date" name="finishDay" class="form-control" id="finishDay" require value="">
          </div>
          <div class="form-group col-md-4">
            <label for="supplier" class="col-form-label">nhà cung cấp</label>
            <input type="text" name="supplier" class="form-control" id="supplier" require value="">
          </div>
        </div>
      <table class="table table-hover table-bordered" id="sampleTable">
      <thead>
      <tr>
      <th>Mã sản phẩm</th>
      <th>Tên sản phẩm</th>
      <th>Ảnh sản phẩm</th>
      <th>Giá nhập </th>
      <th>Số lương</th>
      <th>Tháo tác</th>
      </tr>
      </thead>
      <tbody class="tabledata">
      ${multitableData}
      </tbody>
      </table>
      <div class="flex items-center justify-end text-base font-bold">
        <span class="mr-7">Tổng giá trị </span>
        <span id="total"> 0 </span>
      </div>
    </form>
    <button onclick="awaitingOrder()" class="btn btn-primary">Tạo hóa đơn đặt hàng</button>`;
}
function tableDataTemProductCell(data) {
    return `
        <tr class="text-base TemProduct M${data.idChildProduct}">
        <td>
        <input type="hidden" id="idChildProduct" value="${data.idChildProduct}">
        <input type="hidden" id="importPrice" value="${data.importPrice}">
        ${data.idChildProduct}</td>
        <td>${data.nameChildProduct}</td>
        <td><img src="${data.image}" alt="" width="100px;"></td>
        <td>${convertMoney(data.importPrice)} </td> 
        <td >
        <input type="number" id="amount" name="amount" onchange="totalCost()" onkeyup="totalCost()" value="1">
        </td>
        <td>
        <div class="product btn btn-primary" onclick=xoa(${data.idChildProduct})> Xóa </div>
        </td>
        </tr>`;
}
function multitableTemProduct(params) {
    var s = "";
    for (let i = 0; i < params.length; i++) {
        const element = params[i];
        s += tableDataTemProductCell(element);
    }
    return s;
}
function getAllTemProdct() {
    var tabledata = document.querySelector("#sampleTable");
    fetchPostUrl("/temPro/getAllTemp", {}, (data) => {
        tabledata.innerHTML = tableTemProduct(multitableTemProduct(data));
        totalCost();
        initDay();
    });
}
function xoa(s) {
    fetchPostUrl("/temPro/removeaddCart", { idChildProduct: s }, (data) => {
        var _a;
        alert(JSON.stringify(data));
        (_a = document.querySelector(`.M${s}`)) === null || _a === void 0 ? void 0 : _a.remove();
        totalCost();
    });
}
function totalCost() {
    var temProduct = document.querySelectorAll(".TemProduct");
    var totalCost = 0;
    temProduct.forEach((v) => {
        var money = v.querySelector("#importPrice").value;
        var quantity = v.querySelector("#amount").value;
        if (quantity) {
            totalCost += parseInt(money) * parseInt(quantity);
        }
    });
    var total = document.getElementById("total");
    total.innerHTML = convertMoney(totalCost) + "";
}
function awaitingOrder() {
    var l = document.querySelectorAll(".TemProduct");
    var formOrder = new FormData(document.getElementById("formOrder"));
    var idImportBill = document.querySelector("#idImportBill");
    var list = {
        idImportBill: idImportBill.value,
        createdDay: formOrder.get("createdDay"),
        finishDay: formOrder.get("finishDay"),
        supplier: formOrder.get("supplier"),
        list: [],
    };
    l.forEach((v) => {
        var idChildProduct = v.querySelector("#idChildProduct");
        var amount = v.querySelector("#amount");
        var childProduct = {
            amount: parseInt(amount.value),
            idChildProduct: idChildProduct.value,
        };
        list.list.push(childProduct);
    });
    fetchPostUrl("/admin/imPortBill", list, (data) => {
        alert(JSON.stringify(data));
        getAllTemProdct();
    });
}
function initDay() {
    var createdDay = document.getElementById("createdDay");
    var finishDay = document.getElementById("finishDay");
    var date = new Date();
    createdDay.valueAsDate = date;
    finishDay.valueAsDate = date;
}
