// import { Router } from "express";
// import authMiddleware from "../middlewares/authMiddleware.js";
// import { createCoupon, reActivate } from "../controllers/couponController.js";
// const couponRouter = Router();
// couponRouter.post("/create", authMiddleware, createCoupon);
// couponRouter.post("/activate", authMiddleware, reActivate);
// export default couponRouter;


import express from 'express';
const couponRouter = express.Router();
import {createCoupon, getAllCoupons, updateCoupon, deleteCoupon, applyCoupon, publicCoupon} from '../controllers/couponController.js';
// Create a coupon
couponRouter.post('/', createCoupon);

// Get all coupons
couponRouter.get('/', getAllCoupons);

// Update a coupon
couponRouter.put('/:id', updateCoupon);

// Delete a coupon
couponRouter.delete('/:id', deleteCoupon);

couponRouter.post('/apply', applyCoupon);
couponRouter.get('/public',publicCoupon);

export default couponRouter;