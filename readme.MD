```markdown
# PitchFlow.AI

PitchFlow.AI is a browser-based audio-to-MIDI converter powered by Spotify's [basic-pitch](https://github.com/spotify/basic-pitch) and a custom Node.js + Python backend.

Drop in a `.wav` file and receive a downloadable `.mid` file you can preview in any MIDI tool.

---

## ✨ Features

- Drag-and-drop `.wav` upload via frontend
- Converts audio into `.mid` format using `basic-pitch`
- Full backend integration via Node.js server
- Supports ONNX or TensorFlow model execution
- Output MIDI file served instantly after conversion

---

## 🧠 Tech Stack

- **Python 3.10** (virtualenv `env310`)
- **Node.js** for backend upload handler
- **basic-pitch** (Spotify)
- Optional frontend rendering: `Tone.js`, `VexFlow`, `OSMD`

---

## 📁 Directory Structure

```

piano-ai-app/
├── audios/               # Uploaded input .wav files
├── output/               # Output MIDI files
├── env310/               # Python venv (DO NOT COMMIT)
├── frontend/
│   ├── public/           # Static frontend assets
│   └── src/              # React/Vite source files
├── server.js             # Node.js backend
├── run\_basicpitch.py     # (optional) standalone converter
├── package.json          # Node.js project config
├── README.md
└── .gitignore

````

---

## 🚀 Setup & Run

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/PitchFlow.AI.git
cd PitchFlow.AI
````

2. **Create and activate Python virtual environment**

```bash
python -m venv env310
.\env310\Scripts\activate
```

3. **Install required Python packages**

```bash
pip install "basic-pitch[onnx]" onnxruntime
```

4. **Install Node dependencies**

```bash
cd frontend
npm install
```

5. **Start backend**

```bash
cd ..
node server.js
```

6. **(Optional) Run frontend**
   If using Vite:

```bash
cd frontend
npm run dev
```

---

## 📥 Usage

Drag a `.wav` file into the browser, and it will automatically be processed into a MIDI file downloadable via a URL like:

```
http://localhost:3000/output/yourfile_basic_pitch.mid
```

---

## 🛣️ Roadmap

* [x] Drag-and-drop `.wav` uploads
* [x] Backend audio-to-MIDI via `basic-pitch`
* [ ] Browser MIDI playback (Tone.js)
* [ ] Sheet music rendering (OSMD or VexFlow)
* [ ] Vercel deployment

---

## 📄 License

MIT License — use it, remix it, ship it.

````