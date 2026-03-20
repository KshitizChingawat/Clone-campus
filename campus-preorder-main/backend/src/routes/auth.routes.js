import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;
