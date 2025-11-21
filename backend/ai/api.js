import express from "express";
import { loadManifest, interpretCommand } from "./agent-core.js";
import { writeFile, appendFile } from "./code-writer.js";

const router = express.Router();

// MAIN AI API
router.post("/ask", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.json({ error: "No prompt provided" });
  }

  // Load manifest (brain identity)
  const manifest = loadManifest();
  if (!manifest) {
    return res.json({ error: "Manifest not found" });
  }

  // Generate action plan from prompt
  const result = interpretCommand(prompt, manifest);

  // ================================
  //   BUILT-IN COMMANDS (TEST MODE)
  // ================================

  // Create a test JS file
  if (prompt.toLowerCase().includes("create test file")) {
    const output = writeFile("./backend/test-generated.js", "// File created by BOSS AiX");
    return res.json(output);
  }

  // Append text to same file
  if (prompt.toLowerCase().includes("append test")) {
    const output = appendFile("./backend/test-generated.js", "\n// Appended by BOSS AiX");
    return res.json(output);
  }

  // Default return AI understanding (no write)
  return res.json({
    status: "ok",
    execution: "understood",
    result
  });
});

export default router;
