import User from "../models/user.model.js";

export const getAllUsers = async(req, res) => {
    try {
        const users = await User.find().select("-password");
        if(!users) {
            return res.status(404).json({message: "No users found"});
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getAllCart = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const deleteAllCart = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        user.cart = [];
        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const addToCart = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        // check if the cake is already in the cart
        if(user.cart.includes(req.params.id)) {
            return res.status(400).json({message: "Cake is already in the cart"});
        }
        user.cart.push(req.params.id);
        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const deleteCart = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        user.cart = user.cart.filter((item) => item !== req.params.id);
        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}