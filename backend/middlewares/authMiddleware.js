import jwt from "jsonwebtoken"
import "dotenv/config"
import { userModel } from "../models/userModels.js";

async function authMiddleware(req, res, next) {   
    try{
        console.log("auth middleware");
        

        const { auth_token }=req.cookies;
        const decodedToken = jwt.verify(auth_token, process.env.SECRET);
        // console.log("decodedToken",decodedToken);
    
        const loggedInUser=await userModel.findById(decodedToken.userId);
        if(!loggedInUser){

            return res.status(401).json({message:"user not found"});
        }
        if(loggedInUser.role=="user"){
            console.log("user role found");
        }
        if(loggedInUser.role!="user"){
            return res.status(401).json({message:"user role not found"});
        }

        req.user=loggedInUser;
        console.log(req.user);
        
        console.log("auth completed");
        
        next();
    }
    catch(err){ 
        res.status(401).json({message:"user not found"});
        // console.log(err.message);
    }
}
export default authMiddleware