"use strict";
function fetchGetUrl(url, cb) {
    fetch(url, {
        method: "Get",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => cb(data));
}
function fetchPostUrl(url, data, cb) {
    fetch(url, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => cb(data));
}
function convertMoney(params) {
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
function removeActive() {
    document.querySelectorAll("#Menu").forEach((v) => {
        v.classList.remove("active");
    });
}
function formatDate(d) {
    if (!d) {
        return;
    }
    var p = new Date(d);
    return `${p.getDate()}-${p.getMonth() + 1}-${p.getFullYear()} ${p.getHours()}:${p.getMinutes()}:${p.getSeconds()}`;
}
function ket() {
    return confirm("bạn muốn thực hiện không");
}
var p = document.querySelectorAll(".M");
p.forEach((v) => {
    v.innerHTML = convertMoney(v.innerHTML.trim());
});
