import { useState } from 'react';
import { Heart } from 'lucide-react';
export default function Photo({ src, alt }) {
  const [bad, setBad] = useState(false);
  return bad ? (
    <div className="grid aspect-square w-full place-items-center bg-gradient-to-br from-pink-200 via-violet-200 to-sky-200"><Heart className="fill-white text-white" size={48} /></div>
  ) : (
    <img src={src} alt={alt} loading="lazy" draggable={false} onError={() => setBad(true)} className="aspect-square w-full object-cover" />
  );
}
