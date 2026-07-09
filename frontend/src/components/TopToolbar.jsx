import React from 'react';
import { useAnatomyStore } from '../store/useAnatomyStore';
import { motion } from 'framer-motion';

export default function TopToolbar() {
  const { bodyParts, selectedBodyPart, setSelectedBodyPart } = useAnatomyStore();

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-full border border-gray-200/60 dark:border-dark-border/60 bg-white/80 dark:bg-dark-panel/80 backdrop-blur-md shadow-premium pointer-events-auto">
      {bodyParts.map((part) => {
        const isActive = selectedBodyPart === part.id;
        return (
          <motion.button
            key={part.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedBodyPart(isActive ? null : part.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              isActive
                ? 'bg-medical-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5'
            }`}
          >
            {part.displayName}
          </motion.button>
        );
      })}
      {bodyParts.length === 0 && (
        <span className="px-4 py-1.5 text-xs text-gray-400 dark:text-gray-500">Loading body parts...</span>
      )}
    </div>
  );
}
