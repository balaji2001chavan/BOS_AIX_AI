import express from "express";
import cors from "cors";
import { connectDB } from "./db/connect.js";

// ROUTES
import aiRouter from "./ai/api.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js"; // 🔥 PROFILE ROUTE

const app = express();

app.use(cors());
app.use(express.json());

// ROOT CHECK
app.get("/", (req, res) => {
  res.json({ status: "BOSS AiX ACTIVE", profileRoutes: true });
});

// MAIN ROUTES
app.use("/auth", authRouter);
app.use("/boss", aiRouter);
app.use("/profile", profileRouter);  // 🔥 ENABLED

// PORT
const PORT = process.env.PORT || 10000;

// START SERVER
connectDB();
app.listen(PORT, () => {
  console.log("[BOSS AiX] Server Running", PORT);
  console.log("[DB] MongoDB Connected");
});
