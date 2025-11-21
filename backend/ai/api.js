import express from "express";
import { loadManifest, interpretCommand } from "./agent-core.js";

const router = express.Router();

router.post("/ask", (req, res) => {
  const { prompt } = req.body;
  
  const manifest = loadManifest();
  if (!manifest) return res.json({ error: "Manifest not found" });

  const output = interpretCommand(prompt, manifest);

  return res.json({
    status: "ok",
    result: output
  });
});

export default router;
import { writeToFile, appendToFile } from "./code-writer.js";
router.post("/ask", (req, res) => {
  const { prompt } = req.body;
  const manifest = loadManifest();

  const output = interpretCommand(prompt, manifest);

  if (prompt.toLowerCase().includes("test file")) {
    const result = writeToFile("./test-output.txt", "Hello from BOSS AiX");
    return res.json(result);
  }

  return res.json({
    status: "ok",
    result: output
  });
});
