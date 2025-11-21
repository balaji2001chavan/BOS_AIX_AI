import express from "express";
import { loadManifest, interpretCommand } from "./agent-core.js";
import { writeFile, appendFile } from "./code-writer.js";

const router = express.Router();

// MAIN AI EXECUTION ENDPOINT
router.post("/ask", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.json({ error: "No prompt provided" });
  }

  // Load main system manifest
  const manifest = loadManifest();
  if (!manifest) {
    return res.json({ error: "Manifest not found" });
  }

  // Create logical plan
  const result = interpretCommand(prompt, manifest);

  // ======================
  //   EXECUTABLE ACTIONS
  // ======================

  // CREATE TEST FILE
  if (prompt.toLowerCase() === "create test file now") {
    const output = writeFile("./backend/test-generated.js", "// Created by BOSS AiX");
    return res.json(output);
  }

  // APPEND TO TEST FILE
  if (prompt.toLowerCase() === "append to test file") {
    const output = appendFile("./backend/test-generated.js", "\n// Updated by BOSS AiX");
    return res.json(output);
  }

  // DEFAULT → respond only
  return res.json({
    status: "ok",
    mode: "analysis-only",
    result
  });
});

export default router;
