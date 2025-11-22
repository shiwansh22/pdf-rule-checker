import express from "express";
import multer from "multer";
import fs from "fs/promises";
import { extractPdfText } from "../services/pdfParse.js";

const router = express.Router();
const upload = multer({ dest: "/tmp/uploads" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const text = await extractPdfText(filePath);

    // remove temp
    await fs.unlink(filePath).catch(() => {});

    return res.json({
      success: true,
      text,
      message: "PDF extracted successfully"
    });
  } catch (err) {
    console.error("[UPLOAD ERROR]", err.message || err);
    // cleanup
    if (req.file) await fs.unlink(req.file.path).catch(()=>{});
    return res.status(500).json({ error: err.message || "PDF extraction failed" });
  }
});

export default router;
