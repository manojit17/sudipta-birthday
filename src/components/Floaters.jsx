import { useMemo } from 'react';
const CH = ['♥', '✦', '✧', '♡', '★'];
const COL = ['#ff8fb8', '#cdb4ff', '#a2d2ff', '#ffc8dd', '#fff1a8'];
export default function Floaters({ count = 16 }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i, left: Math.random() * 100, size: 12 + Math.random() * 20, dur: 9 + Math.random() * 10,
    delay: -Math.random() * 15, ch: CH[i % 5], col: COL[i % 5],
  })), [count]);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {items.map((s) => (
        <span key={s.id} className="absolute bottom-[-40px] animate-floatUp will-change-transform"
          style={{ left: `${s.left}%`, fontSize: s.size, color: s.col, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }}>{s.ch}</span>
      ))}
    </div>
  );
}
