import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { Title, Btn } from '../components/ui';
import Gift from '../components/Gift';
import { config, fill } from '../config';
import { sfx } from '../lib/sfx';
import { fx } from '../components/FxCanvas';
const F = config.finale;
export default function Finale({ onReplay }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const click = () => {
    if (open) return;
    setOpen(true); sfx.chime(); sfx.pop(); fx.confetti(innerWidth / 2, innerHeight * 0.45, 120); fx.hearts(26); fx.fireworks();
    setTimeout(() => setShow(true), 900);
  };
  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => { fx.fireworks(); fx.hearts(10); fx.confetti(innerWidth * Math.random(), innerHeight * 0.3, 40); }, 4500);
    return () => clearInterval(t);
  }, [open]);
  return (
    <>
      {!show && <Title sub={open ? undefined : F.sub}>{F.heading}</Title>}
      {!show && <Gift open={open} onClick={click} label="Open the gift" />}
      {show && (
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 14 }}
          className="max-w-md rounded-3xl bg-white/85 p-8 shadow-2xl shadow-pink-300/60 backdrop-blur">
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} className="mb-2 text-5xl">💖</motion.div>
          <h1 className="font-script text-4xl text-ink sm:text-5xl">{fill(F.title)}</h1>
          <p className="mt-4 font-hand text-2xl leading-8">{fill(F.message)}</p>
          <div className="mt-6"><Btn onClick={onReplay}><span className="inline-flex items-center gap-2"><RotateCcw size={20} />{F.replay}</span></Btn></div>
        </motion.div>
      )}
    </>
  );
}
