import express from "express";
import {protectRoute} from "../middleware/protectRoute.js";
import {
    getAllUsers,
    getUser,
    updateUser,
    getAllCart,
    addToCart,
    deleteCart,
    deleteAllCart,
    sendPaymentDetails
} from "../controllers/user.controller.js"

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/getUser/:id", getUser);
router.post("/update/:id", updateUser);
router.get("/cart", protectRoute, getAllCart);
router.delete("/delete/cart/all", protectRoute, deleteAllCart);
router.post("/add/cart/:id", protectRoute, addToCart);
router.delete("/delete/cart/:id", protectRoute, deleteCart);
router.post("/payment/details", protectRoute, sendPaymentDetails);

export default router;
