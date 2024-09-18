import express from "express"
import {loginuser, logoutuser, registeruser} from "../controllers/userController.js"
const ecoRoutes=express.Router()

ecoRoutes.get("/",(req,res)=>{
    res.send("hello world")
})    
ecoRoutes.post("/user/register",registeruser)
ecoRoutes.post("/user/login",loginuser)
ecoRoutes.post("/user/logout",logoutuser)

export default ecoRoutes