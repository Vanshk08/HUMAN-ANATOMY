import React from 'react';
import { useAnatomyStore } from '../store/useAnatomyStore';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAnatomyStore();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2.5 rounded-full border border-gray-200 bg-white/80 dark:bg-dark-panel/80 backdrop-blur-md shadow-premium text-gray-700 hover:text-medical-500 dark:border-dark-border dark:text-gray-300 dark:hover:text-medical-500 transition-colors duration-200 flex items-center justify-center pointer-events-auto"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
    </motion.button>
  );
}
