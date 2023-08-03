"use strict";
function table(data) {
    return `
  <h2 class="text-center">
  Danh sách các sản phẩm 
  </h2>
  <table class="table table-hover table-bordered" id="sampleTable">
  <thead>
  <tr>
  <th>Mã sản phẩm</th>
  <th>Tên sản phẩm</th>
  <th>Ảnh sản phẩm</th>
  <th>Giá nhập </th>
  <th>Giá bán</th>
  <th>Số lương</th>
  <th>xem chi tiết</th>
  </tr>
  </thead>
  <tbody class="tabledata">
  ${data}
  </tbody>
  </table>`;
}
function tableDataCell(data) {
    return `
    <tr class="text-base">
    <td>${data.idProduct}</td>
    <td>${data.namePro}</td>
    <td><img src="${data.image}" alt="" width="100px;"></td>
    <td>${convertMoney(data.importPrices)} </td>
    <td><span>${convertMoney(data.Price)}</span></td>
    <td class="text-center">${data.amount}</td>
    <td>
    <button class=" hover:bg-green-500 hover:text-white" onclick="loadChild(${data.idProduct})"> xem chi thêm </button>
    </td>
    </tr>`;
}
function multitableDataCell(data) {
    var s = "";
    for (let i = 0; i < data.length; i++) {
        var element = data[i];
        s += tableDataCell(element);
    }
    return s;
}
function product(s) {
    if (s) {
        removeActive();
        s.classList.add("active");
    }
    fetchGetUrl("/product/", (data) => {
        var tabledata = document.querySelector("#sampleTable");
        tabledata.innerHTML = table(multitableDataCell(data));
    });
}
function loadChild(idProduct) {
    fetchGetUrl(`/childproduct/${idProduct}`, (data) => {
        var tabledata = document.querySelector("#sampleTable");
        tabledata.innerHTML = tableChild(multitableDataChildCell(data));
    });
}
