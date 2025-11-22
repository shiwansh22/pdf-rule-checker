"use client"

export default function RuleInput({ rules, onRulesChange }) {
  const examples = [
    "The document must have a purpose section.",
    "The document must mention at least one date.",
    "The document must define at least one term.",
    "The document must mention who is responsible.",
    "The document must list any requirements.",
  ]

  return (
    <div className="rules-container">
      {[0, 1, 2].map((index) => (
        <div key={index} className="rule-input-group">
          <label>Rule {index + 1}</label>
          <textarea
            value={rules[index]}
            onChange={(e) => onRulesChange(index, e.target.value)}
            placeholder={examples[index]}
            rows="2"
          />
          <small className="example-hint">e.g., {examples[index]}</small>
        </div>
      ))}
    </div>
  )
}
