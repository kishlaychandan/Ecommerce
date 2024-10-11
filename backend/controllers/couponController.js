// import mongoose from "mongoose";
// import couponModel from "../models/couponModel.js";
// export async function createCoupon(req, res) {
//   try {
//     const {
//       code,
//       discount,
//       isPercentage,
//       expiryDate,
//       isActive,
//       applicableProducts,
//       minimumPurchaseAmount,
//       usageLimit,
//       usedCount,
//     } = req.body;
//     // Convert code to uppercase
//     const upperCaseCode = code.toUpperCase();
//     // Check if a coupon with the same code already exists
//     const existingCoupon = await couponModel.findOne({ code: upperCaseCode });
//     if (existingCoupon)
//       return res
//         .status(400)
//         .json({ error: "A coupon with this code already exists" });
//     const coupon = new couponModel({
//       code: upperCaseCode,
//       discount,
//       isPercentage,
//       expiryDate,
//       isActive,
//       applicableProducts,
//       minimumPurchaseAmount,
//       usageLimit,
//       usedCount,
//     });
//     const createdCoupon = await coupon.save();
//     res.status(201).json(createdCoupon);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }
// export async function listCoupons(req, res) {
//   const coupons = await couponModel.find({}).sort({ createdAt: -1 });
//   res.json(coupons);
// }
// export async function reActivate(req, res) {
//   try {
//     let { couponID } = req.body;
//     couponID = new mongoose.Types.ObjectId(couponID);
//     const coupon = await couponModel.find({ _id: couponID });
//     let whatToDo = coupon[0].isActive ? false : true;
//     let updatedCoupon = await couponModel.findByIdAndUpdate(
//       couponID,
//       {
//         $set: {
//           isActive: whatToDo,
//         },
//       },
//       { new: true }
//     );
//     res.json(updatedCoupon);
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// }

import Coupon from "../models/couponModel.js";

// Create a new coupon
export async function createCoupon (req, res){
    try {
        const { code, discount, isPublic, expiresAt } = req.body;
        console.log(code, discount, isPublic, expiresAt);
        
        const coupon = new Coupon({ code, discount, isPublic, expiresAt });
        await coupon.save();
        res.status(201).json(coupon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all coupons
export async function getAllCoupons (req, res){
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a coupon
export async function updateCoupon (req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        const coupon = await Coupon.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(coupon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a coupon
export async function deleteCoupon (req, res) {
    try {
        const { id } = req.params;
        await Coupon.findByIdAndDelete(id);
        res.status(204).json({ message: 'Coupon deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export async function applyCoupon(req, res) {
  try {
    console.log("inside apply coupon");
    
      const { code } = req.body;
      console.log(code);
      
      console.log("check 1");
      
      const coupon = await Coupon.findOne({ code: code }); // Ensure case insensitivity
      if (!coupon) {
        console.log("check 2");
          return res.status(404).json({ error: 'Coupon not found' });
      }
      else{
        console.log("check 3");
          console.log("coupon found");
      }
      if (coupon.expiresAt < new Date()) {
        console.log("check 3");
          console.log("coupon expired");
          return res.status(400).json({ error: 'Coupon has expired' });
      }
      console.log("check 4");
      res.status(200).json({ discount: coupon.discount });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

export async function publicCoupon(req, res) {
  try {
    const publicCoupons = await Coupon.find({ isPublic: true });
    res.json(publicCoupons);
} catch (error) {
    res.status(500).json({ error: 'Failed to fetch public coupons' });
}
}