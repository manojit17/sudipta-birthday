import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Delete, Heart, Lock, Unlock } from 'lucide-react';
import { Title } from '../components/ui';
import { config } from '../config';
import { sfx } from '../lib/sfx';
import { fx } from '../components/FxCanvas';
export default function Passcode({ onNext }) {
  const [code, setCode] = useState('');
  const [err, setErr] = useState(false);
  const [ok, setOk] = useState(false);
  const shake = useAnimation();
  const busy = useRef(false);
  const press = (d) => {
    if (busy.current) return;
    sfx.tap(); setErr(false);
    setCode((c) => {
      if (c.length >= 4) return c;
      const n = c + d;
      if (n.length === 4) check(n);
      return n;
    });
  };
  const check = (n) => {
    busy.current = true;
    if (n === config.passcode) {
      setOk(true); sfx.chime(); fx.confetti(innerWidth / 2, innerHeight / 2, 60);
      setTimeout(onNext, 1100);
    } else {
      sfx.wrong(); setErr(true);
      shake.start({ x: [0, -12, 12, -8, 8, 0], transition: { duration: 0.45 } });
      setTimeout(() => { setCode(''); busy.current = false; }, 650);
    }
  };
  const back = () => !busy.current && setCode((c) => c.slice(0, -1));
  useEffect(() => {
    const h = (e) => { if (/^\d$/.test(e.key)) press(e.key); else if (e.key === 'Backspace') back(); };
    addEventListener('keydown', h); return () => removeEventListener('keydown', h);
  }, []);
  return (
    <>
      <motion.div animate={ok ? { rotate: [0, -12, 12, 0], scale: [1, 1.2, 1] } : {}} className="mb-3 text-rose">
        {ok ? <Unlock size={40} /> : <Lock size={40} />}
      </motion.div>
      <Title sub={config.passcodeScreen.sub}>{config.passcodeScreen.title}</Title>
      <motion.div animate={shake} className="mb-3 flex gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`grid h-14 w-12 place-items-center rounded-2xl border-2 bg-white/80 shadow-inner transition ${err ? 'border-red-300' : 'border-pink-200'}`}>
            {code[i] && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Heart className="fill-rose text-rose" size={22} /></motion.div>}
          </div>
        ))}
      </motion.div>
      <p className="mb-4 h-14 max-w-xs font-hand text-xl text-ink/80">{err ? config.wrongMessage : ok ? 'Unlocked! 💖' : config.passcodeHint}</p>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <Key key={n} onClick={() => press(String(n))}>{n}</Key>)}
        <span />
        <Key onClick={() => press('0')}>0</Key>
        <Key onClick={back} label="Delete"><Delete size={22} /></Key>
      </div>
    </>
  );
}
const Key = ({ children, onClick, label }) => (
  <motion.button whileTap={{ scale: 0.88 }} onClick={onClick} aria-label={label}
    className="grid h-16 w-16 place-items-center rounded-full bg-white/85 font-serif text-2xl font-bold text-ink shadow-md shadow-pink-200 sm:h-[4.5rem] sm:w-[4.5rem]">
    {children}
  </motion.button>
);
