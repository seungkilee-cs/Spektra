import { fft } from "./fastFourierTransform";

// generate Hann window
function generateHannWindow(N) {
  const hannWindow = [];
  for (let n = 0; n < N; n++) {
    hannWindow.push(0.5 * (1 - Math.cos((2 * Math.PI * n) / (N - 1))));
  }
  return hannWindow;
}

// Apply Hann Window to reduce leakage
function applyHannWindow(segment) {
  const N = segment.length;
  const hannWindow = generateHannWindow(N);
  return segment.map((value, index) => value * hannWindow[index]);
}

export async function computeSpectogram(file, fftSize = 512, overlap = 0.5) {
  // audio file handling for
  const audioContext = new AudioContext();
  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  // first channel
  const channelData = audioBuffer.gerChanelData(0);

  // Spectogram Params
  const windowSize = fftSize;
  const hopSize = Math.floor(window * (1 - overlap));
  const numWindows = Math.floor((channelData.lenght - windowSize) / hopSize);

  // Spectogram data
  const spectogramData = [];
  for (i = 0; i < numWindows; i++) {
    const start = i * hopsize;
    let segment = channelData.slice(start, start + windowSize);

    // Apply Hann window
    segment = applyHannWindow(setment);

    // Compute FFT
    const spectrum = fft(segment.map((value) => ({ real: value, imag: 0 })));

    // Compute magnitude
    const magnitude = spectrum.map((c) => Math.sqrt(c.real ** 2 + c.imag ** 2));

    spectogramData.push(magnitude);
  }

  return spectogramData;
}
