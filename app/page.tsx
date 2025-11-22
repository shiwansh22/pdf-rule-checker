"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, FileText, Zap, Github, Download } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">PDF Rule Checker</h1>
            </div>
            <p className="text-slate-400 text-sm">NIYAMR AI Assignment</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">Validate PDFs with AI</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Upload any PDF, define 3 rules, and let AI analyze compliance with detailed results including confidence
            scores and evidence quotes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => window.open("https://github.com", "_blank")}
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              onClick={() => {
                const el = document.getElementById("setup")
                el?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Get Started
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
            <CardHeader>
              <FileText className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Easy PDF Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Support for 2-10 page PDFs. Simply upload your document and our AI will extract and analyze the content.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
            <CardHeader>
              <Zap className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Custom Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Define 3 plain-English rules like "Must have a purpose" or "Must mention dates". No technical knowledge
                needed.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
            <CardHeader>
              <CheckCircle2 className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Get PASS/FAIL, evidence quotes with page numbers, reasoning, and confidence scores for each rule.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Results Example */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm mb-16">
          <CardHeader>
            <CardTitle className="text-white">Example Results</CardTitle>
            <CardDescription>What you'll get for each rule:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white font-semibold text-sm">The document must have a purpose section.</h4>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">PASS</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-slate-400">Evidence:</span>{" "}
                    <span className="text-slate-300 font-mono">
                      "Found on page 1: 'Purpose: This document outlines key policies'"
                    </span>
                  </p>
                  <p>
                    <span className="text-slate-400">Reasoning:</span>{" "}
                    <span className="text-slate-300">
                      Document explicitly contains a purpose section in introduction.
                    </span>
                  </p>
                  <p>
                    <span className="text-slate-400">Confidence:</span> <span className="text-slate-300">95%</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup Section */}
        <div id="setup" className="scroll-mt-8">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Quick Setup (5 minutes)</CardTitle>
              <CardDescription>Everything you need to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Prerequisites</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full" />
                      Docker & Docker Compose
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full" />
                      OpenAI API key (free credits available)
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Steps</h4>
                  <div className="space-y-3 bg-slate-900/50 rounded-lg p-4">
                    <div className="flex gap-3">
                      <span className="text-purple-400 font-bold">1.</span>
                      <div>
                        <p className="text-slate-300 font-mono text-sm">git clone repo && cd niyamr-llm-checker</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-purple-400 font-bold">2.</span>
                      <div>
                        <p className="text-slate-300 font-mono text-sm">cp .env.example .env</p>
                        <p className="text-slate-400 text-xs mt-1">Add your OPENAI_API_KEY to .env</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-purple-400 font-bold">3.</span>
                      <div>
                        <p className="text-slate-300 font-mono text-sm">docker-compose up --build</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-purple-400 font-bold">4.</span>
                      <div>
                        <p className="text-slate-300">Open http://localhost:3000</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Tech Stack</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    {[
                      "React 18",
                      "Node.js + Express",
                      "OpenAI GPT-4o mini",
                      "Docker & Compose",
                      "PDF Parse",
                      "Vite",
                      "TypeScript",
                      "Tailwind CSS",
                    ].map((tech) => (
                      <div key={tech} className="bg-slate-900/50 rounded px-3 py-2 text-slate-300">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Deliverables</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Full-stack Next.js + Express application
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Docker & Docker Compose setup
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Comprehensive documentation & guides
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Unit & integration tests
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Production-ready code
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Files Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-700/50">
        <h3 className="text-2xl font-bold text-white mb-8">Generated Files</h3>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-purple-400 font-semibold mb-4">Backend</h4>
            <div className="space-y-2 text-sm text-slate-300 font-mono bg-slate-900/50 rounded-lg p-4">
              <p>backend/src/index.js</p>
              <p>backend/src/routes/upload.js</p>
              <p>backend/src/routes/check.js</p>
              <p>backend/src/services/pdfParse.js</p>
              <p>backend/src/services/llmClient.js</p>
              <p>backend/Dockerfile</p>
              <p>backend/package.json</p>
            </div>
          </div>

          <div>
            <h4 className="text-purple-400 font-semibold mb-4">Frontend</h4>
            <div className="space-y-2 text-sm text-slate-300 font-mono bg-slate-900/50 rounded-lg p-4">
              <p>frontend/src/App.jsx</p>
              <p>frontend/src/components/PdfUploader.jsx</p>
              <p>frontend/src/components/RuleInput.jsx</p>
              <p>frontend/src/components/ResultsTable.jsx</p>
              <p>frontend/vite.config.js</p>
              <p>frontend/Dockerfile</p>
              <p>frontend/package.json</p>
            </div>
          </div>

          <div>
            <h4 className="text-purple-400 font-semibold mb-4">Configuration</h4>
            <div className="space-y-2 text-sm text-slate-300 font-mono bg-slate-900/50 rounded-lg p-4">
              <p>docker-compose.yml</p>
              <p>docker-compose.override.yml</p>
              <p>.env.example</p>
              <p>.gitignore files</p>
              <p>.github/workflows/ci.yml</p>
            </div>
          </div>

          <div>
            <h4 className="text-purple-400 font-semibold mb-4">Documentation</h4>
            <div className="space-y-2 text-sm text-slate-300 font-mono bg-slate-900/50 rounded-lg p-4">
              <p>README.md</p>
              <p>QUICKSTART.md</p>
              <p>ARCHITECTURE.md</p>
              <p>TESTING.md</p>
              <p>CONTRIBUTING.md</p>
              <p>SCHEMA.md</p>
              <p>PERFORMANCE.md</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-slate-400 text-sm">NIYAMR AI — 48-Hour Full-Stack Developer Assignment</p>
        </div>
      </footer>
    </main>
  )
}
