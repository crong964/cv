function fetchGetUrl(url: string, cb: Function) {
  fetch(url, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => cb(data));
}

function fetchPostUrl(url: string, data: {}, cb: Function) {
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

function convertMoney(params: number | undefined) {
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
function formatDate(d: string | undefined) {
  if (!d) {
    return;
  }
  var p = new Date(d);
  return `${p.getDate()}-${
    p.getMonth() + 1
  }-${p.getFullYear()} ${p.getHours()}:${p.getMinutes()}:${p.getSeconds()}`;
}
function ket() {
  return confirm("bạn muốn thực hiện không")
}

