// controllers/orderController.js
import Order from "../models/Order.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, paymentId, shippingDetails, notes } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products provided for the order." });
    }

    const newOrder = new Order({
      userId: req.user._id,
      products,
      totalAmount,
      paymentId,
      shippingDetails,
      notes,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get orders for the logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("products.productId", "name price category")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/// Get all orders (Admin) with pagination
export const getAllOrders = async (req, res) => {
    try {
        console.log("inside get all orders");
        
        // Removed pagination parameters from the request
        const { status } = req.query; 
        const query = status ? { orderStatus: status } : {};

        // Fetch all orders without pagination
        const orders = await Order.find(query)
            .populate("userId", "firstName lastName email") // Adjusted fields based on User model
            .populate("products.productId", "name price category")
            .sort({ createdAt: -1 });

        // Send all orders in the response
        
        console.log(orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching all orders:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

  
  // Update order status (Admin)
  export const updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const { id } = req.params;
  
      const validStatuses = ["Pending", "Completed", "Cancelled", "Dispatched", "Delivered"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value." });
      }
  
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { orderStatus: status },
        { new: true }
      ).populate("userId", "firstName lastName email"); // Adjusted fields based on User model
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found." });
      }
  
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };