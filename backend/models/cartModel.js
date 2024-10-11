import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Product' 
        },
        quantity: {
            type: Number,
            required: true,
            min: 1 
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0 
    }
}, {
    timestamps: true 
});

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;
