import { motion } from 'framer-motion';
export default function Gift({ open, onClick, label = 'Gift box' }) {
  return (
    <motion.button onClick={onClick} aria-label={label} whileTap={{ scale: 0.94 }}
      animate={open ? { scale: 1.05 } : { y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
      transition={open ? {} : { repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      className="relative mx-auto h-48 w-48 sm:h-60 sm:w-60">
      <div className="absolute inset-x-3 bottom-0 h-[60%] overflow-hidden rounded-b-2xl bg-gradient-to-b from-pink-300 to-pink-400 shadow-xl">
        <div className="absolute inset-y-0 left-1/2 w-9 -translate-x-1/2 bg-white/80" />
        {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-gradient-to-t from-yellow-100 to-transparent" />}
      </div>
      <motion.div animate={open ? { y: -150, rotate: -28, opacity: 0 } : { y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}
        className="absolute inset-x-0 top-[16%] h-[26%] rounded-xl bg-gradient-to-b from-pink-200 to-pink-300 shadow-md">
        <div className="absolute inset-y-0 left-1/2 w-9 -translate-x-1/2 bg-white/90" />
        <div className="absolute -top-9 left-1/2 flex -translate-x-1/2 items-end">
          <div className="h-9 w-12 -rotate-[24deg] rounded-full border-[7px] border-white/95" />
          <div className="-ml-1 h-9 w-12 rotate-[24deg] rounded-full border-[7px] border-white/95" />
          <div className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow" />
        </div>
      </motion.div>
    </motion.button>
  );
}
