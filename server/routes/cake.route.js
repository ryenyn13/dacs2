import express from "express";
import {
  getAllCake,
  addCake,
  deleteCake,
  getCake,
  deleteAllCake,
  updateCake,
  findCake
} from "../controllers/cake.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/getAll", getAllCake);
router.get("/getCake/:id", getCake);
router.post("/addCake", addCake);
router.delete("/delete/:id", deleteCake);
router.delete("/deleteAll", deleteAllCake);
router.post("/update/:id", updateCake);
// router.post("/edit/:id", editCake);
// router.get("/", findCake);
export default router;
