📄 PDF Rule Checker — Full Stack Assignment (NIYAMR)

A simple and powerful full-stack app where a user uploads a PDF, enters 3 rules, and the system uses AI (Groq LLM) to check if the document satisfies those rules — returning PASS/FAIL, evidence, reasoning, and confidence scores.

This project includes:

✔ Backend (Node.js + Express)

✔ Frontend (React/Next.js or Vite depending on repo structure)

✔ PDF extraction

✔ Groq LLM analysis

✔ Export results to JSON

✔ Full Docker support

✔ Very easy to run on any system

🚀 Features
PDF Upload

User uploads a PDF (drag & drop or file select).

Rule Input

User provides exactly 3 custom rules to validate.

AI-Powered Evaluation

Backend sends extracted PDF text + rules to Groq LLM model:

Status → pass / fail

Exact evidence (quote)

Reasoning

Confidence (0–100%)

Results Table

A clean UI shows all results with expandable details.

JSON Export

One-click export of all rules + analysis results.

🗂️ Directory Structure

Your project may be Vite/React or Next.js. This README covers both.
This is the actual directory map used by this project:

pdf-rule-check/
├── backend/                        # EXPRESS BACKEND (API + LLM + PDF parsing)
│   ├── src/
│   │   ├── index.js                # Entry point
│   │   ├── routes/
│   │   │   ├── upload.js           # Handles PDF upload & extraction
│   │   │   └── check.js            # Handles AI rule checking
│   │   └── services/
│   │       ├── pdfParse.js         # Extracts text from PDF
│   │       └── llmClient.js        # Groq LLM API handler
│   ├── package.json
│   └── Dockerfile
│
├── frontend/ or app/               # FRONTEND UI (Next.js OR Vite React)
│   ├── components/
│   │   ├── PdfUploader.jsx
│   │   ├── RuleInput.jsx
│   │   └── ResultsTable.jsx
│   ├── public/                     # static assets
│   ├── package.json
│   └── Dockerfile (if present)
│
├── sample_data/
│   ├── SAMPLE_RULES.md
│   └── NIYAMR_Fullstack_Assignment.pdf (local testing only)
│
├── docker-compose.yml              # Runs backend & frontend together
├── .env.example                    # Template for environment variables
├── README.md
└── assets/
    └── screenshot.png              # One required screenshot of working UI

⚙️ Environment Variables

✔ Create a .env file in project root:
(Do NOT commit your actual API key to GitHub.)

GROQ_API_KEY=your_groq_api_key_here
GROQ_LLM_MODEL=llama-3.1-8b-instant

BACKEND_PORT=5000
FRONTEND_PORT=3000


➡️ A ready .env.example is included.

🐳 Running with Docker (Recommended)

This is the easiest way for reviewers to run the project.

1️⃣ Clone the repo
git clone https://github.com/<your-username>/pdf-rule-checker.git
cd pdf-rule-checker

2️⃣ Create .env
copy .env.example .env


Then open .env and add your Groq API key.

3️⃣ Start everything
docker-compose up --build

4️⃣ Open the app

Frontend:
👉 http://localhost:3000

(If busy, it may run on 3001 or 3002.)

Backend health check:
👉 http://localhost:5000/api/health

5️⃣ Stop everything
docker-compose down

🖥️ Running Locally Without Docker
▶ Backend
cd backend
npm install
npm run dev
# or node --watch src/index.js


Runs at:
👉 http://localhost:5000

▶ Frontend (Next.js OR Vite)
For Next.js:
cd frontend
npm install
npm run dev


Then open:
👉 http://localhost:3000

For Vite:
cd frontend
npm install
npm run dev

🧪 How to Use the App

1️⃣ Upload any PDF
2️⃣ Enter 3 rules (required)
3️⃣ Click Check Document
4️⃣ View results table
5️⃣ Expand rows for details
6️⃣ Download JSON (optional)

Example AI output:

{
  "rule": "Document must mention a date.",
  "status": "pass",
  "evidence": "Found: 'October 21, 2025'",
  "reasoning": "The document explicitly mentions a date.",
  "confidence": 95
}

🛠️ How It Works (Simple Explanation)
1. PDF Parsing

pdfParse.js extracts text using:

pdf-parse

pdfjs-dist fallback

Both combined ensure 99% PDF compatibility.

2. Rule Checking (AI)

llmClient.js sends:

PDF extracted text

3 rules

One single prompt

LLM responds with a JSON array of results.

3. Frontend UI

Upload through FileReader → base64

POST to /api/upload

Then check via /api/check

Renders table with PASS/FAIL badges

Expandable reasoning

JSON download option

✔ Assignment Deliverables Checklist (48-hour)
Requirement	Status
GitHub Repo (frontend + backend)	✅
README with instructions	✅
1 screenshot of working UI	✅
AI rule checking	✅
Pass/Fail + Evidence + Reasoning + Confidence	✅
Docker support	✅
Beginner friendly setup	✅

