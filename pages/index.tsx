"use client";

import { useState } from "react";

export default function Home() {
  const [bullets, setBullets] = useState<string[]>([]);

const handleFiles = async (files: FileList | null) => {
  if (!files) return;

  const texts: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // if (!file.name.endsWith(".txt")) continue;

    texts.push(await file.text());
  }

  const res = await fetch("/api/process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ texts }),
  });

  const data = await res.json();
  
  setBullets(data.bullets);
};

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">AI Resume Builder</h1>

      <input
        type="file"
        multiple
          {...{ webkitdirectory: "true" }}
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
