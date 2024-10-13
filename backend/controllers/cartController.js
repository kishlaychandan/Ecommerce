import cartModel from "../models/cartModel.js";
import productModel from "../models/productModels.js";

export async function getUserCart(req, res) {
    const userId = req.user._id;
    try {
        const cart = await cartModel.findOne({ user: userId }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart" });
    }
}

export async function addProductToCart(req, res) {
    const { productId } = req.body;
    const userId = req.user._id;
    try {
        let cart = await cartModel.findOne({ user: userId });
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (!cart) {
            cart = new cartModel({
                user: userId,
                products: [{ product: productId, quantity: 1 }],
                totalPrice: product.price,
            });
        } else {
            const productInCart = cart.products.find(item => item.product.toString() === productId);
            if (productInCart) {
                return res.status(200).json({ message: "Product already in cart", cart });
            }
            cart.products.push({ product: productId, quantity: 1 });
            cart.totalPrice += product.price;
        }
        await cart.save();
        res.status(200).json({ message: "Product added to cart", cart });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

export async function incrementProductQuantity(req, res) {
    const { productId } = req.body;
    const userId = req.user._id;
    try {
        let cart = await cartModel.findOne({ user: userId }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        const productPrice = cart.products[productIndex].product.price;
        cart.totalPrice += productPrice;
        cart.products[productIndex].quantity += 1;
        await cart.save();
        res.status(200).json({ message: "Product quantity increased", cart });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

export async function decrementProductQuantity(req, res) {
    const { productId } = req.body;
    const userId = req.user._id;
    try {
        let cart = await cartModel.findOne({ user: userId }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        const productPrice = cart.products[productIndex].product.price;
        if (cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity -= 1;
            cart.totalPrice -= productPrice;
        } else {
            cart.totalPrice -= productPrice;
            cart.products.splice(productIndex, 1);
        }
        await cart.save();
        res.status(200).json({ message: "Product quantity decreased", cart });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

export async function removeSingleProductFromCart(req, res) {
    const userId = req.user._id;
    const { productId } = req.params;
    try {
        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        cart.products.splice(productIndex, 1);
        await cart.save();
        res.status(200).json({ message: "Product removed from cart", cart });
    } catch (err) {
        res.status(500).json({ message: "Error removing product from cart" });
    }
}

// import cartModel from "../models/cartModel.js";

export async function clearUserCart(req, res) {
    console.log("inside clear user cart");
    
    const userId = req.user._id;

    try {
        const cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Clear the products array and reset total price
        cart.products = [];
        cart.totalPrice = 0;

        await cart.save();

        console.log("Cart cleared successfully",cart);
        
        res.status(200).json({ message: "Cart cleared successfully", cart });
    } catch (err) {
        res.status(500).json({ message: "Error clearing cart", error: err.message });
    }
}
