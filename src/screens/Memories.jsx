import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Title, Btn } from '../components/ui';
import Photo from '../components/Photo';
import { config } from '../config';
import { sfx } from '../lib/sfx';
const photos = config.memories.photos, n = photos.length;
const variants = {
  enter: (d) => ({ x: d > 0 ? 320 : -320, opacity: 0, rotate: d > 0 ? 18 : -18 }),
  center: { x: 0, opacity: 1, rotate: 0 },
  exit: (d) => ({ x: d > 0 ? -320 : 320, opacity: 0, rotate: d > 0 ? -18 : 18 }),
};
export default function Memories({ onNext }) {
  const [[i, dir], set] = useState([0, 0]);
  const go = (d) => { sfx.tap(); set(([x]) => [(x + d + n) % n, d]); };
  const p = photos[i];
  return (
    <>
      <Title sub="swipe through our moments">{config.memories.title}</Title>
      <div className="relative flex h-[25rem] w-full items-center justify-center">
        <div className="absolute h-80 w-64 rotate-6 rounded bg-white/70 shadow sm:w-72" />
        <div className="absolute h-80 w-64 -rotate-6 rounded bg-white/80 shadow sm:w-72" />
        <AnimatePresence custom={dir} initial={false} mode="popLayout">
          <motion.div key={i} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.6}
            onDragEnd={(_, { offset, velocity }) => { if (offset.x < -80 || velocity.x < -400) go(1); else if (offset.x > 80 || velocity.x > 400) go(-1); }}
            className="absolute w-64 cursor-grab touch-pan-y select-none bg-white p-3 pb-4 shadow-xl shadow-pink-300/50 active:cursor-grabbing sm:w-72">
            <div className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-4deg] bg-sky/70" />
            <Photo src={p.src} alt={p.caption} />
            <p className="mt-3 font-hand text-2xl leading-none text-ink">{p.caption}</p>
            <p className="mt-1 font-hand text-lg text-rose">{p.date}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mb-5 mt-2 flex items-center gap-5">
        <button onClick={() => go(-1)} aria-label="Previous photo" className="rounded-full bg-white/80 p-2 shadow"><ChevronLeft /></button>
        <div className="flex gap-1.5">{photos.map((_, k) => <span key={k} className={`h-2 rounded-full transition-all ${k === i ? 'w-5 bg-rose' : 'w-2 bg-pink-200'}`} />)}</div>
        <button onClick={() => go(1)} aria-label="Next photo" className="rounded-full bg-white/80 p-2 shadow"><ChevronRight /></button>
      </div>
      <Btn onClick={onNext}>Next surprise</Btn>
    </>
  );
}
