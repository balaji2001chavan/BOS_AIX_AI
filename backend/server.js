import express from "express";
import cors from "cors";
import { connectDB } from "./db/connect.js";

// Routes
import aiRouter from "./ai/api.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js"; // 🔥 New Import

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.json({
    status: "BOSS AiX Control Center Active",
    manifestLoaded: true,
  });
});

// Auth Routes
app.use("/auth", authRouter);

// AI Command Routes
app.use("/boss", aiRouter);

// Profile Routes 🔥 (New)
app.use("/profile", profileRouter);

// Port Handling
const PORT = process.env.PORT || 5000;

// Start DB + Server
connectDB();

app.listen(PORT, () => {
  console.log("[DB] MongoDB connected");
  console.log(`[BOSS AiX] Server Running on Port ${PORT}`);
});
