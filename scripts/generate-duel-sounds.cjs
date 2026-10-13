// Efeitos originais sintetizados localmente; sem samples ou downloads externos.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const rate = 44100;
const destination = path.resolve(__dirname, '../assets/sounds');
fs.mkdirSync(destination, { recursive: true });
let seed = 48271;
const noise = () => { seed = (seed * 16807) % 2147483647; return seed / 1073741823.5 - 1; };
const envelope = (t, length, attack = 0.008) => Math.min(1, t / attack) * Math.pow(Math.max(0, 1 - t / length), 1.6);
const tone = (t, frequency) => Math.sin(2 * Math.PI * frequency * t);
const sweep = (t, start, end, length) => Math.sin(2 * Math.PI * (start * t + (end - start) * t * t / (2 * length)));
function bell(t, frequency, length) {
  return envelope(t, length) * (tone(t, frequency) + 0.28 * tone(t, frequency * 2.01) + 0.09 * tone(t, frequency * 3.99));
}
function melody(t, notes, spacing, sustain) {
  return notes.reduce((sum, frequency, index) => {
    const offset = t - index * spacing;
    return sum + (offset >= 0 && offset < sustain ? bell(offset, frequency, sustain) : 0);
  }, 0);
}
const effects = {
  select: [0.24, t => envelope(t, 0.24) * (0.3 * noise() + 0.65 * sweep(t, 850, 1550, 0.24))],
  summon: [1.02, t => envelope(t, 1.02, 0.12) * (0.45 * sweep(t, 110, 1050, 1.02) + 0.28 * sweep(t, 165, 1580, 1.02) + 0.18 * noise()) * (0.8 + 0.2 * tone(t, 18))],
  reveal: [0.62, t => melody(t, [740, 988, 1480], 0.065, 0.46) * 0.45 + envelope(t, 0.35) * noise() * 0.12],
  clash: [0.86, t => envelope(t, 0.86, 0.003) * (0.7 * sweep(t, 160, 38, 0.86) + 0.55 * noise() * Math.exp(-t * 6) + 0.2 * tone(t, 62))],
  win: [1.32, t => melody(t, [523.25, 659.25, 783.99, 1046.5], 0.14, 0.76) * 0.4],
  lose: [1.08, t => melody(t, [392, 329.63, 261.63, 196], 0.15, 0.6) * 0.4 + envelope(t, 0.8, 0.025) * sweep(t, 92, 46, 0.8) * 0.18],
  draw: [0.84, t => melody(t, [587.33, 587.33], 0.23, 0.55) * 0.5],
  return: [0.25, t => envelope(t, 0.25) * (0.55 * sweep(t, 950, 220, 0.25) + 0.12 * noise())],
};
for (const [name, [length, sample]] of Object.entries(effects)) {
  const count = Math.ceil(length * rate);
  const samples = Float64Array.from({ length: count }, (_, index) => sample(index / rate));
  let peak = 0;
  for (const value of samples) peak = Math.max(peak, Math.abs(value));
  assert.ok(peak > 0 && Number.isFinite(peak));
  const file = Buffer.alloc(44 + count * 2);
  file.write('RIFF'); file.writeUInt32LE(file.length - 8, 4); file.write('WAVEfmt ', 8);
  file.writeUInt32LE(16, 16); file.writeUInt16LE(1, 20); file.writeUInt16LE(1, 22);
  file.writeUInt32LE(rate, 24); file.writeUInt32LE(rate * 2, 28); file.writeUInt16LE(2, 32); file.writeUInt16LE(16, 34);
  file.write('data', 36); file.writeUInt32LE(count * 2, 40);
  for (let index = 0; index < count; index++) file.writeInt16LE(Math.round(samples[index] / peak * 0.72 * 32767), 44 + index * 2);
  fs.writeFileSync(path.join(destination, `${name}.wav`), file);
  console.log(`${name}.wav: ${length.toFixed(2)} s`);
}
