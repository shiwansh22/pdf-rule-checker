"use client"

import React, { useState } from "react"

export default function ResultsTable({ results }) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  // safety guard: only render arrays
  if (!results || !Array.isArray(results)) {
    return null
  }

  return (
    <div className="results-table">
      <table>
        <thead>
          <tr>
            <th>Rule</th>
            <th>Status</th>
            <th>Confidence</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <React.Fragment key={index}>
              <tr className={`status-${result.status}`}>
                <td>{result.rule}</td>
                <td>
                  <span className={`badge badge-${result.status}`}>
                    {result.status ? result.status.toUpperCase() : "UNKNOWN"}
                  </span>
                </td>
                <td>{typeof result.confidence === "number" ? `${result.confidence}%` : "—"}</td>
                <td>
                  <button
                    className="btn-expand"
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  >
                    {expandedIndex === index ? "▼" : "▶"}
                  </button>
                </td>
              </tr>
              {expandedIndex === index && (
                <tr className="expanded-row">
                  <td colSpan="4">
                    <div className="details">
                      <div>
                        <strong>Evidence:</strong>
                        <p>{result.evidence && result.evidence.length ? result.evidence : "—"}</p>
                      </div>
                      <div>
                        <strong>Reasoning:</strong>
                        <p>{result.reasoning || "—"}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
