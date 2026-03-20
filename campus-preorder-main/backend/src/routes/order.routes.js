import express from "express";
import { createOrder } from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = express.Router();

router.post("/", protect, asyncHandler(createOrder));

export default router;
