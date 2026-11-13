import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic } from 'lucide-react';
import { Title, Btn } from '../components/ui';
import { config, fill } from '../config';
import { sfx } from '../lib/sfx';
import { fx } from '../components/FxCanvas';
export default function Wish({ onNext }) {
  const [out, setOut] = useState(false);
  const [listening, setListening] = useState(false);
  const [micErr, setMicErr] = useState(false);
  const mic = useRef(null);
  const outRef = useRef(false);
  const stopMic = () => { mic.current?.stop(); mic.current = null; setListening(false); };
  function blow() {
    if (outRef.current) return;
    outRef.current = true; stopMic(); setOut(true);
    sfx.chime(); fx.confetti(innerWidth / 2, innerHeight * 0.4, 90); fx.hearts(20);
    setTimeout(() => fx.confetti(innerWidth * 0.25, innerHeight * 0.5, 50), 400);
    setTimeout(() => fx.confetti(innerWidth * 0.75, innerHeight * 0.5, 50), 700);
  }
  async function startMic() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ac = new (window.AudioContext || window.webkitAudioContext)(), an = ac.createAnalyser();
      an.fftSize = 512; ac.createMediaStreamSource(stream).connect(an);
      const buf = new Uint8Array(an.fftSize); let raf, hits = 0, on = true;
      mic.current = { stop() { on = false; cancelAnimationFrame(raf); stream.getTracks().forEach((t) => t.stop()); ac.close(); } };
      setListening(true);
      const loop = () => {
        if (!on) return;
        an.getByteTimeDomainData(buf); let s = 0;
        for (const v of buf) { const d = (v - 128) / 128; s += d * d; }
        hits = Math.sqrt(s / buf.length) > 0.18 ? hits + 1 : 0;
        if (hits > 8) return blow();
        raf = requestAnimationFrame(loop);
      };
      loop();
    } catch { setMicErr(true); }
  }
  useEffect(() => stopMic, []);
  return (
    <>
      <Title sub={config.wish.sub}>{fill(config.wish.title)}</Title>
      <div className="relative">
        <AnimatePresence>{out && <motion.div initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: [0, 1, 0.7], scale: [0.3, 2.4, 2] }} transition={{ duration: 1.6 }}
          className="absolute left-1/2 top-0 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,#fff6b0_0%,#ffd1e6aa_45%,transparent_70%)]" />}</AnimatePresence>
        <button onClick={blow} aria-label="Blow out the candle" className="flex flex-col items-center">
          <div className="relative h-10 w-5">
            <AnimatePresence>{!out ? (
              <motion.div key="f" exit={{ opacity: 0, scale: 0.2, y: -10 }} className="absolute -top-7 left-1/2 h-8 w-5 -translate-x-1/2 origin-bottom animate-flicker rounded-[50%_50%_50%_50%/70%_70%_30%_30%] bg-gradient-to-t from-orange-300 via-yellow-200 to-white shadow-[0_0_22px_8px_rgba(255,220,120,.7)]" />
            ) : (
              <motion.div key="s" initial={{ opacity: 0.8, y: 0 }} animate={{ opacity: 0, y: -40 }} transition={{ duration: 1.8 }} className="absolute -top-6 left-1/2 h-8 w-2 -translate-x-1/2 rounded-full bg-gray-300/70 blur-sm" />
            )}</AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 h-10 rounded-t bg-gradient-to-r from-sky-200 to-white" />
          </div>
          <div className="h-8 w-44 rounded-t-3xl bg-gradient-to-b from-white to-pink-100 shadow" />
          <div className="h-10 w-56 bg-gradient-to-b from-pink-300 to-pink-200" style={{ borderRadius: '0 0 6px 6px' }} />
          <div className="h-10 w-64 rounded-b-3xl bg-gradient-to-b from-violet-200 to-violet-300 shadow-xl" />
          <div className="mt-1 h-2 w-72 rounded-full bg-white/80 shadow" />
        </button>
      </div>
      <div className="mt-8 flex flex-col items-center gap-3">
        {!out ? (
          <>
            <p className="font-hand text-xl">Tap the candle{micErr ? '' : ' or blow into your mic'} 💨</p>
            {!micErr && (
              <button onClick={listening ? stopMic : startMic} className={`flex items-center gap-2 rounded-full px-5 py-2 font-hand text-xl shadow ${listening ? 'animate-pulse bg-rose text-white' : 'bg-white/80'}`}>
                <Mic size={18} /> {listening ? 'Listening… blow!' : 'Use microphone'}
              </button>
            )}
            {micErr && <p className="font-hand text-lg text-ink/70">Mic not available — just tap the candle!</p>}
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col items-center gap-4">
            <p className="font-script text-3xl">{config.wish.done}</p>
            <Btn onClick={onNext}>Next surprise</Btn>
          </motion.div>
        )}
      </div>
    </>
  );
}
