import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';

const dropArea = document.getElementById('drop');
const playBtn = document.getElementById('playBtn');
const noteDisplay = document.getElementById('noteDisplay');

let midiData = null;
let currentPart = null;

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.style.backgroundColor = '#f0f0f0';
});

dropArea.addEventListener('dragleave', () => {
  dropArea.style.backgroundColor = '';
});

dropArea.addEventListener('drop', async (e) => {
  e.preventDefault();
  dropArea.style.backgroundColor = '';
  const file = e.dataTransfer.files[0];
  if (!file) return;

  const type = file.type;

  if (type === 'audio/midi' || type === 'application/x-midi') {
    const arrayBuffer = await file.arrayBuffer();
    midiData = new Midi(arrayBuffer);
    setupPlayback();
  } else if (type.startsWith('audio/')) {
    await uploadAndConvertAudio(file)
    console.log('Uploading file to backend:', file.name);
  } else {
    alert('Unsupported file type.');
  }
});

playBtn.onclick = async () => {
  if (!midiData) return alert('No MIDI loaded.');
  await Tone.start();
  Tone.Transport.start();
  currentPart.start(0);
};

function setupPlayback() {
  const synth = new Tone.PolySynth().toDestination();
  const notes = midiData.tracks[0].notes.map(n => ({
    time: n.time,
    note: n.name,
    duration: n.duration
  }));

  currentPart = new Tone.Part((time, value) => {
    synth.triggerAttackRelease(value.note, value.duration, time);
    noteDisplay.textContent = `Note: ${value.note}`;
  }, notes).start(0);

  currentPart.loop = false;
}

async function uploadAndConvertAudio(file) {
  const formData = new FormData();
  formData.append('audio', file);

  try {
    console.log('📤 Uploading to /upload...');
    const res = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Server responded with ${res.status}: ${errText}`);
    }

    const { midiUrl } = await res.json();

    const midiArrayBuffer = await fetch(midiUrl).then(res => res.arrayBuffer());
    midiData = new Midi(midiArrayBuffer);
    setupPlayback();

  } catch (err) {
    console.error('🚨 Upload failed:', err);
    alert('Failed to convert audio to MIDI.');
  }
}

