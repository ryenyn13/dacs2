import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
    addOrderItems,
    getAllOrders,
    deleteOrder,
    getOnDeliveyUserOrders,
    getPlacedUserOrders,
    getCompletedUserOrders,
    getCancelledOrders,
    cancelUserOrder,
    changeStatusOrder
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/all", getAllOrders);
router.post("/add", addOrderItems); 
router.delete("/delete/:id", protectRoute, deleteOrder);
router.post("/changeStatus/:id", protectRoute, changeStatusOrder)
router.post("/cancelOrder/:id", protectRoute, cancelUserOrder);
router.get("/getOnDelivery/user", protectRoute, getOnDeliveyUserOrders);
router.get("/getPlaced/user", protectRoute, getPlacedUserOrders);
router.get("/getCompleted/user", protectRoute, getCompletedUserOrders);
router.get("/getCancelledOrders/user", protectRoute, getCancelledOrders);

export default router;

