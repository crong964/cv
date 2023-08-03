"use strict";
function ImportBillCell(data) {
    return `
      <tr class="text-base">
      <td>${data.idImportBill}</td>
      <td>${data.idForUser}</td>
      <td >${formatDate(data.createdDay)}</td>
      <td >${formatDate(data.finishDay)}</td>
      <td >${data.supplier}</td>
      <td >${data.status}</td>
      <td>
      <a herf="" class="product btn btn-primary" onclick="DetailInforImportBill(${data.idImportBill})"> Xem chi tiết</a>
      <button class="product btn btn-primary" onclick="RemoveBill(${data.idImportBill})"> xóa hóa đơn</button>
      </td>
      </tr>`;
}
function ImportBillTable(data) {
    return `
    <h1 class=" text-center text-black  text-3xl ">
                            Danh sách hóa đơn nhập hàng
    </h1>
    <table class="table table-hover table-bordered" id="sampleTable">
    <thead>
    <tr>
    <th>Mã Hóa đơn</th>
    <th>Mã người tạo</th>
    <th>Ngày Tạo</th>
    <th>Ngày Kết thúc</th>
    <th>Cung cấp bởi</th>
    <th>Trạng thái </th>
    <th>Xem chi tiết </th>
    </tr>
    </thead>
    <tbody class="tabledata">
    ${data}
    </tbody>
    </table>
    `;
}
function multitableImportBillCell(params) {
    var s = "";
    for (let i = 0; i < params.length; i++) {
        const element = params[i];
        s += ImportBillCell(element);
    }
    return s;
}
var RemoveBill = (id) => {
    if (confirm("bạn muốn thực hiện")) {
        fetchPostUrl("/imPortBill/removeBill", { idBill: id }, (data) => {
            alert(JSON.stringify(data));
            location.reload();
        });
    }
};
