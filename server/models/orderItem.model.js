import mongoose from "mongoose";
const orderItemSchema = new mongoose.Schema({
    productID: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    total: {
        type: Number
    }
})