import { userModel } from "../models/userModels.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/tokenGenerate.js";

//register
export async function registeruser(req, res) {
  try {
    let { firstName, lastName, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    password = hashedPassword;
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
  }
}

//login
export async function loginuser(req, res) {
  try {
    const { email, password } = req.body;

    const checkUser = await userModel.findOne({ email }).exec();
    // console.log(checkUser);

    if (!checkUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const check = await bcrypt.compare(password, checkUser.password);
    if (!check) {
      return res.status(400).json({ message: "Wrong password" });
    }

    //create token
    // console.log("token: ", generateToken(checkUser));
    const token = generateToken(checkUser);
    //login user in

    //how to send token to frontend
    //1. sending token in response body , saving it in localstorage in frontend   X
    // res.status(200).json({
    //   message:"login successful",
    //   token
    // })

    //2. sending token as a server only cookie : esecuring it from Xss attack (cross site scripting attack)
    res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: false, //now we working on localhost, http not on https
        sameSite: "none",
        maxAge: 3600000,
      })
      .status(200)
      .json({
        message: "login successful",
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

//logout
export async function logoutuser(req, res) {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    res.status(200).json({ message: "user logged out" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
