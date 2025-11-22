import express from "express";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import { extractPdfText } from "../services/pdfParse.js";
import { checkRules } from "../services/llmClient.js";

const router = express.Router();
const upload = multer({ dest: "/tmp/uploads" });

const DEFAULT_RULES = [
  "The document must have a purpose section.",
  "The document must mention at least one date.",
  "The document must define at least one term."
];

router.post("/check", upload.single("file"), async (req, res) => {
  let tempPath = null;
  try {
    if (req.file) {
      tempPath = req.file.path;
    } else {
      // SAMPLE_PDF_PATH can be a file or a directory; handle both
      const sampleEnv = process.env.SAMPLE_PDF_PATH || "/app/sample_data";
      const stat = await fs.stat(sampleEnv).catch(()=>null);
      if (stat && stat.isDirectory()) {
        tempPath = path.join(sampleEnv, "NIYAMR_Fullstack_Assignment.pdf");
      } else {
        tempPath = sampleEnv;
      }
    }

    // ensure file exists and is a file
    const s = await fs.stat(tempPath).catch(()=>null);
    if (!s || !s.isFile()) {
      throw new Error(`Sample PDF not found at ${tempPath}`);
    }

    // extract text
    const text = await extractPdfText(tempPath);

    // call LLM checker
    const results = await checkRules(text, DEFAULT_RULES);

    // cleanup uploaded temp
    if (req.file) await fs.unlink(tempPath).catch(()=>{});

    return res.json(results);
  } catch (err) {
    console.error("[CHECK ERROR]", err.message || err);
    if (req.file && tempPath) await fs.unlink(tempPath).catch(()=>{});
    return res.status(500).json({ error: err.message || "LLM check failed" });
  }
});

export default router;
