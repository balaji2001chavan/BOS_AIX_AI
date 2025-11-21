import express from "express";
import fs from "fs";
import { loadManifest, interpretCommand } from "./agent-core.js";
import { writeFile, appendFile } from "./code-writer.js";

const router = express.Router();

// ==================================
// MAIN AI EXECUTION ENDPOINT
// ==================================
router.post("/ask", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.json({ error: "No prompt provided" });
  }

  const manifest = loadManifest();
  const result = interpretCommand(prompt, manifest);

  // -------------------------
  // TEST ACTION: CREATE FILE
  // -------------------------
  if (prompt.toLowerCase().trim() === "create test file now") {
    const output = writeFile(
      "/opt/render/project/src/backend/test-generated.js",
      "// File created by BOSS AiX"
    );
    return res.json(output);
  }

  // -------------------------
  // TEST ACTION: APPEND FILE
  // -------------------------
  if (prompt.toLowerCase().trim() === "append to test file") {
    const output = appendFile(
      "/opt/render/project/src/backend/test-generated.js",
      "\n// Updated by BOSS AiX"
    );
    return res.json(output);
  }

  // Default (just understanding, no action)
  return res.json({
    status: "ok",
    mode: "analysis-only",
    result
  });
});

// ==================================
// CHECK IF TEST FILE EXISTS
// ==================================
router.get("/check", (req, res) => {
  const exists = fs.existsSync("/opt/render/project/src/backend/test-generated.js");

  return res.json({
    fileExists: exists,
    path: "/opt/render/project/src/backend/test-generated.js"
  });
});

export default router;
