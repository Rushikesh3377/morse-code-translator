import React, { useState } from 'react';

// Morse Code Mapping
const morseCodeMap = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
  0: '-----',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  ' ': '/',
};

const MorseCodeApp = () => {
  const [text, setText] = useState('');
  const [morseCode, setMorseCode] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // default speed (in ms)
  const [volume, setVolume] = useState(1); // default volume (0 to 1)

  const handleTextChange = (event) => {
    const inputText = event.target.value.toUpperCase();
    setText(inputText);
    const morse = inputText
      .split('')
      .map((char) => morseCodeMap[char] || '')
      .join(' ');
    setMorseCode(morse);
  };

  const playMorseCode = () => {
    if (!morseCode || isPlaying) return; // Prevent playing if already playing
    setIsPlaying(true);

    const soundSequence = morseCode.split('').map((symbol, index) => {
      if (symbol === '.') return { time: index * speed, sound: 'dot' };
      if (symbol === '-') return { time: index * speed, sound: 'dash' };
      return null;
    });

    soundSequence.forEach((entry) => {
      if (entry) {
        setTimeout(() => {
          const audio = new Audio(
            entry.sound === 'dot' ? '/dot.mp3' : '/dash.mp3'
          );
          audio.volume = volume; // Adjust volume dynamically
          audio.play();
        }, entry.time);
      }
    });

    // Reset the play state once audio is done playing
    setTimeout(() => setIsPlaying(false), morseCode.length * speed);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Morse Code Converter</h1>
      <textarea
        placeholder="Type text here..."
        value={text}
        onChange={handleTextChange}
        style={{
          width: '300px',
          height: '100px',
          marginBottom: '20px',
          fontSize: '16px',
          padding: '10px',
        }}
      />
      <p>
        <strong>Morse Code:</strong> {morseCode}
      </p>
      <div>
        <label htmlFor="speed">Speed: {speed}ms</label>
        <input
          type="range"
          id="speed"
          min="100"
          max="1000"
          step="50"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          style={{ marginBottom: '20px', width: '300px' }}
        />
      </div>
      <div>
        <label htmlFor="volume">Volume: {Math.round(volume * 100)}%</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{ marginBottom: '20px', width: '300px' }}
        />
      </div>
      <button
        onClick={playMorseCode}
        disabled={isPlaying}
        style={{
          padding: '10px 20px',
          backgroundColor: isPlaying ? '#ccc' : '#4CAF50',
          color: '#fff',
          cursor: isPlaying ? 'not-allowed' : 'pointer',
        }}
      >
        {isPlaying ? 'Playing...' : 'Play Morse Code'}
      </button>
      {isPlaying && (
        <div style={{ marginTop: '20px' }}>
          <div className="spinner" style={{ fontSize: '24px' }}>
            Loading...
          </div>
        </div>
      )}
    </div>
  );
};

export default MorseCodeApp;
