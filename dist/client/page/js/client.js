"use strict";
function paid(idbill, ser) {
    fetchPostUrl(`${window.location.origin}/orderbill/paid`, { idbill: idbill, ser: ser }, (data) => {
        alert(data.mess);
    });
}
