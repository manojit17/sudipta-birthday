import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Title } from '../components/ui';
import { config, fill } from '../config';
import { sfx } from '../lib/sfx';
import { fx } from '../components/FxCanvas';
const POS = [{ x: 6, d: 0 }, { x: 28, d: 0.6 }, { x: 52, d: 0.3 }, { x: 74, d: 0.9 }];
export default function Balloons({ onNext }) {
  const [popped, setPopped] = useState([]);
  const done = popped.length === 4;
  const pop = (i, e) => {
    if (popped.includes(i)) return;
    const r = e.currentTarget.getBoundingClientRect();
    sfx.pop(); fx.confetti(r.left + r.width / 2, r.top + r.height / 2, 45);
    setPopped((p) => [...p, i]);
  };
  useEffect(() => { if (done) { sfx.chime(); fx.hearts(18); const t = setTimeout(onNext, 2600); return () => clearTimeout(t); } }, [done]);
  return (
    <>
      <Title sub={done ? undefined : `${popped.length}/4 popped`}>{done ? fill(config.balloons.done) : config.balloons.instruction}</Title>
      <div className="relative h-[52vh] w-full max-w-md">
        {config.balloons.colors.slice(0, 4).map((col, i) => (
          <div key={i} className="absolute top-8" style={{ left: `${POS[i].x}%` }}>
            <AnimatePresence>
              {!popped.includes(i) && (
                <motion.button aria-label={`Balloon ${i + 1}`} onClick={(e) => pop(i, e)}
                  initial={{ y: 200, opacity: 0 }} animate={{ y: [0, -16, 0], opacity: 1 }}
                  exit={{ scale: 1.8, opacity: 0, transition: { duration: 0.18 } }}
                  transition={{ y: { repeat: Infinity, duration: 2.6 + i * 0.4, delay: POS[i].d, ease: 'easeInOut' }, opacity: { duration: 0.6 } }}
                  className="relative flex flex-col items-center">
                  <div className="relative h-24 w-[4.8rem] sm:h-28 sm:w-[5.6rem]" style={{ background: col, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', boxShadow: 'inset -8px -10px 16px rgba(0,0,0,.08)' }}>
                    <div className="absolute left-3 top-3 h-6 w-3 rotate-[25deg] rounded-full bg-white/60" />
                  </div>
                  <div className="h-0 w-0 border-x-[6px] border-b-[9px] border-x-transparent" style={{ borderBottomColor: col }} />
                  <div className="h-24 w-px bg-ink/30" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
}
