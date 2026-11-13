import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sfx } from '../lib/sfx';
export default function MusicButton() {
  const [m, setM] = useState(false);
  return (
    <button onClick={() => { sfx.setMuted(!m); setM(!m); }} aria-label={m ? 'Unmute music' : 'Mute music'}
      className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-ink shadow-sm backdrop-blur transition active:scale-90">
      {m ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
