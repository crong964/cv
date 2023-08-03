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
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const lib_1 = require("../../lib/lib");
const ProductController_1 = __importDefault(require("../../controller/ProductController"));
const ChildProductController_1 = __importDefault(require("../../controller/ChildProductController"));
const admin_1 = __importDefault(require("../../admin"));
const multer_1 = __importDefault(require("multer"));
const SmallcategoryControllder_1 = __importDefault(require("../../controller/SmallcategoryControllder"));
const BigcategoryController_1 = __importDefault(require("../../controller/BigcategoryController"));
const promises_1 = require("fs/promises");
const win32_1 = require("path/win32");
const ProductController_2 = __importDefault(require("../../controller/ProductController"));
const promises_2 = require("fs/promises");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, admin_1.default.path + "/public/imageProduct");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    cb(null, true);
};
const upload = (0, multer_1.default)({ storage: storage, fileFilter }).
    fields([{ name: "image", maxCount: 1 }, { name: "childimage" }]);
const product = (0, express_1.Router)();
product.use(lib_1.vali);
product.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var list = yield ProductController_1.default.GetAllProduct();
    res.json(list);
}));
product.get("/productadd", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var list = yield Promise.all([SmallcategoryControllder_1.default.GetAllSmallcategory(),
        BigcategoryController_1.default.GetAllBigcategory()]);
    res.render(path_1.default.join(admin_1.default.path, "server/page/html/product/productadd.ejs"), { ip: admin_1.default.address, list: list });
}));
product.post("/productadd", upload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var post = req.body;
    console.log(req.body);
    var files = req.files;
    var listFile = [];
    var childFiles = files["childimage"];
    for (let i = 0; i < childFiles.length; i++) {
        const element = childFiles[i];
        listFile.push(element.filename);
    }
    var idProduct = 0;
    var bt = {
        bt1: post.bt1,
        bt2: post.bt2,
        dsbt1: post.dsbt1,
        dsbt2: post.dsbt2,
        listFile: listFile
    };
    if (req.files) {
        idProduct = yield ProductController_1.default.AddProduct(post.namePro, post.Price, post.ImportPrice, post.idBigCategory, post.idSmallCategory, files["image"][0].filename, JSON.stringify(bt));
    }
    var ls = post.v1.map((v1, i) => __awaiter(void 0, void 0, void 0, function* () {
        let in1 = parseInt(v1);
        let in2 = parseInt(post.v2[i]);
        let bt1 = post.dsbt1[in1];
        let bt2 = post.dsbt2[in2] ? post.dsbt2[in2] : "";
        let idChildProduct = `${idProduct}-${in1}`;
        if (post.dsbt2.length > 0) {
            idChildProduct += `-${in2}`;
        }
        let nameChildProduct = yield ChildProductController_1.default.AddChildProduct(idChildProduct, idProduct + "", post.namePro + " " + bt2 + " " + bt1, post.dsimportPrice[i] + "", post.dsPrice[i] + "", files["childimage"][in1].filename);
        return nameChildProduct;
    }));
    var checkls = yield Promise.all(ls);
    res.redirect(`${admin_1.default.address}admin/product/productadd`);
}));
product.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    var id = req.body.id;
    var check, listcheck;
    var list = yield Promise.all([ProductController_1.default.GetProduct(id), ChildProductController_1.default.GetAllChildProductByIdProduct(id)]);
    var amount = (_a = list[0]) === null || _a === void 0 ? void 0 : _a.amount;
    if (amount != undefined && amount <= 0) {
        check = yield ProductController_1.default.DeleteProduct(id);
    }
    if (check && (check === null || check === void 0 ? void 0 : check.affectedRows) > 0) {
        var pathMainImage = (_b = list[0]) === null || _b === void 0 ? void 0 : _b.image;
        if (pathMainImage) {
            var removingList = list[1].map((v) => __awaiter(void 0, void 0, void 0, function* () {
                var pathImage = v.image;
                if (pathImage) {
                    try {
                        var paSrc = (0, win32_1.join)(admin_1.default.path, "/public/imageProduct", pathImage);
                        var paDest = (0, win32_1.join)(admin_1.default.path, "/deleteFile", pathImage);
                        yield (0, promises_2.copyFile)(paSrc, paDest);
                        yield (0, promises_1.unlink)(paSrc);
                    }
                    catch (error) {
                    }
                    return true;
                }
            }));
            listcheck = yield Promise.all([(0, promises_1.unlink)(path_1.default.join(admin_1.default.path, "/public/imageProduct", pathMainImage)),
                removingList]);
        }
    }
    res.redirect(`${admin_1.default.address}admin`);
}));
product.get("/edit/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    if (req.params.id == undefined) {
        res.redirect(admin_1.default.address);
        return;
    }
    var id = parseInt(req.params.id);
    var list = yield Promise.all([
        ProductController_1.default.GetProduct(id),
        ChildProductController_1.default.GetAllChildProductByIdProduct(id),
        BigcategoryController_1.default.GetAllBigcategory(),
        SmallcategoryControllder_1.default.GetAllSmallcategory()
    ]);
    var bt = (_c = list[0]) === null || _c === void 0 ? void 0 : _c.bt;
    bt = JSON.parse(bt);
    var childProduct = {};
    for (let i = 0; i < list[1].length; i++) {
        const element = list[1][i];
        if (element.idChildProduct != undefined) {
            childProduct[element.idChildProduct] = element;
        }
    }
    var pa = (0, win32_1.join)(admin_1.default.path, "/server/page/html/product/productedit.ejs");
    res.render(pa, {
        ip: admin_1.default.address,
        childProduct: childProduct,
        product: list[0],
        list: list, bt: bt
    });
}));
product.post("/edit", upload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var files = req.files;
    var post = req.body;
    var idProduct = req.body.idProduct;
    var change = req.body.change;
    var image = undefined;
    var childimage = undefined;
    if ((files === null || files === void 0 ? void 0 : files.image) && files["image"][0]) {
        image = files["image"][0];
    }
    if ((files === null || files === void 0 ? void 0 : files.childimage) && files["childimage"]) {
        childimage = files["childimage"];
    }
    var product = yield ProductController_2.default.GetProduct(req.body.idProduct);
    var check;
    var oldbt;
    if (product === null || product === void 0 ? void 0 : product.bt) {
        oldbt = JSON.parse(product === null || product === void 0 ? void 0 : product.bt);
    }
    else {
        res.end();
        return;
    }
    var newlist = [];
    for (let i = 0; i < oldbt.listFile.length; i++) {
        const element = oldbt.listFile[i];
        newlist.push(element);
    }
    if (childimage) {
        var indeximage = 0;
        for (let i = 0; i < change.length; i++) { //thay đổi ảnh con của sản phầm
            const element = change[i];
            if (element == "1") {
                if (newlist.length > i) {
                    newlist[i] = childimage[indeximage].filename;
                    try {
                        var paSrc = (0, win32_1.join)(admin_1.default.path, "/public/imageProduct", oldbt.listFile[i]);
                        var paDest = (0, win32_1.join)(admin_1.default.path, "/deleteFile", oldbt.listFile[i]);
                        yield (0, promises_2.copyFile)(paSrc, paDest);
                        yield (0, promises_1.unlink)(paSrc);
                    }
                    catch (error) {
                        console.log(__dirname);
                        console.log(error);
                    }
                }
                else {
                    newlist.push(childimage[indeximage].filename);
                }
                indeximage += 1;
            }
        }
    }
    var newbt = {
        bt1: post.bt1,
        bt2: post.bt2,
        dsbt1: post.dsbt1,
        dsbt2: post.dsbt2,
        listFile: newlist
    };
    if ((product === null || product === void 0 ? void 0 : product.bt) && product.image) { //thay đổi ảnh chính của sản phẩm
        if (image != undefined) {
            check = yield ProductController_2.default.UpdateProduct(req.body.idProduct, post.namePro, post.Price, post.ImportPrice, post.idBigCategory, post.idSmallCategory, image.filename, JSON.stringify(newbt));
            if ((check === null || check === void 0 ? void 0 : check.affectedRows) && check.affectedRows > 0) {
                try {
                    var paSrc = (0, win32_1.join)(admin_1.default.path, "/public/imageProduct", product.image);
                    var paDest = (0, win32_1.join)(admin_1.default.path, "/deleteFile", product.image);
                    yield (0, promises_2.copyFile)(paSrc, paDest);
                    yield (0, promises_1.unlink)(paSrc);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        else {
            check = yield ProductController_2.default.UpdateProduct(req.body.idProduct, post.namePro, post.Price, post.ImportPrice, post.idBigCategory, post.idSmallCategory, product.image, JSON.stringify(newbt));
        }
    }
    var listipdate = post.v1.map((v, i) => __awaiter(void 0, void 0, void 0, function* () {
        let in1 = parseInt(post.v1[i]);
        let in2 = parseInt(post.v2[i]);
        let bt1 = post.dsbt1[in1];
        let bt2 = post.dsbt2[in2] ? post.dsbt2[in2] : "";
        let idChildProduct = `${idProduct}-${in1}`;
        var check;
        if (post.dsbt2.length > 0) {
            idChildProduct += `-${in2}`;
        }
        if (yield ChildProductController_1.default.Has(idChildProduct)) {
            check = yield ChildProductController_1.default.UpdateChildProduct(idChildProduct, post.namePro + " " + bt2 + " " + bt1, post.dsimportPrice[i], post.dsPrice[i], newlist[in1]);
        }
        else {
            check =
                yield ChildProductController_1.default.AddChildProduct(idChildProduct, idProduct + "", post.namePro + " " + bt2 + " " + bt1, post.dsimportPrice[i], post.dsPrice[i], newlist[in1]);
        }
        return check === null || check === void 0 ? void 0 : check.affectedRows;
    }));
    var lst = yield Promise.all(listipdate);
    for (let i = 0; i < lst.length; i++) {
        const element = lst[i];
        if (!element) {
            console.log("lỗi");
            res.redirect(admin_1.default.address);
            return;
        }
    }
    res.redirect(`${admin_1.default.address}admin/product/edit/${idProduct}`);
}));
exports.default = product;
