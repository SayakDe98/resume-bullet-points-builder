"use client";

import { useState } from "react";
import natural from "natural";

export default function Home() {
  const [bullets, setBullets] = useState<string[]>([]);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    let extracted: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.name.endsWith(".txt")) continue;

      const text = await file.text();
      const points = extractBulletPoints(text);
      extracted.push(...points);
    }

    const deduped = deduplicate(extracted);
    const ranked = rankBullets(deduped);

    setBullets(ranked);
  };

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">AI Resume Builder</h1>

      <input
        type="file"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="mb-6"
      />

      <h2 className="text-xl font-semibold mt-4 mb-2">Top Resume Bullets</h2>

      <div className="space-y-2">
        {bullets.map((b, i) => (
          <div key={i} className="p-2 border rounded">
            • {b}
          </div>
        ))}
      </div>
    </main>
  );
}

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

const ACTION_VERBS = [
  "build",
  "develop",
  "implement",
  "design",
  "optimize",
  "reduce",
  "improve",
  "increase",
  "lead",
  "create",
  "fix",
];

const TECH_KEYWORDS = [
  "api",
  "redis",
  "sql",
  "docker",
  "kubernetes",
  "react",
  "next",
  "node",
  "backend",
  "frontend",
  "system",
  "service",
];

const STEMMED_VERBS = ACTION_VERBS.map((v) => stemmer.stem(v));

function extractBulletPoints(text: string): string[] {
  const sentences = text.split(/\n|\.|!/);
  const bullets: string[] = [];

  for (const sentence of sentences) {
    const clean = sentence.trim();
    if (clean.length < 20) continue;

    const tokens = tokenizer.tokenize(clean.toLowerCase());
    const stems = tokens.map((t) => stemmer.stem(t));

    const hasVerb = stems.some((s) => STEMMED_VERBS.includes(s));
    const hasTech = tokens.some((t) => TECH_KEYWORDS.includes(t));

    if (hasVerb && hasTech) {
      bullets.push(capitalize(clean));
    }
  }

  return bullets;
}

function deduplicate(lines: string[]): string[] {
  const unique: string[] = [];

  for (const line of lines) {
    let isDuplicate = false;

    for (const existing of unique) {
      const similarity = natural.JaroWinklerDistance(
        line.toLowerCase(),
        existing.toLowerCase()
      );

      if (similarity > 0.88) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) unique.push(line);
  }

  return unique;
}

function rankBullets(lines: string[]): string[] {
  return lines
    .map((line) => ({ line, score: scoreLine(line) }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.line);
}

function scoreLine(line: string): number {
  let score = 0;

  const lower = line.toLowerCase();

  // action verbs boost
  ACTION_VERBS.forEach((verb) => {
    if (lower.includes(verb)) score += 2;
  });

  // tech keywords boost
  TECH_KEYWORDS.forEach((tech) => {
    if (lower.includes(tech)) score += 2;
  });

  // numbers = impact
  if (/\d/.test(line)) score += 3;

  // length sweet spot
  if (line.length > 50 && line.length < 120) score += 2;

  return score;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
