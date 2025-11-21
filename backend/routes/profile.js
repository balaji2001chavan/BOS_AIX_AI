import express from "express";
import { createProfile, getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

// नवीन प्रोफाइल बनवा
router.post("/create", createProfile);

// userId ने प्रोफाइल मिळवा
router.get("/get", getProfile);

// प्रोफाइल अपडेट करा
router.post("/update", updateProfile);

export default router;
