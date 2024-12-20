import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Cake",
    },
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
    orderItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orderItem",
            required: true  
        }
    ],
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
     paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false,
        required: true
    },
    paidDate: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false,
        required: true
    },
    isCancelled: {
        type: Boolean,
        default: false,
        required: true
    },
},
    {
        timestamps: true
    }
);

export default mongoose.model('orderItem', orderSchema)