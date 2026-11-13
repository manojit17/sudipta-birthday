// Tiny WebAudio engine: sound effects + built-in music box tune (no assets needed).
let ctx, master, muted = false, timer, el, started = false, step = 0;
const ac = () => {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = muted ? 0 : 1; master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
};
function tone(f, t0, d, type = 'sine', v = 0.12) {
  const c = ac(), o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.value = f;
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(v, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
  o.connect(g); g.connect(master); o.start(t0); o.stop(t0 + d + 0.05);
}
const prog = [[261.6, 329.6, 392], [220, 261.6, 329.6], [174.6, 220, 261.6], [196, 246.9, 293.7]];
function tick() {
  const c = ac(), bar = prog[Math.floor(step / 8) % 4];
  tone(bar[[0, 1, 2, 1, 0, 1, 2, 1][step % 8]] * 2, c.currentTime, 1.1, 'sine', 0.06);
  if (step % 8 === 0) tone(bar[0] / 2, c.currentTime, 2.5, 'triangle', 0.05);
  if (step % 4 === 2) tone(bar[2] * 4, c.currentTime + 0.05, 0.5, 'sine', 0.025);
  step++;
}
export const sfx = {
  pop() {
    const c = ac(), len = c.sampleRate * 0.12, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const s = c.createBufferSource(), g = c.createGain(); g.gain.value = 0.6; s.buffer = b; s.connect(g); g.connect(master); s.start();
  },
  chime() { const c = ac(); [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, c.currentTime + i * 0.09, 0.7, 'triangle', 0.1)); },
  tap() { tone(880, ac().currentTime, 0.12, 'sine', 0.08); },
  wrong() { const t = ac().currentTime; tone(220, t, 0.18, 'square', 0.04); tone(165, t + 0.12, 0.25, 'square', 0.04); },
  startMusic(src) {
    if (started) return; started = true; ac();
    if (src) { el = new Audio(src); el.loop = true; el.volume = 0.5; el.muted = muted; el.play().catch(() => {}); }
    else timer = setInterval(tick, 380);
  },
  setMuted(m) { muted = m; if (master) master.gain.value = m ? 0 : 1; if (el) el.muted = m; },
  isMuted: () => muted,
};
