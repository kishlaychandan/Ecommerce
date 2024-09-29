import jwt from "jsonwebtoken"
import "dotenv/config"
import { userModel } from "../models/userModels.js";

async function authMiddleware(req, res, next) {   
    try{
        // console.log(req.headers.authMiddleware);
        // console.log(req.cookies);
        // const token = req.headers.authMiddleware;
        console.log("inside auth middleware");
        
        const { auth_token }=req.cookies;
        // console.log("auth_token",auth_token);
        // console.log("cookies",req.cookies);
        
        const decodedToken = jwt.verify(auth_token, process.env.SECRET);
        // console.log("decodedToken",decodedToken);
    
        const loggedInUser=await userModel.findById(decodedToken.userId);
        if(!loggedInUser){
            return res.status(401).json({message:"user not found"});
        }
        req.user=loggedInUser;
        console.log("auth completed");
        
        next();
    }
    catch(err){ 
        res.status(401).json({message:"user not found"});
        // console.log(err.message);
    }
}
export default authMiddleware