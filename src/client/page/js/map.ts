import tt from "@tomtom-international/web-sdk-maps";
interface ll {
    err: boolean,
    mess: any
}
var map: tt.Map | undefined = undefined
async function init() {
    try {
        var s: ll = await latlng() as ll
        if (s.err) {
            alert(s.mess)
        } else {

            map = tt.map({
                container: 'map',
                key: "NcCz24AQhyNMZ4h7LAudoLDGBatHcRnb",
                center: s.mess,
                zoom: 15
            })
            map.setMaxZoom(20)

            new tt.Marker().setLngLat(s.mess).addTo(map)

            new tt.Marker({color:"#ff4040"}).setLngLat({ lat: 10.9080063, lng: 106.8848991 }).addTo(map)

            map.on("click", (e) => {
                console.log({ lat: e.lngLat.lat, lng: e.lngLat.lng });
            })
            var track = new tt.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,

                },
                trackUserLocation: true
            })
            auto()
            map.addControl(track)

        }
    } catch (error) {

    }
}

function latlng() {
    return new Promise((res, rej) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((e) => {
                console.log({ lat: e.coords.latitude, lng: e.coords.longitude });
                console.log(e.coords.accuracy);

                var s: ll = { err: false, mess: { lat: e.coords.latitude, lng: e.coords.longitude } }
                res(s)
            }, (e) => {
                res({ err: true, mess: e.message })
            }, { enableHighAccuracy: true, });
        }
    })
}
async function auto() {
    var c = await latlng() as any
    var lng = document.getElementById('lng') as HTMLInputElement
    var lat = document.getElementById('lat') as HTMLInputElement
    console.log(c);

    lng.value = c.mess.lng
    lat.value = c.mess.lat
}
init()
//106.8848991    10.9080063