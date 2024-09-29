import { userModel } from "../models/userModels.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/tokenGenerate.js";
import generateSixDigitRandomNumber from "../utils/otpGenerator.js";
import { sendMail } from "../services/sendMails.js";
import dotenv from "dotenv";
dotenv.config();
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
    console.log("inside login controller");

    // console.log(req.body);

    const { email, password, role } = req.body;

    const checkUser = await userModel.findOne({ email }).exec();
    // console.log(checkUser);

    // if (!checkUser) {
    //   return res.status(400).json({ message: "User not found" });
    // }
    const check = await bcrypt.compare(password, checkUser.password);
    // if (!check) {
    //   return res.status(400).json({ message: "Wrong password" });
    // }

    if (!checkUser || !check || checkUser.role !== role) {
      return res
        .status(401)
        .json({ message: "User not found, Invalid credentials" });
    }

    //create token
    // console.log("token: ", generateToken(checkUser));
    const token = generateToken(checkUser);
    // console.log("token: ", token);

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
        sameSite: "strict",
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
    res
      .clearCookie("auth_token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({ message: "user logged out" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

//is user logged in

export async function isUserLoggedIn(req, res) {
  // console.log(req);
  res.json({ user: req.user });
}

export async function forgetPassword(req, res) {
  try {
    console.log("inside forget password");

    const { email } = req.body;
    console.log(email);

    const subject = "Forget and reset Password";

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else console.log("user found");

    console.log(process.env.EMAIL);
    console.log(process.env.EMAIL_PASSWORD);

    const otp = generateSixDigitRandomNumber();
    await sendMail(
      process.env.EMAIL,
      process.env.EMAIL_PASSWORD,
      email,
      subject,
      otp
    );
    console.log("send email in forget pass done");

    await updateOtp(user._id, otp);

    return res.status(200).json({ message: "Otp sent to your email" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
}

export async function verifyOtp(req, res) {
  const { email, otp } = req.body;
  const user = await userModel.findOne({ email: email });
  if (user.otp == otp) {
    return res.status(200).json({ message: "otp verified" });
  } else {
    return res.status(401).json({ message: "Invalid otp" });
  }
}

export async function updateOtp(userId, otp) {
  try {
    const validfor = Date.now() + 300000;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { otp: otp, validfor: validfor },
      { new: true, upsert: false }
    );
  } catch (err) {
    console.log(err);
  }
}

export async function changePassword(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true, upsert: false }
    );
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.log(err.message);
  }
}
