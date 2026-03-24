# Resume Bullet Points Builder

A Next.js + TypeScript application that converts your **daily work logs** (stored as `.txt` files in nested folders) into **high-quality resume bullet points** using NLP.

---

## 🚀 Features

* 📁 Upload entire folders (including nested structure)
* 🧠 NLP-powered extraction using `natural`
* ✂️ Filters out weak/non-technical lines
* 🔁 Deduplicates similar bullets
* 📊 Ranks bullets based on impact
* 🎨 Clean modern UI

---

## 🏗️ Tech Stack

* **Frontend:** Next.js (Pages Router), TypeScript
* **Backend:** Next.js API Routes
* **NLP:** `natural` (tokenization, stemming, similarity)
* **Styling:** Tailwind CSS

---

## 📂 Project Structure

```
resume-bullet-points-builder/
├── pages/
│   ├── index.tsx         # UI (file upload + display)
│   ├── api/
│   │   └── process.ts    # NLP processing (server-side)
├── styles/
│   └── globals.css
```

---

## ⚙️ Installation

```bash
pnpm install
```

Install NLP dependency:

```bash
ppnpm add natural
```

---

## ▶️ Running the App

```bash
pnpm dev
```

Open:

```
http://localhost:3000
```

---

## 🧠 How It Works

### 1. Upload Folder

* Uses browser `webkitdirectory` to read all `.txt` files

### 2. Send to Backend

* Files are sent to `/api/process`

### 3. NLP Pipeline

```
Text → Tokenize → Stem → Filter → Deduplicate → Rank
```

### 4. Output

* Clean, ranked resume bullet points

---

## 📌 Example

### Input (daily logs)

```
worked on backend
Implemented Redis caching
Fixed login bug
Optimized SQL query reducing latency by 40%
```

### Output

```
• Implemented Redis caching
• Optimized SQL query reducing latency by 40%
```

---

## ⚠️ Limitations

* Does not rewrite weak sentences (yet)
* Depends on quality of input logs
* No project grouping (future enhancement)

---

## 🔥 Future Improvements

* ✨ LLM-based rewriting (GPT)
* 🗂️ Project grouping
* 📄 Export to PDF / Markdown
* ✅ Bullet selection UI
* 🏷️ Tagging (Frontend / Backend / DevOps)

---

## 💡 Best Practices for Input Logs

Write logs like this:

```
Implemented REST API for order processing
Optimized Redis caching reducing latency by 30%
```

Avoid:

```
worked on stuff
continued task
```

---

## 📜 License

MIT

---

## 👨‍💻 Author

Built to turn daily engineering logs into resume-ready content efficiently.
