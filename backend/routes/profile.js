import express from "express";
import { createProfile, getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.post("/create", createProfile);
router.get("/get", getProfile);
router.post("/update", updateProfile);

export default router;
