import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            minLenght: 10,
        },
        address: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        profileImage: {
            type: String,
            default: "",
        },
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Cake",
                default: [],
            },
        ],
        cofirmToken: {
            type: String,
            default: "",
        },
        isVerifited: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },

        user_vouchers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Voucher",
                default: [],
            },
        ],
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
                default: [],
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);
