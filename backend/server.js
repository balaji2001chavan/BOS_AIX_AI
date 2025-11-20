import aiRouter from "./ai/api.js";
app.use("/boss", aiRouter);
import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Load core identity
let manifest = "";
try {
  manifest = fs.readFileSync("BOSSAIX_MANIFEST.txt", "utf8");
  console.log("[BOSS AIX] Manifest Loaded");
} catch {
  console.log("[BOSS AIX] Manifest NOT FOUND. Add BOSSAIX_MANIFEST.txt in root.");
}

// Test Route
app.get("/", (req, res) => {
  res.json({
    status: "BOSS AiX Control Center Active",
    manifestLoaded: manifest.length > 0,
    message: "System Ready"
  });
});
import aiRouter from "./ai/api.js";
app.use("/boss", aiRouter);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running → PORT ${PORT}`));
