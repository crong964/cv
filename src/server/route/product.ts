import { Router, Request, Response, NextFunction } from "express";
import path from "path";
import { err, vali } from "../../lib/lib";
import productController from "../../controller/ProductController";
import childProductController from "../../controller/ChildProductController";
import ip from "../../admin";
import multer from "multer";
import smallcategoryControllder from "../../controller/SmallcategoryControllder";
import bigcategoryController from "../../controller/BigcategoryController";
import { unlink } from "fs/promises";
import { join } from "path/win32";
import ProductController from "../../controller/ProductController";
import { copyFile } from "fs/promises";
import { ResultSetHeader } from "mysql2";

interface post {
  namePro: string
  Price: string
  ImportPrice: string
  idBigCategory: string
  idSmallCategory: string
  bt1: string
  dsbt1: string[]
  bt2: string
  dsbt2: string[]
  v1: string[]
  v2: string[]
  dsPrice: string[]
  dsimportPrice: string[]
}

export interface bt {
  bt1: string;
  bt2: string;
  dsbt1: string[];
  dsbt2: string[];
  listFile: string[];
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ip.path + "/public/imageProduct");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  }
});
const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  cb(null, true)
}
const upload = multer({ storage: storage, fileFilter }).
  fields([{ name: "image", maxCount: 1 }, { name: "childimage" }]);

const product = Router();

product.use(vali);

product.get("/", async (req: Request, res: Response) => {
  var list = await productController.GetAllProduct();
  res.json(list);
});
product.get("/productadd", async (req: Request, res: Response) => {
  var list = await Promise.all([smallcategoryControllder.GetAllSmallcategory(),
  bigcategoryController.GetAllBigcategory()])

  res.render(path.join(ip.path, "server/page/html/product/productadd.ejs"), { ip: ip.address, list: list })
});
product.post("/productadd", upload, async (req: Request, res: Response) => {
  var post: post = req.body

  var files: any = req.files

  var listFile: string[] = []


  var childFiles: Express.Multer.File[] = files["childimage"]
  var avatar: Express.Multer.File = files['image'][0]
  for (let i = 0; i < childFiles.length; i++) {
    const element = childFiles[i];
    listFile.push(element.filename)
  }


  var idProduct: ResultSetHeader | undefined;
  var bt: bt = {
    bt1: post.bt1,
    bt2: post.bt2,
    dsbt1: post.dsbt1,
    dsbt2: post.dsbt2,
    listFile: listFile
  }
  if (avatar) {
    idProduct = await productController.AddProduct(post.namePro,
      post.Price,
      post.ImportPrice,
      post.idBigCategory,
      post.idSmallCategory,
      files["image"][0].filename,
      JSON.stringify(bt))
  }
  else {
    for (let i = 0; i < childFiles.length; i++) {
      const element = childFiles[i];
      try {
        var paSrc = join(ip.path, "/public/imageProduct", element.filename)
        var paDest = join(ip.path, "/deleteFile", element.filename)
        await copyFile(paSrc, paDest)
        await unlink(paSrc)
      } catch (error) {
        err('C:/Users/PC/Documents/code/doan/src/server/route/product.ts', error)
      }
    }

    res.redirect(`${ip.address}admin/product/productadd`);
    return
  }



  var ls = post.v1.map(async (v1: string, i: number) => {
    let in1 = parseInt(v1)
    let in2 = parseInt(post.v2[i]);
    let bt1 = post.dsbt1[in1]
    let bt2 = post.dsbt2[in2] || "";
    let idChildProduct = `${idProduct?.insertId}-${in1}`

    if (post.dsbt2.length > 0) {
      idChildProduct += `-${in2}`
    }
    let nameChildProduct =
      await childProductController.AddChildProduct(idChildProduct, idProduct?.insertId + "",
        post.namePro + " " + bt2 + " " + bt1,
        post.dsimportPrice[i] + "",
        post.dsPrice[i] + "",
        files["childimage"][in1].filename)

    if (nameChildProduct == undefined) {
      var paSrc = join(ip.path, "/public/imageProduct", files["childimage"][in1].filename)
      var paDest = join(ip.path, "/deleteFile", files["childimage"][in1].filename)
      await copyFile(paSrc, paDest)
      await unlink(paSrc)
    }
    return nameChildProduct
  })

  var checkls = await Promise.all(ls)
  checkls.forEach((v) => {
    if (v == undefined) {
      console.log('có lỗi insert ');
      
    }
  })


  res.redirect(`${ip.address}admin/product/productadd`);
}
);
product.post("/delete", async (req, res) => {
  var id = req.body.id
  var check, listcheck



  var list = await Promise.all([productController.GetProduct(id), childProductController.GetAllChildProductByIdProduct(id)])
  var amount = list[0]?.amount
  if (amount != undefined && amount <= 0) {

    check = await productController.DeleteProduct(id)
  }
  if (check && check?.affectedRows > 0) {
    var pathMainImage = list[0]?.image
    if (pathMainImage) {
      var removingList = list[1].map(async (v) => {
        var pathImage = v.image
        if (pathImage) {
          try {
            var paSrc = join(ip.path, "/public/imageProduct", pathImage)
            var paDest = join(ip.path, "/deleteFile", pathImage)
            await copyFile(paSrc, paDest)
            await unlink(paSrc)
          } catch (error) {

          }
          return true
        }
      })
      listcheck = await Promise.all(
        [unlink(path.join(ip.path, "/public/imageProduct", pathMainImage)),
          removingList])
    }

  }

  res.redirect(`${ip.address}admin`)
})

