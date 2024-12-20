import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
    bio: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    manufacturingDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model('Voucher', voucherSchema)