import jwt from "jsonwebtoken"
import "dotenv/config"
import {generateCrypto} from "../utils/generateRandomCrypto.js"
export function generateToken(user){
    return jwt.sign(
        {
            userId:user._id,
            userEmail:user.email,
            isVerfied:true,
        },
        process.env.SECRET,
        {expiresIn:"1h"}
    )
}