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
exports.ip = void 0;
const express_1 = __importDefault(require("express"));
const dns_1 = __importDefault(require("dns"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const login_1 = __importDefault(require("./server/route/login"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_1 = __importDefault(require("./server/route/product"));
const childProduct_1 = __importDefault(require("./server/route/childProduct"));
const tempCart_1 = __importDefault(require("./server/route/tempCart"));
const importBill_1 = __importDefault(require("./server/route/importBill"));
const containImportBill_1 = __importDefault(require("./server/route/containImportBill"));
const importedBill_1 = __importDefault(require("./server/route/importedBill"));
const containImportedBill_1 = __importDefault(require("./server/route/containImportedBill"));
const category_1 = __importDefault(require("./server/route/category"));
const ProductController_1 = __importDefault(require("./controller/ProductController"));
const containImportBill_2 = __importDefault(require("./server/route/containImportBill"));
const product_2 = __importDefault(require("./client/route/product"));
const account_1 = __importDefault(require("./client/route/account"));
const childproduct_1 = __importDefault(require("./client/route/childproduct"));
const client_1 = require("./middleware/client");
const BigcategoryController_1 = __importDefault(require("./controller/BigcategoryController"));
const sercurity_1 = __importDefault(require("./lib/sercurity"));
const shoppingcart_1 = __importDefault(require("./client/route/shoppingcart"));
const orderbill_1 = __importDefault(require("./client/route/orderbill"));
const orderbill_2 = __importDefault(require("./server/route/orderbill"));
exports.ip = {
    address: "",
    path: __dirname,
};
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "server/page/")));
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "client/page/")));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({}));
app.get("/admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.cookies.id == undefined) {
        res.redirect("/login/");
        return;
    }
    var pa = path_1.default.join(__dirname, "/server/page/html/new_table-data-product.ejs");
    var list = yield ProductController_1.default.GetAllProduct();
    res.render(pa, { ip: exports.ip.address, list });
}));
app.get("/", (0, client_1.AuthorOrUnauthor)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var pa = path_1.default.join(__dirname, "/client/page/trangchu.ejs");
    var t = req.body;
    var listBigCate = yield BigcategoryController_1.default.GetAllBigcategory();
    var s = JSON.stringify(sercurity_1.default.CreateSign(14));
    var crt = Buffer.from(s).toString("base64url");
    res.render(pa, { ip: exports.ip.address, name: t.nameUserInSerVer, crt, listBigCate });
}));
app.use("/login", login_1.default);
app.use("/admin/product", product_1.default);
app.use("/admin/childProduct", childProduct_1.default);
app.use("/temPro", tempCart_1.default);
app.use("/admin/imPortBill", importBill_1.default);
app.use("/admin/importedBill", importedBill_1.default);
app.use("/admin/containImportBill", containImportBill_1.default);
app.use("/admin/containImportedBill", containImportedBill_1.default);
app.use("/admin/category", category_1.default);
app.use('/admin/orderbill', orderbill_2.default);
app.use("/test", containImportBill_2.default);
app.use("/product", product_2.default);
app.use("/account", account_1.default);
app.use("/childproduct", childproduct_1.default);
app.use("/shoppingcart", shoppingcart_1.default);
app.use('/orderbill', orderbill_1.default);
app.listen(1000, () => {
    dns_1.default.lookupService("127.0.0.1", 1000, (err, hostname, se) => __awaiter(void 0, void 0, void 0, function* () {
        dns_1.default.lookup(hostname, { family: 4 }, (err, add, family) => {
            exports.ip.address = `http://localhost:1000/`;
            console.log(exports.ip.address);
            console.log(`${exports.ip.address}admin`);
            console.log(`${exports.ip.address}account/ver`);
        });
    }));
});
exports.default = exports.ip;
