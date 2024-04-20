"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_sdk_maps_1 = __importDefault(require("@tomtom-international/web-sdk-maps"));
var map = undefined;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var s = yield latlng();
            if (s.err) {
                alert(s.mess);
            }
            else {
                map = web_sdk_maps_1.default.map({
                    container: 'map',
                    key: "NcCz24AQhyNMZ4h7LAudoLDGBatHcRnb",
                    center: s.mess,
                    zoom: 15
                });
                map.setMaxZoom(20);
                new web_sdk_maps_1.default.Marker().setLngLat(s.mess).addTo(map);
                new web_sdk_maps_1.default.Marker({ color: "#ff4040" }).setLngLat({ lat: 10.9080063, lng: 106.8848991 }).addTo(map);
                map.on("click", (e) => {
                    console.log({ lat: e.lngLat.lat, lng: e.lngLat.lng });
                });
                var track = new web_sdk_maps_1.default.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true,
                    },
                    trackUserLocation: true
                });
                auto();
                map.addControl(track);
            }
        }
        catch (error) {
        }
    });
}
function latlng() {
    return new Promise((res, rej) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((e) => {
                console.log({ lat: e.coords.latitude, lng: e.coords.longitude });
                console.log(e.coords.accuracy);
                var s = { err: false, mess: { lat: e.coords.latitude, lng: e.coords.longitude } };
                res(s);
            }, (e) => {
                res({ err: true, mess: e.message });
            }, { enableHighAccuracy: true, });
        }
    });
}
function auto() {
    return __awaiter(this, void 0, void 0, function* () {
        var c = yield latlng();
        var lng = document.getElementById('lng');
        var lat = document.getElementById('lat');
        console.log(c);
        lng.value = c.mess.lng;
        lat.value = c.mess.lat;
    });
}
init();
//106.8848991    10.9080063
