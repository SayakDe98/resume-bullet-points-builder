import type { NextApiRequest, NextApiResponse } from "next";
import natural from "natural";

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

const ACTION_VERBS = [
  "build",
  "develop",
  "implement",
  "design",
  "optimize",
  "fix",
  "generate"
];

const STEMMED = ACTION_VERBS.map((v) => stemmer.stem(v));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { texts } = req.body as { texts: string[] };

  let bullets: string[] = [];

  for (const text of texts) {
    const sentences = text.split(/\n|\.|!/);

    for (const s of sentences) {
      const clean = s.trim();
      if (clean.length < 20) continue;

      const tokens = tokenizer.tokenize(clean.toLowerCase());
      const stems = tokens.map((t) => stemmer.stem(t));

      const hasVerb = stems.some((s) => STEMMED.includes(s));

      if (hasVerb) {
        bullets.push(capitalize(clean));
      }
    }
  }

  res.status(200).json({ bullets });
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}