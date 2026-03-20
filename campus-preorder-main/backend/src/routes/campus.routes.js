import express from "express";
import { listCampuses } from "../controllers/campus.controller.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = express.Router();

router.get("/", asyncHandler(listCampuses));

export default router;
