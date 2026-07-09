import React from 'react';
import { useAnatomyStore } from '../store/useAnatomyStore';
import { FiHome, FiRotateCcw, FiMaximize2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function CameraControls() {
  const { resetCamera, setCamera } = useAnatomyStore();

  const handleHomeView = () => {
    // Set to a standard nice angle and distance
    setCamera({ x: 0, y: 1.0, z: 3.5 }, { x: 0, y: 1.0, z: 0 });
  };

  const handleFitModel = () => {
    // Fit model zooms in just enough to fit the ~2m model snugly
    setCamera({ x: 0, y: 1.0, z: 2.8 }, { x: 0, y: 1.0, z: 0 });
  };

  const handleReset = () => {
    resetCamera();
  };

  const controlButtons = [
    { label: 'Home View', icon: <FiHome size={14} />, onClick: handleHomeView },
    { label: 'Fit Model', icon: <FiMaximize2 size={14} />, onClick: handleFitModel },
    { label: 'Reset Camera', icon: <FiRotateCcw size={14} />, onClick: handleReset },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-xl border border-gray-200/60 dark:border-dark-border/60 bg-white/80 dark:bg-dark-panel/80 backdrop-blur-md shadow-premium pointer-events-auto">
      {controlButtons.map((btn, idx) => (
        <motion.button
          key={idx}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={btn.onClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
          title={btn.label}
        >
          {btn.icon}
          <span>{btn.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
