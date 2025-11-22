"use client"

import { useState } from "react"
import "./App.css"
import PdfUploader from "./components/PdfUploader"
import RuleInput from "./components/RuleInput"
import ResultsTable from "./components/ResultsTable"

function App() {
  const [pdfText, setPdfText] = useState("")
  const [rules, setRules] = useState(["", "", ""])
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handlePdfUpload = (text) => {
    setPdfText(text)
    setError("")
    setResults(null)
  }

  const handleRulesChange = (index, value) => {
    const newRules = [...rules]
    newRules[index] = value
    setRules(newRules)
  }

  const handleCheckDocument = async () => {
    if (!pdfText.trim()) {
      setError("Please upload a PDF first")
      return
    }

    if (rules.some((r) => !r.trim())) {
      setError("All 3 rules must be filled")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:5000/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: pdfText,
          rules: rules.map((r) => r.trim()),
        }),
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`)
      }

      const data = await response.json()
      // setResults(data.results)
      setResults(data)
    } catch (err) {
      setError(err.message || "Failed to check document")
    } finally {
      setLoading(false)
    }
  }

  const handleExportJSON = () => {
    if (!results) return
    const json = JSON.stringify({ rules, results }, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `pdf-check-${new Date().getTime()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>📄 PDF Rule Checker</h1>
          <p>Validate PDFs with AI</p>
        </div>
      </header>

      <main className="container">
        <div className="section">
          <h2>Upload PDF</h2>
          <PdfUploader onUpload={handlePdfUpload} />
          {pdfText && <p className="success">✓ PDF uploaded successfully</p>}
        </div>

        <div className="section">
          <h2>Define 3 Rules</h2>
          <RuleInput rules={rules} onRulesChange={handleRulesChange} />
        </div>

        <div className="section">
          <button
            className="btn-primary"
            onClick={handleCheckDocument}
            disabled={loading || !pdfText || rules.some((r) => !r.trim())}
          >
            {loading ? "Checking..." : "Check Document"}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {results && (
          <div className="section">
            <div className="results-header">
              <h2>Results</h2>
              <button className="btn-secondary" onClick={handleExportJSON}>
                Download JSON
              </button>
            </div>
            <ResultsTable results={results} />
          </div>
        )}
      </main>

      <footer className="footer">
        <p>48-Hour Full-Stack Assignment</p>
      </footer>
    </div>
  )
}

export default App
