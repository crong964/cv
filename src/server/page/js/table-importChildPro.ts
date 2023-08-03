interface importChildPro {
  idChildProduct: string;
  idImportBill: string;
  amount: number;
  importPrice: number;
  importedAmount: number;
  nameChildProduct: string;
  image: string;
}

function computeTotalMoney(money: number, id: number, s: any) {
  var element = s as HTMLInputElement;
  var cellID = document.getElementById(id + "") as HTMLElement;
  cellID.innerHTML = convertMoney(money * parseInt(element.value)) + "";
}
interface childpro {
  idChildPro: string;
  importQuantity: number;
}
interface data {
  idImportBill: string;
  idImportedBill: string;
  list: childpro[];
}
function importChildPro() {
  var fromFletch = document.getElementById("fromFletch") as HTMLFormElement;
  var data = new FormData(fromFletch);
  var datapost: data = {
    idImportBill: "",
    idImportedBill: "",
    list: [],
  };
  var idImportBill = data.get("idImportBill") as string;
  var idImportedBill = data.get("idImportedBill") as string;
  var importQuantityls = data.getAll("importQuantity");
  var idChildProductls = data.getAll("idChildProduct");

  if (idImportBill && idImportedBill) {
    datapost.idImportBill = idImportBill;
    datapost.idImportedBill = idImportedBill;
  }
  var list = idChildProductls
    .map((v, id) => {
      var idChildPro = v as string;
      var importQuantity = parseInt(importQuantityls[id] as string);
      var childpro: childpro = {
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

  fetchPostUrl("http://localhost:1000/admin/importedBill/addNewImportedBill", datapost, (data: any) => {
    alert(JSON.stringify(data));
    location.reload()
  });
}
interface ImportedBill {
  idImportedBill: string | undefined;
  createdDay: string | undefined;
  idForUser: number | undefined;
  idImportBill: string | undefined;
}


interface importedChildProTable {
  data: any;
  id: string;
}

interface ImportedChildPro {
  idChildProduct: string;
  amount: number;
  importPrice: number;
  importedAmount: number;
  nameChildProduct: string;
  image: string;
}


interface ls {
  bill: any
  listImportChildPro: importChildPro[];
  listImportedBill: ImportedBill[];
}


