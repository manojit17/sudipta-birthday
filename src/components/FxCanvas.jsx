import { useEffect, useRef } from 'react';
const subs = new Set();
const emit = (e) => subs.forEach((f) => f(e));
export const fx = {
  confetti: (x = innerWidth / 2, y = innerHeight / 2, n = 70) => emit({ t: 'c', x, y, n }),
  hearts: (n = 22) => emit({ t: 'h', n }),
  fireworks: () => emit({ t: 'f' }),
};
const COLORS = ['#ff9ec4', '#ffc8dd', '#cdb4ff', '#a2d2ff', '#fff1a8', '#ffffff', '#ff7aa8'];
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = (a) => a[Math.floor(Math.random() * a.length)];

export default function FxCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, c = cv.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let P = [], raf, W, H, alive = true;
    const timers = [];
    const size = () => { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size(); addEventListener('resize', size);
    const add = (p) => P.push({ rot: rnd(0, 6), vr: rnd(-0.2, 0.2), ...p });
    const on = (e) => {
      if (P.length > 700) P = P.slice(-450);
      if (e.t === 'c') for (let i = 0; i < e.n; i++) { const a = rnd(0, 6.28), s = rnd(2, 9);
        add({ x: e.x, y: e.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4, g: 0.18, life: rnd(70, 120), max: 120, col: pick(COLORS), size: rnd(5, 10), k: Math.random() < 0.25 ? 'h' : 'r' }); }
      else if (e.t === 'h') for (let i = 0; i < e.n; i++)
        add({ x: rnd(0, W), y: H + 20, vx: rnd(-0.6, 0.6), vy: rnd(-3.5, -1.5), g: -0.005, life: rnd(140, 220), max: 220, col: pick(COLORS), size: rnd(14, 26), k: 'h', vr: 0 });
      else for (let b = 0; b < 8; b++) timers.push(setTimeout(() => {
        if (!alive) return;
        const x = rnd(W * 0.15, W * 0.85), y = rnd(H * 0.12, H * 0.5), col = pick(COLORS);
        for (let i = 0; i < 46; i++) { const a = (i / 46) * 6.28, s = rnd(2, 5.5);
          add({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, g: 0.05, life: rnd(50, 75), max: 75, col, size: rnd(2, 3.5), k: 'o', vr: 0 }); }
      }, b * 350));
    };
    subs.add(on);
    const loop = () => {
      c.clearRect(0, 0, W, H);
      for (const p of P) {
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= 0.985; p.rot += p.vr; p.life--;
        c.globalAlpha = Math.max(0, Math.min(1, p.life / 30)); c.fillStyle = p.col;
        if (p.k === 'o') { c.beginPath(); c.arc(p.x, p.y, p.size, 0, 6.28); c.fill(); }
        else if (p.k === 'h') { c.font = `${p.size}px serif`; c.fillText('♥', p.x, p.y); }
        else { c.save(); c.translate(p.x, p.y); c.rotate(p.rot); c.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2); c.restore(); }
      }
      P = P.filter((p) => p.life > 0);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { alive = false; subs.delete(on); timers.forEach(clearTimeout); cancelAnimationFrame(raf); removeEventListener('resize', size); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-40 h-full w-full" />;
}
