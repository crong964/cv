interface ChileProduct {
  idChildProduct: string | undefined;
  nameChildProduct: string | undefined;
  idProduct: number | undefined;
  image: string | undefined;
  importPrice: number | undefined;
  price: number | undefined;
  amount: number | undefined;
}
function tableChild(data: any) {
  return `
    <button onclick="product()" class="btn btn-success my-3">
            quay lại                     
    </button>
    <div class=" text-center text-black  text-3xl ">
                            Danh sách các sản phẩm
    </div>
    <table class="table table-hover table-bordered" id="sampleTable">
    <thead>
    <tr>
    <th>Mã sản phẩm</th>
    <th>Tên sản phẩm</th>
    <th>Ảnh sản phẩm</th>
    <th>Giá nhập </th>
    <th>Giá bán</th>
    <th>Số lương</th>
    <th>thao tác</th>
    </tr>
    </thead> 
    <tbody class="tabledata">
    ${data}
    </tbody>
    </table>
    `;
}
function tableDataChildCell(data: ChileProduct) {
  return `
      <tr class="text-base">
      <td>${data.idChildProduct}</td>
      <td>${data.nameChildProduct}</td>
      <td><img src="${data.image}" alt="" width="100px;"></td>
      <td>${convertMoney(data.importPrice)} </td>
      <td><span>${convertMoney(data.price)}</span></td>
      <td >${data.amount}</td>
      <td>
      <button class="product" onclick="addCart(${data.idChildProduct})"> Thêm hóa đơn </button>
      </td>
      </tr>`;
}
function multitableDataChildCell(data: ChileProduct[]) {
  var s = "";
  for (let i = 0; i < data.length; i++) {
    var element = data[i];
    s += tableDataChildCell(element);
  }
  return s;
}
function addCart(idChildProduct:number) {
  
  fetchPostUrl("/temPro/addCart",{idChildProduct:idChildProduct},(data:any)=>{
    alert(JSON.stringify(data))
  })
} 
