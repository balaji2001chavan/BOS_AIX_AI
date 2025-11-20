import express from "express";
import { loadManifest, interpretCommand } from "./agent-core.js";

const router = express.Router();

router.post("/ask", (req, res) => {
  const { prompt } = req.body;
  const manifest = loadManifest();

  if (!manifest) {
    return res.json({ error: "Manifest not found" });
  }

  const output = interpretCommand(prompt, manifest);
  return res.json({
    status: "ok",
    data: output
  });
});

export default router;
