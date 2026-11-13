import { Heart } from 'lucide-react';
export default function Progress({ value, total }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur" aria-label={`${value} of ${total} surprises unlocked`}>
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <Heart key={i} size={14} className={`transition-all duration-500 ${i <= value ? 'scale-110 fill-rose text-rose' : 'text-pink-200'}`} />
        ))}
      </div>
      <span className="font-hand text-lg leading-none">{value + 1}/{total}</span>
    </div>
  );
}
