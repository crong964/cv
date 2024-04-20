
function paid(idbill: number, ser: string) {
    fetchPostUrl(`${window.location.origin}/orderbill/paid`, { idbill: idbill, ser: ser }, (data: any) => {
        alert(data.mess)
    })
}