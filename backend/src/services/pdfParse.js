import fs from "fs";
import pdfParse from "pdf-parse";
export async function extractPdfText(filePath) {
  // If the caller passed a Buffer instead of file path, handle both:
  let buffer;
  if (Buffer.isBuffer(filePath)) {
    buffer = filePath;
  } else {
    // filePath is path string
    buffer = fs.readFileSync(filePath);
  }

  // Try pdf-parse
  try {
    const data = await pdfParse(buffer);
    if (data && data.text && data.text.trim().length > 0) {
      return data.text;
    } else {
      throw new Error("No text found in PDF after pdf-parse");
    }
  } catch (err) {
    console.warn("[PDFPARSE] pdf-parse failed:", err.message || err);
    // Give a clear error upward so caller can decide fallback/repair.
    throw new Error(err.message || "PDF parsing failed");
  }
}
