import Groq from "groq-sdk";

const API_KEY = process.env.GROQ_API_KEY;
if (!API_KEY) {
  console.error("[LLM INIT] Missing GROQ_API_KEY in env");
}
const groq = new Groq({ apiKey: API_KEY });

const MODEL = process.env.GROQ_LLM_MODEL || "mixtral-8x7b-32768";

async function callGroqChat(prompt) {
  if (!groq || !groq.chat || !groq.chat.completions || !groq.chat.completions.create) {
    throw new Error("Groq SDK chat API not available. Check SDK version and initialization.");
  }

  const resp = await groq.chat.completions.create({
    model: MODEL,
    messages: [{ role: "system", content: "You are a rule-checking assistant." },
               { role: "user", content: prompt }],
    temperature: 0,
    max_tokens: 1024
  });

  // Try to find text content robustly
  const content =
    resp?.choices?.[0]?.message?.content ??
    resp?.choices?.[0]?.message?.text ??
    resp?.output?.[0]?.content?.[0]?.text ??
    (typeof resp === "string" ? resp : "");

  return content;
}

export async function checkRules(documentText, rules) {
  const prompt = `You are a document compliance checker. Analyze the following document against these rules.
DOCUMENT:
${documentText}

RULES:
${rules.map((r,i)=>`${i+1}. ${r}`).join("\n")}

For each rule return a JSON array "results" where each item is:
{
  "rule": "...",
  "status": "pass"|"fail",
  "evidence": "Found on page N: '...'" or "",
  "reasoning": "short explanation",
  "confidence": 0-100
}
Respond **only** with JSON (no markdown).`;

  try {
    const raw = await callGroqChat(prompt);
    // try to extract JSON substring
    const jsonText = (() => {
      const jMatch = raw.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      return jMatch ? jMatch[0] : raw;
    })();

    const parsed = JSON.parse(jsonText);
    // Accept either { results: [...] } or results array
    const results = Array.isArray(parsed) ? parsed : parsed.results || [];
    return results.map(r => ({
      rule: r.rule || "",
      status: (r.status || "fail").toLowerCase(),
      evidence: r.evidence || "",
      reasoning: r.reasoning || "",
      confidence: Number(r.confidence ?? 0)
    }));
  } catch (err) {
    console.error("[LLM ERROR]", err?.message ?? err);
    // Return a safe failure for each rule
    return rules.map(rule => ({
      rule,
      status: "fail",
      evidence: "",
      reasoning: `LLM error: ${err?.message || "unknown"}`,
      confidence: 10
    }));
  }
}
