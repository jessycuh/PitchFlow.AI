# Piano AI App

This project uses machine learning to convert raw audio (`.wav`) into MIDI files.
Built on top of Spotify's `basic-pitch`, it enables audio-to-MIDI transcription for web-based playback or visualization.

## Features

* Converts `.wav` audio files to `.mid` format
* MIDI files usable for playback, sheet music rendering, or visualization
* CLI-powered Python workflow using `basic-pitch`
* Project structured for future Node.js + browser-based visualization

## Technology Stack

* Python 3.11
* Node.js (planned for frontend/backend)
* [basic-pitch](https://github.com/spotify/basic-pitch)
* Optional: `tone.js`, `VexFlow`, or `OSMD` for frontend rendering

## Directory Structure

```
piano-ai-app/
├── audios/               # Input .wav files (gitignored)
├── output/               # Generated MIDI files (gitignored)
├── env311/               # Python virtual environment (gitignored)
├── run_basicpitch.py     # Optional script for automation
├── server.js             # Placeholder for backend
├── .gitignore
└── README.md
```

## Setup

1. **Clone repo**

   ```
   git clone https://github.com/yourusername/piano-ai-app.git
   cd piano-ai-app
   ```

2. **Create & activate virtual environment**

   ```
   python -m venv env311
   .\env311\Scripts\activate
   ```

3. **Install dependencies**

   ```
   pip install basic-pitch
   ```

## Usage

Convert audio to MIDI:

```
basic-pitch output audios\yourfile.wav --save-midi
```

Resulting `.mid` file will appear in `output/`.

Test it at [OnlineSequencer.net](https://onlinesequencer.net/import) or any MIDI player.

## Roadmap

* [ ] Upload `.wav` via web
* [ ] MIDI playback in browser (`tone.js`)
* [ ] Sheet music view (`VexFlow` or `OSMD`)
* [ ] Deployable Node.js integration

## License

MIT License — free to use, modify, and share.
