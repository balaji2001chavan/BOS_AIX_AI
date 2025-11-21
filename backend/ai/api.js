import express from "express";
import fs from "fs";
import { loadManifest, interpretCommand } from "./agent-core.js";
import { writeFile, appendFile } from "./code-writer.js";

const router = express.Router();

router.post("/ask", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.json({ error: "No prompt provided" });
  }

  const manifest = loadManifest();
  const result = interpretCommand(prompt, manifest);

  // 👇 EXACT TEST COMMAND
  if (prompt.toLowerCase().trim() === "create test file now") {
    const output = writeFile("/opt/render/project/src/backend/test-generated.js", "// File created by BOSS AiX");
    return res.json(output);
  }

  // DEFAULT
  return res.json({
    status: "ok",
    mode: "analysis-only",
    result
  });
});

// CHECK IF FILE EXISTS
router.get("/check", (req, res) => {
  const exists = const exists = fs.existsSync("/opt/render/project/src/backend/test-generated.js");
  res.json({
    fileExists: exists,
    path: "./backend/test-generated.js"
  });
});

export default router;
