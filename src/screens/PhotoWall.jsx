import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Title, Btn } from '../components/ui';
import Photo from '../components/Photo';
import { config } from '../config';
import { sfx } from '../lib/sfx';
const W = config.wall;
const rows = [];
for (let i = 0; i < W.photos.length; i += 2) rows.push(W.photos.slice(i, i + 2));
const NOTE_BG = ['bg-yellow-100', 'bg-pink-100', 'bg-sky/40'];
const Pin = () => <div className="absolute -top-3 left-1/2 z-10 h-6 w-2.5 -translate-x-1/2 rounded-sm bg-[#e6c79c] shadow ring-1 ring-black/10" />;
export default function PhotoWall({ onNext }) {
  const [sel, setSel] = useState(null);
  return (
    <>
      <Title sub={W.sub}>{W.title}</Title>
      <div className="w-full max-w-md space-y-3">
        {rows.map((row, r) => (
          <div key={r}>
            <div className="relative px-2 pt-4">
              <svg className="absolute inset-x-0 top-0 h-8 w-full" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden>
                <path d="M0 1 Q50 9 100 1" fill="none" stroke="#c9a27a" strokeWidth="0.8" vectorEffect="non-scaling-stroke" strokeDasharray="3 1.5" />
              </svg>
              <div className="relative flex justify-around pt-3">
                {row.map((p, i) => (
                  <motion.button key={i} onClick={() => { sfx.tap(); setSel(p); }} whileTap={{ scale: 0.95 }}
                    animate={{ rotate: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 4 + i, ease: 'easeInOut', delay: i * 0.5 }}
                    style={{ transformOrigin: 'top center' }} className="relative w-[44%] bg-white p-2 pb-3 shadow-lg shadow-pink-300/50">
                    <Pin />
                    <Photo src={p.src} alt={p.caption} />
                    <p className="mt-1.5 font-hand text-xl leading-none">{p.caption}</p>
                  </motion.button>
                ))}
              </div>
            </div>
            {W.notes[r] && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + r * 0.3 }}
                className={`mx-auto mt-4 w-fit max-w-[80%] ${NOTE_BG[r % 3]} px-4 py-2 font-hand text-2xl shadow ${r % 2 ? 'rotate-2' : '-rotate-2'}`}>
                {W.notes[r]}
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6"><Btn onClick={onNext}>{W.next}</Btn></div>
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-pink-100/80 p-6 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.6, rotate: -8 }} animate={{ scale: 1, rotate: -2 }} exit={{ scale: 0.6, opacity: 0 }} className="w-full max-w-xs bg-white p-3 pb-5 shadow-2xl">
              <Photo src={sel.src} alt={sel.caption} />
              <p className="mt-3 font-hand text-3xl">{sel.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
