import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Floaters from './components/Floaters';
import FxCanvas from './components/FxCanvas';
import Progress from './components/Progress';
import MusicButton from './components/MusicButton';
import Intro from './screens/Intro';
import Passcode from './screens/Passcode';
import Balloons from './screens/Balloons';
import Wish from './screens/Wish';
import Memories from './screens/Memories';
import PhotoWall from './screens/PhotoWall';
import Letter from './screens/Letter';
import Finale from './screens/Finale';
const SCREENS = [Intro, Passcode, Balloons, Wish, Memories, PhotoWall, Letter, Finale];
export default function App() {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const next = useCallback(() => setStep((s) => Math.min(s + 1, SCREENS.length - 1)), []);
  const replay = () => { setStep(0); setRun((r) => r + 1); };
  const Screen = SCREENS[step];
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-violet-100">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-lav/40 blur-3xl" />
      <Floaters />
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between p-3 sm:p-5"><Progress value={step} total={SCREENS.length} /><MusicButton /></header>
      <main className="relative z-10 h-full overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.section key={`${run}-${step}`} initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -30, scale: 1.03 }}
            transition={{ duration: 0.45 }} className="flex min-h-full flex-col items-center justify-center px-4 pb-8 pt-20 text-center">
            <Screen onNext={next} onReplay={replay} />
          </motion.section>
        </AnimatePresence>
      </main>
      <FxCanvas />
    </div>
  );
}
