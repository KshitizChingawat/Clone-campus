import express from "express";
import { createVendor, getCampusVendors } from "../controllers/vendor.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = express.Router();

router.post("/", protect, asyncHandler(createVendor));
router.get("/", protect, asyncHandler(getCampusVendors));

export default router;
