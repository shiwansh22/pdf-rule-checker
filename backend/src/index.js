import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import uploadRoutes from "./routes/upload.js"
import checkRoutes from "./routes/check.js"

dotenv.config()

const app = express()
const PORT = process.env.BACKEND_PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: "50mb", extended: true }))

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "pdf-rule-checker-backend" })
})

// Routes
app.use("/api", uploadRoutes)
app.use("/api", checkRoutes)

// Error handler
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message)
  res.status(500).json({ error: err.message || "Internal server error" })
})

app.listen(PORT, () => {
  console.log(`✓ Backend running on http://localhost:${PORT}`)
  console.log(`✓ Using Groq API with model: ${process.env.GROQ_LLM_MODEL || "mixtral-8x7b-32768"}`)
})
