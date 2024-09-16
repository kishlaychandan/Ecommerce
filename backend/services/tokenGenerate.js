import jwt from "jsonwebtoken"
import "dotenv/config"
import {generateCrypto} from "../utils/generateRandomCrypto.js"
export function generateToken(){
    return jwt.sign(
        {
            admin_token:generateCrypto,
        },
        process.env.SECRET,
        {expiresIn:"1d"}
    )
}