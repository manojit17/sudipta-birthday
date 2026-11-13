import { motion } from 'framer-motion';
export const Title = ({ children, sub }) => (
  <div className="mb-6 max-w-md">
    <h1 className="font-script text-4xl leading-tight text-ink sm:text-5xl">{children}</h1>
    {sub && <p className="mt-2 font-hand text-2xl text-rose">{sub}</p>}
  </div>
);
export const Btn = ({ children, ...p }) => (
  <motion.button whileTap={{ scale: 0.94 }} whileHover={{ scale: 1.04 }} {...p}
    className="rounded-full bg-gradient-to-r from-rose to-lav px-7 py-3 font-hand text-2xl font-bold text-white shadow-lg shadow-pink-300/50">
    {children}
  </motion.button>
);
