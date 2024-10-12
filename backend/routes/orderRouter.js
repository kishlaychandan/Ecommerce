// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware  from "../middlewares/adminMiddleware.js";

const OrderRouter = express.Router();

// Create an order
OrderRouter.post("/createorder", authMiddleware, createOrder);

// Get orders for the logged-in user
OrderRouter.get("/myorders", authMiddleware, getUserOrders);

// Get all orders (Admin) with pagination
OrderRouter.get("/all", getAllOrders);

// Update order status (Admin)
OrderRouter.patch("/:id", adminMiddleware, updateOrderStatus);

export default OrderRouter;
