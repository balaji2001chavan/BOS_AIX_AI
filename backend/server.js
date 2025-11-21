import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import aiRouter from "./ai/api.js"; // ← Import इथे

dotenv.config();

const app = express(); // ← app FIRST

app.use(cors());
app.use(express.json());

// Load Manifest
let manifest = "";
try {
  manifest = fs.readFileSync("BOSSAIX_MANIFEST.txt", "utf8");
  console.log("[BOSS AIX] Manifest Loaded Successfully");
} catch (err) {
  console.log("[BOSS AIX] Manifest Missing");
}

// Routes MUST come after app is defined
app.use("/boss", aiRouter);

app.get("/", (req, res) => {
  res.send({
    status: "BOSS AiX Control Center Active",
    manifestLoaded: manifest.length > 0
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running → Port ${PORT}`));
