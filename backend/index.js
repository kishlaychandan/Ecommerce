import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import ecoRoutes from "./routes/ecomRoutes.js"
const PORT=process.env.PORT || 5000
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:"*"}))
app.use("/api",ecoRoutes)

try {
    // MongoDB URI with localhost (creates the DB automatically when data is inserted)
    await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")

    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
}
catch(err){
    console.log(err)
}

