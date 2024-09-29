import express from "express"
import {addToWishList, createProduct, deleteProduct, getAllProducts, updateProduct} from "../controllers/productControllers.js"
import upload from "../middlewares/upload.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import { createReview, deleteReview, getReviewsByProductId } from "../controllers/reviewControllers.js"
const productRouter=express.Router()

productRouter.get("/",(req,res)=>{
    res.status(200).send("hello world")
})    

productRouter.post("/",authMiddleware, upload.single("url"),createProduct)
productRouter.get("/getproduct",getAllProducts)
productRouter.delete("/deleteproduct/:id",authMiddleware,deleteProduct)
productRouter.put("/updateproduct/:id",authMiddleware,upload.single("url"),updateProduct)
productRouter.post("/addToWishList/:productId",authMiddleware,addToWishList)

productRouter.post("/review/:productId", authMiddleware, createReview);
productRouter.get('/review/:productId', getReviewsByProductId);
productRouter.delete('/review/:id', authMiddleware, deleteReview);
export default productRouter