product.get("/edit/:id", async (req: Request, res: Response) => {
  if (req.params.id == undefined) {
    res.redirect(ip.address)
    return
  }
  var id = parseInt(req.params.id)

  var list = await Promise.all([
    productController.GetProduct(id),
    childProductController.GetAllChildProductByIdProduct(id),
    bigcategoryController.GetAllBigcategory(),
    smallcategoryControllder.GetAllSmallcategory()])

  var bt: any = list[0]?.bt


  bt = JSON.parse(bt)

  var childProduct: any = {}
  for (let i = 0; i < list[1].length; i++) {
    const element = list[1][i];
    if (element.idChildProduct != undefined) {
      childProduct[element.idChildProduct] = element
    }
  }
  var pa = join(ip.path, "/server/page/html/product/productedit.ejs")
  res.render(pa, {
    ip: ip.address,
    childProduct: childProduct,
    product: list[0],
    list: list, bt: bt
  })
})
product.post("/edit", upload, async (req, res) => {
  var files: any = req.files
  var post: post = req.body
  var idProduct = req.body.idProduct
  var change: string[] = req.body.change
  var image: Express.Multer.File | undefined = undefined
  var childimage: Express.Multer.File[] | undefined = undefined

  if (files?.image && files["image"][0]) {
    image = files["image"][0]
  }
  if (files?.childimage && files["childimage"]) {
    childimage = files["childimage"]
  }
  var product = await ProductController.GetProduct(req.body.idProduct)
  var check

  var oldbt: bt
  if (product?.bt) {
    oldbt = JSON.parse(product?.bt)
  }
  else {
    res.end()
    return
  }
  var newlist: string[] = []
  for (let i = 0; i < oldbt.listFile.length; i++) {
    const element = oldbt.listFile[i];
    newlist.push(element)
  }
  if (childimage) {
    var indeximage = 0;
    for (let i = 0; i < change.length; i++) { //thay đổi ảnh con của sản phầm
      const element = change[i];
      if (element == "1") {
        if (newlist.length > i) {
          newlist[i] = childimage[indeximage].filename
          try {
            var paSrc = join(ip.path, "/public/imageProduct", oldbt.listFile[i])
            var paDest = join(ip.path, "/deleteFile", oldbt.listFile[i])
            await copyFile(paSrc, paDest)
            await unlink(paSrc)
          } catch (error) {
            console.log(__dirname);
            console.log(error);
          }
        }
        else {
          newlist.push(childimage[indeximage].filename)
        }
        indeximage += 1;
      }
    }
  }
  var newbt: bt = {
    bt1: post.bt1,
    bt2: post.bt2,
    dsbt1: post.dsbt1,
    dsbt2: post.dsbt2,
    listFile: newlist
  }

  if (product?.bt && product.image) {//thay đổi ảnh chính của sản phẩm
    if (image != undefined) {
      check = await ProductController.UpdateProduct(
        req.body.idProduct,
        post.namePro,
        post.Price, post.ImportPrice,
        post.idBigCategory,
        post.idSmallCategory, image.filename, JSON.stringify(newbt)
      )
      if (check?.affectedRows && check.affectedRows > 0) {
        try {
          var paSrc = join(ip.path, "/public/imageProduct", product.image)
          var paDest = join(ip.path, "/deleteFile", product.image)
          await copyFile(paSrc, paDest)
          await unlink(paSrc)
        } catch (error) {
          console.log(error);
        }
      }
    }
    else {
      check = await ProductController.UpdateProduct(
        req.body.idProduct,
        post.namePro,
        post.Price, post.ImportPrice,
        post.idBigCategory,
        post.idSmallCategory, product.image, JSON.stringify(newbt)
      )
    }
  }

  var listipdate = post.v1.map(async (v, i) => {
    let in1 = parseInt(post.v1[i])
    let in2 = parseInt(post.v2[i]);
    let bt1 = post.dsbt1[in1]
    let bt2 = post.dsbt2[in2] ? post.dsbt2[in2] : "";
    let idChildProduct = `${idProduct}-${in1}`
    var check
    if (post.dsbt2.length > 0) {
      idChildProduct += `-${in2}`
    }
    if (await childProductController.Has(idChildProduct)) {
      check = await childProductController.UpdateChildProduct(
        idChildProduct, post.namePro + " " + bt2 + " " + bt1,
        post.dsimportPrice[i], post.dsPrice[i], newlist[in1])
    }
    else {
      check =
        await childProductController.AddChildProduct(idChildProduct, idProduct + "",
          post.namePro + " " + bt2 + " " + bt1,
          post.dsimportPrice[i],
          post.dsPrice[i],
          newlist[in1])
    }
    return check?.affectedRows
  })
  var lst = await Promise.all(listipdate)
  for (let i = 0; i < lst.length; i++) {
    const element = lst[i];
    if (!element) {
      console.log("lỗi");
      res.redirect(ip.address)
      return
    }
  }

  res.redirect(`${ip.address}admin/product/edit/${idProduct}`)
})
export default product;
