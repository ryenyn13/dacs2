import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    cakeID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cake' },
    name: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { 
        type: Number, 
        required: true 
    },
    total: { 
        type: Number, 
        required: true 
    },
});
const orderSchema = new mongoose.Schema({
    // productID: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: "Cake",
    // },
    fullName: {
        type: String,
        default: "Guest"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    orderItems: [ orderItemSchema ],
    orderDate: {
        type: Date,
        default: Date.now
    },
    shippingPrice: {
        type: Number,
        required: true            
    },
    totalPrice: {
        type: Number,
        required: true
    },   
},
    {
        timestamps: true
    }
);

export default mongoose.model('orderItem', orderSchema)
