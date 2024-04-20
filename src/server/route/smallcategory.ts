import { Router } from "express";
import { verifi_post } from "../../middleware/client";
import ip from "../../admin";
import SmallcategoryControllder from "../../controller/SmallcategoryControllder";


const smallcategory = Router()
interface post {
    idSmallCategory: string
    nameSmallCategory: string
}


smallcategory.post("/update", verifi_post({ lenght: 14, va: "srt" }), async (req, res) => {
    var post: post = req.body
    var check = await SmallcategoryControllder.UpdateSmallcategory(post.idSmallCategory, post.nameSmallCategory)

    res.redirect(`${ip.address}admin/category`)
})


export default smallcategory