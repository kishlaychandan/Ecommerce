import productModel from "../models/productModels.js";
import cloudinary from "cloudinary";
import { uploadToCloudinary } from "../services/cloudinaryUpload.js";
import dotenv from "dotenv";
import { userModel } from "../models/userModels.js";
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

        let url= await uploadToCloudinary(req);

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

export async function getAllProducts(req,res){
    // console.log("get all products");
    let query={};
    let sortArg={};
    if(req.query.brand){
        query.brand=req.query.brand;
    }

    if(req.query.category){
        query.category=req.query.category;
    }
    
    if(req.query.sortBy && req.query.sort){
        const sortField=req.query.sortBy;
        const sortOrder=req.query.sort.toLowerCase() === "asc" ? 1 : -1;
        sortArg[sortField]=sortOrder;
    }

    if(req.query.price){
        console.log("yes price founf");
        
        const priceOperator={
            "=": "$eq",
            ">": "$gt",
            "<": "$lt",
            ">=": "$gte",
            "<=": "$lte"
        };

        Object.keys(priceOperator).forEach((operator)=>{
            if(req.query.price.startsWith(operator)){
                query.price={
                    [priceOperator[operator]]:req.query.price.slice(operator.length),
                };
            }
        })

        console.log("query : ",query);   
    }

    if(req.query.name){
        query.name={$regex: req.query.name, $options: "i"}; //i: case insensitive
    }

    try{
        const products=await productModel.find(query).sort(sortArg);
        // console.log(products);
        
        res.status(200).json({products,message:"Products fetched successfully"});
    }
    catch(err){
        res.status(500).json({message:err.message});
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
    console.log("update product started");
    const { id } = req.params;
    console.log("id : ",id);
    let { name, brand, category, price, description, inStock, inventory } = req.body;

    if (!name || !brand || !category || !price || !description || !inStock || !inventory) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        console.log("inside try of updated prod");
        
        let updatedData = { name, brand, category, price, description, inStock, inventory };

        if (req.file) {
            const url = await uploadToCloudinary(req);
            updatedData.url = url;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export async function addToWishList(req,res){
    const {productId} =req.params;
    const userId=req.user._id;

    try{
        const user=req.user;
        const existingproduct= user.wishlist.find((id)=>id===productId);
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