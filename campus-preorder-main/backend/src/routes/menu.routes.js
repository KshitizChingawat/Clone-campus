import express from "express";
import { addMenuItem, getVendorMenu } from "../controllers/menu.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = express.Router();

router.post("/", protect, asyncHandler(addMenuItem));
router.get("/:vendorId", protect, asyncHandler(getVendorMenu));

export default router;
