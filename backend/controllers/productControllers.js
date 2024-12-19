import productModel from "../models/productModels.js";
import cloudinary from "cloudinary";
import { uploadToCloudinary } from "../services/cloudinaryUpload.js";
import dotenv from "dotenv";
import { userModel } from "../models/userModels.js";
import mongoose from "mongoose";
dotenv.config();


export async function createProduct(req,res){
    try{
        console.log("inside create product controller");
        let {name,brand,category,price,description,inStock,inventory}=req.body
        // console.log(name,brand,category,price,description,inStock,inventory);
        
        if(!name || !brand || !category || !price || !description || !inStock || !inventory ){
            console.log("all fields are required");
            return res.status(400).json({message:"All fields are required"})   
        }
        else{
            console.log("all fields are correctm now moving to cloudinary...");
        }

        let url= await uploadToCloudinary(req.file);

        console.log("uploaded to cloudinary done");
        
        const newProduct=await productModel.create({
            name,
            url,
            brand,
            category,
            price,
            description,
            inStock,
            inventory,
            addedBy: req.user._id
        });

        await newProduct.save();
        console.log("new product created");
        
        res.status(201).json({message:"Product created successfully"});
    }  
    catch(err){
        res.status(500).json({message:err.message});
    } 
}

export async function getAllProducts(req, res) {
    console.log("calling get all products");
    
    let query = {};
    let sortArg = {};

    // Filtering by brand
    if (req.query.brand) {
        query.brand = req.query.brand;
    }

    // Filtering by category
    if (req.query.category) {
        query.category = { $regex: `^.*${req.query.category}.*$`, $options: 'i' }; // Match substring and case-insensitive
    }
    

    if (req.query.rating) {
        const ratingValue = Number(req.query.rating); // Ensure it's a number
        if (!isNaN(ratingValue)) {
            console.log("Rating value:", ratingValue);
            query.totalRatings = { $gte: ratingValue }; // Compare as a number
        } else {
            console.log("Invalid rating value:", ratingValue);
            return res.status(400).json({ message: "Invalid rating value" });
        }
    }
    // if (req.query.rating) {
    //     query.rating = { $gte: req.query.rating };
    // }

    // Filtering by price
    if (req.query.priceMin || req.query.priceMax) {
        query.price = {};
        if (req.query.priceMin) {
            query.price.$gte = parseFloat(req.query.priceMin);
        }
        if (req.query.priceMax) {
            query.price.$lte = parseFloat(req.query.priceMax);
        }
    }
    if (req.query.name) {
        query.name = { $regex: req.query.name, $options: 'i' };  // Case-insensitive search
    }
    if (req.query.sortBy && req.query.sort) {
        const sortField = req.query.sortBy;
        const sortOrder = req.query.sort.toLowerCase() === "asc" ? 1 : -1;
        sortArg[sortField] = sortOrder;
    }

    try {
        console.log("query: ", query);
        
        const products = await productModel.find(query).sort(sortArg);
        // db.products.find({ totalRatings: { $gte: 2 } }).pretty();

        console.log("products", products);
        res.status(200).json({ products, message: "Products fetched successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export async function getSingleProduct(req, res) {
    console.log("get single product ###############################################################################");
    
    const { id } = req.params;
    console.log("id", id);
    
    // Check if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    else{
        console.log("type is valid");
    }
  
    console.log("params id", id);
    
    try {
      const product = await productModel.findById(id);
      
      if (!product) {
        // If no product is found with the given id, return 404
        console.log("product not found");
        return res.status(404).json({ message: "Product not found" });
      }
      else{
          console.log("product found");
      }
      
      console.log("product", product);
      res.status(200).json({ product, message: "Product fetched successfully" });
    } catch (err) {
      // Handle any other errors
      console.error("Error fetching product", err);
      res.status(500).json({ message: err.message });
    }
  }

export async function deleteProduct(req,res){
    console.log("delete product");
    console.log(req.params.id);

    try{
        const product=await productModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Product deleted successfully"});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }   
}


export async function updateProduct(req, res) {
    console.log("Update product started");
    const { id } = req.params;
    console.log("Product ID: ", id);

    let { name, brand, category, price, description, inStock, inventory } = req.body;

    // Ensure all fields are provided
    if (!name || !brand || !category || !price || !description || !inStock || !inventory) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        console.log("Inside try block for updating product");

        // Prepare the updated data object
        let updatedData = { name, brand, category, price, description, inStock, inventory };

        // If a new file is uploaded, update the image URL
        if (req.file) {
            console.log("File found, uploading to Cloudinary...");
            const url = await uploadToCloudinary(req.file);
            updatedData.url = url;
        }

        // Find and update the product
        const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProduct) {
            console.error("Product not found");
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("Product updated successfully");
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: err.message });
    }
}



export async function addToWishList(req,res){
    const {productId} =req.params;
    const userId=req.user._id;

    productId=mongoose.Types.ObjectId(productId)
    try{
        const user=req.user;
        const existingproduct= user.wishlist.find((id)=>id.equals(productId));
        let updatedUser;

        if(!existingproduct){
            updatedUser = await userModel.findByIdAndUpdate(
                userId,
                {$push:{wishlist:productId}},
                {new:true} // technically: upsert , create if not exist
            )

        }
        else{
            updatedUser = await userModel.findByIdAndUpdate(userId,{$pull:{wishlist:productId}});
        }

        res.json(updatedUser);

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

export async function addRating(req,res) {
    let {starRating, comment, productId} = req.body;
    const userId = req.user._id;

    // productId=new mongoose.Types.ObjectId(productId)

    const product=await productModel.findById(productId);

    const alreadyRated=product.ratings.find((ratingObj)=>ratingObj.postedBy.toString()===userId.toString());
    try{
        let updatedProduct;
    
    if(alreadyRated){
        updatedProduct=await productModel.findOneAndUpdate(
            {_id:productId, "ratings.postedBy":userId},
            {
                $set:{
                    "ratings.$.comment":comment,
                    "ratings.$.star":starRating
                }
            } ,
            {new:true}           
        )
    }
    else{
        updateProduct=await productModel.findByIdAndUpdate(productId,{
            $push:{
                ratings:{
                    star:starRating,
                    comment:comment,
                    postedBy:userId
                }
            }
        },{new:true});
    }

    //recalculate total rating

    const totalRatings=updateProduct.ratings.length;
    const totalStars=updateProduct.ratings.reduce((acc,curr)=>acc+curr.star,0);
    const averageRating=totalStars/totalRatings;

    const finalProduct=await productModel.findByIdAndUpdate(productId,{
        totalRatings:averageRating.toFixed(1),
    },{new:true})

    res.json(finalProduct);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}