"use client"

import { useState } from "react"

export default function PdfUploader({ onUpload }) {
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(false)

  const backendBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

  const uploadFileToServer = async (file) => {
    const fd = new FormData()
    fd.append("file", file)

    const res = await fetch(`${backendBase}/api/upload`, {
      method: "POST",
      body: fd
    })

    if (!res.ok) {
      throw new Error(`Upload failed: ${res.status}`)
    }

    return await res.json()
  }

  const handleFile = async (file) => {
    if (!file || file.type !== "application/pdf") {
      alert("Please select a valid PDF file")
      return
    }

    setLoading(true)
    try {
      const data = await uploadFileToServer(file)
      onUpload?.(data.text)
    } catch (err) {
      alert("Upload error: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  return (
    <div
      className={`upload-zone ${dragActive ? "active" : ""}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {loading ? (
        <p>Uploading...</p>
      ) : (
        <>
          <p>📁 Drag and drop PDF or</p>
          <label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <span className="link">click to select</span>
          </label>
        </>
      )}
    </div>
  )
}
