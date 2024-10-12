import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required:true
    },
    brand: {
        type: String,
        required: true
    },
    category: { 
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    },
    inventory: {
        type: Number,
        required: true
    },
    ratings: [{
        star:Number,
        comment: String,
        postedBy: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User' // assuming the `postedBy` refers to a user
        }
    }],
    totalRatings: {
        type: Number,
        default: 4
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User' // assuming the `addedBy` refers to a user
    }
}, {
    timestamps: true
});

// Create and export the model
const productModel = mongoose.model('Product', productSchema);

export default productModel;
