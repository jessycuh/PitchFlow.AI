// server.js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use('/output', express.static(path.join(__dirname, 'output')));

// Set up Multer to save uploads
const storage = multer.diskStorage({
  destination: 'audios/',
  filename: (req, file, cb) => {
    const safeName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, safeName);
  },
});
const upload = multer({ storage });

app.post('/upload', upload.single('audio'), (req, res) => {
  const inputPath = req.file.path;
  const baseName = path.parse(inputPath).name;
  const outputMid = `output/${baseName}_basic_pitch.mid`;

  const cmd = `python run_basicpitch.py ${inputPath}`;
  console.log('Running:', cmd);

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error('Basic-Pitch error:', stderr);
      return res.status(500).json({ error: 'Conversion failed' });
    }

    if (!fs.existsSync(outputMid)) {
      return res.status(500).json({ error: 'MIDI file not found' });
    }

    res.json({ midiUrl: `http://localhost:${PORT}/${outputMid}` });
  });
});

app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});
