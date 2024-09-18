import productModel from "../models/productModels.js"


export async function createProduct(req,res){
    try{
        let {name,brand,category,price,description,inStock,inventory,addedBy}=req.body
        if(!name || !brand || !category || !price || !description || !inStock || !inventory || !addedBy){
            return res.status(400).json({message:"All fields are required"})
        }
        const newProduct=await productModel.create({
            name,
            brand,
            category,
            price,
            description,
            inStock,
            inventory,
            addedBy
        });
        await newProduct.save();
        res.status(201).json({message:"Product created successfully"})
    }  
    catch(err){
        res.status(500).json({message:err.message})
    } 
}