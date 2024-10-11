import {Router} from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js";

const authRouter = Router()


authRouter.get("/me",authMiddleware,async(req,res)=>{
    console.log("auth completed");   
    console.log(req.user)
     try{
    res.json(req.user)}
    catch(err){
        console.log(err)
    }
})

authRouter.get("/admin",adminMiddleware,async(req,res)=>{
    console.log("auth completed");   
    console.log(req.user)
     try{
    res.json(req.user)}
    catch(err){
        console.log(err)
    }
})

export default authRouter