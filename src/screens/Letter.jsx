import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Title, Btn } from '../components/ui';
import { config, fill } from '../config';
import { sfx } from '../lib/sfx';
import { fx } from '../components/FxCanvas';
const L = config.letter;
export default function Letter({ onNext }) {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(false);
  const click = () => {
    if (open) return;
    sfx.chime(); setOpen(true); fx.hearts(12);
    setTimeout(() => setRead(true), 1500);
  };
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_50%_40%,#fff7fbcc,transparent_60%)]" />
      <AnimatePresence mode="wait">
        {!read ? (
          <motion.div key="env" exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center">
            <Title sub={L.tap}>{L.title}</Title>
            <button onClick={click} aria-label="Open the envelope" className="relative mt-8 h-44 w-72 sm:h-52 sm:w-80" style={{ perspective: 800 }}>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-200 to-pink-300 shadow-xl" />
              <motion.div animate={open ? { y: -70 } : { y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="absolute inset-x-4 top-3 h-36 rounded bg-white shadow">
                <div className="mx-auto mt-5 h-1.5 w-2/3 rounded bg-pink-100" /><div className="mx-auto mt-3 h-1.5 w-1/2 rounded bg-pink-100" />
              </motion.div>
              <div className="absolute inset-0 rounded-lg bg-pink-300" style={{ clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' }} />
              <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-lg bg-gradient-to-t from-pink-300 to-pink-200" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
              <motion.div animate={{ rotateX: open ? 180 : 0, zIndex: open ? 0 : 5 }} transition={{ duration: 0.6 }}
                className="absolute inset-x-0 top-0 h-[55%] origin-top bg-pink-400/90" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
              {!open && <span className="absolute left-1/2 top-[48%] z-10 -translate-x-1/2 text-3xl">💖</span>}
            </button>
          </motion.div>
        ) : (
          <motion.div key="letter" initial={{ opacity: 0, y: 60, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.8 }}
            className="w-full max-w-md rounded-sm bg-[#fffafc] bg-[repeating-linear-gradient(transparent,transparent_31px,#f6d5e3_32px)] p-6 text-left shadow-2xl shadow-pink-300/50 sm:p-8">
            <p className="font-script text-3xl text-rose">{fill(L.greeting)}</p>
            {L.paragraphs.map((t, i) => (
              <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.9 }} className="mt-4 font-hand text-2xl leading-8 text-ink">{t}</motion.p>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + L.paragraphs.length * 0.9 }} className="mt-6">
              <p className="font-hand text-2xl">{L.signoff}</p>
              <p className="font-script text-3xl text-rose">{L.signature}</p>
              <div className="mt-5 text-center"><Btn onClick={onNext}>One last thing</Btn></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
