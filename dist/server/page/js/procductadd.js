"use strict";
var tableChildpro = () => {
    let dataForm = document.getElementById("form");
    let form;
    if (dataForm) {
        form = new FormData(dataForm);
    }
    let bt1 = form === null || form === void 0 ? void 0 : form.get("bt1");
    let dsbt1 = form === null || form === void 0 ? void 0 : form.getAll("dsbt1[]");
    let bt2 = form === null || form === void 0 ? void 0 : form.get("bt2");
    let dsbt2 = form === null || form === void 0 ? void 0 : form.getAll("dsbt2[]");
    if (!bt1 && !dsbt1) {
        return;
    }
    var head = `
    <tr>
        <td>${bt1}</td>
        <td>${bt2}</td>
        <td>Giá nhập</td>
        <td>Giá bán</td>
    </tr>`;
    var body = ``;
    for (let i = 0; i < dsbt1.length; i++) {
        const element1 = dsbt1[i];
        for (let j = 0; j < dsbt2.length; j++) {
            const element2 = dsbt2[j];
            body += `<tr>
            <td>${element1} <input type="number" hidden value="${i}" name="v1[]"></td>
            <td>${element2} <input type="number" hidden value="${j}" name="v2[]"></td>
            <td> <input type="number" required name="dsPrice[]"></td>
            <td> <input type="number" required name="dsimportPrice[]"></td>
        </tr>`;
        }
    }
    head += body;
    var ta = document.querySelector(".table");
    ta.innerHTML = head;
};
var btmot = () => {
    var date = new Date().getTime();
    var bt1 = document.querySelector(".bt1");
    var div = document.createElement('div');
    div.classList.add("form-group", "mt-3", "d-flex", "flex-wrap", "align-items-center");
    div.id = "div" + date;
    var input = document.createElement("input");
    input.name = "dsbt1[]";
    input.onkeyup = tableChildpro;
    input.required = true;
    input.classList.add("form-control", "w-50", "mr-3");
    var label = document.createElement("label");
    label.setAttribute("for", "f" + date);
    var image = document.createElement("img");
    image.src = "http://localhost:1000/static/image/file.png";
    image.width = 60;
    image.id = "imagef" + date;
    var buttom = document.createElement("div");
    buttom.classList.add("btn", "btn-primary", "mx-3");
    buttom.innerText = "xóa";
    buttom.onclick = () => {
        removediv(div.id);
    };
    var input2 = document.createElement("input");
    input2.hidden = true;
    input2.name = "childimage";
    input2.id = "f" + date;
    input2.type = "file";
    input2.onchange = () => {
        preview(input2.id);
    };
    var input3 = document.createElement("input");
    input3.hidden = true;
    input3.name = "change";
    input3.value = "1";
    label.appendChild(image).appendChild(input2).appendChild(input3);
    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(buttom);
    bt1.appendChild(div);
};
var bthai = () => {
    var date = new Date().getTime();
    var bt2 = document.querySelector(".bt2");
    var div = document.createElement('div');
    div.classList.add("form-group", "mt-3", "d-flex", "align-items-center");
    div.id = "div" + date;
    var input = document.createElement("input");
    input.name = "dsbt2[]";
    input.onkeyup = tableChildpro;
    input.required = true;
    input.classList.add("form-control", "w-50");
    var buttom = document.createElement("div");
    buttom.classList.add("btn", "btn-primary", "mx-3");
    buttom.innerText = "xóa";
    buttom.onclick = () => {
        removediv(div.id);
    };
    div.appendChild(input);
    div.appendChild(buttom);
    bt2.appendChild(div);
};
var preview = (id) => {
    var fileReader = new FileReader;
    var file = document.getElementById(id);
    var chage = document.getElementById(`chage${id}`);
    if (chage) {
        chage.value = "1";
    }
    fileReader.onload = () => {
        var image = document.getElementById("image" + id);
        if (fileReader.result) {
            image.src = fileReader.result + "";
        }
    };
    if (file && file.files) {
        fileReader.readAsDataURL(file.files[0]);
    }
};
var removediv = (div) => {
    var _a;
    (_a = document.getElementById(div)) === null || _a === void 0 ? void 0 : _a.remove();
    tableChildpro();
};
