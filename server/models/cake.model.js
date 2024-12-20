import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
    productID: {
        type: String,
    },
    cakeName: {
        type: String,
        required: true
    },
    images:[
        {
            type:String, 
        }
    ],
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
    },
    exrityDate: {
        type: Date,
    },
    manufacturingDate: {
        type: Date,
    },
    user_reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" 
        }
    ],
    quantity: {
        type: Number,
    },
    sales: {
        type: Number,
    },
    
});
export default mongoose.model('Cake', cakeSchema)
