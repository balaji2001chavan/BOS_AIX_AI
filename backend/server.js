import express from "express";
import cors from "cors";
import { connectDB } from "./db/connect.js";

// AI + App Routes
import aiRouter from "./ai/api.js";
import authRouter from "./routes/auth.js";

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

// Port Handling
const PORT = process.env.PORT || 5000;

// Connect DB + Start Server
connectDB();

app.listen(PORT, () => {
  console.log(`[BOSS AiX] Server Running on Port ${PORT}`);
});
