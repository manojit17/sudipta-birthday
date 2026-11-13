import { useState } from 'react';
import { Title, Btn } from '../components/ui';
import Gift from '../components/Gift';
import { config } from '../config';
import { sfx } from '../lib/sfx';
import { fx } from '../components/FxCanvas';
export default function Intro({ onNext }) {
  const [open, setOpen] = useState(false);
  const go = () => {
    if (open) return;
    sfx.startMusic(config.musicSrc); sfx.chime(); setOpen(true); fx.hearts(14);
    setTimeout(onNext, 1000);
  };
  return (
    <>
      <Title>{config.intro.heading}</Title>
      <Gift open={open} onClick={go} />
      <div className="mt-10"><Btn onClick={go}>{config.intro.button}</Btn></div>
    </>
  );
}
