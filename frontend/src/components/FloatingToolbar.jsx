import React from 'react';
import { useAnatomyStore } from '../store/useAnatomyStore';
import { motion } from 'framer-motion';

export default function FloatingToolbar() {
  const { layers, currentLayer, activateLayer } = useAnatomyStore();

  const getIcon = (id) => {
    switch (id) {
      case 'skin':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case 'muscles':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
            <path d="M12 3a6 6 0 0 0-9 9c0 4.5 4.5 9 9 9s9-4.5 9-9a6 6 0 0 0-9-9z" />
            <path d="M12 3v18" />
            <path d="M7 8c1.5 2 3.5 3 5 4s3.5 2 5 4" />
            <path d="M17 8c-1.5 2-3.5 3-5 4-3.5 2-5 4" />
          </svg>
        );
      case 'skeleton':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
            <line x1="12" y1="2" x2="12" y2="22" />
            <path d="M8 7c2 1 6 1 8 0" />
            <path d="M7 11c2 1.5 8 1.5 10 0" />
            <path d="M7 15c2 1.5 8 1.5 10 0" />
            <path d="M8 19c2 1 6 1 8 0" />
            <circle cx="12" cy="4" r="1.5" fill="currentColor" />
          </svg>
        );
      case 'veins':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        );
      case 'nervous':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      case 'organs':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
            <path d="M12 5v14" />
            <path d="M12 9c2-3 8-2 8 4s-4 7-8 7V9z" />
            <path d="M12 9c-2-3-8-2-8 4s4 7 8 7V9z" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col gap-2 p-1.5 rounded-2xl border border-gray-200/60 dark:border-dark-border/60 bg-white/80 dark:bg-dark-panel/80 backdrop-blur-md shadow-premium pointer-events-auto">
      {layers.map((layer) => {
        const isActive = currentLayer === layer.id;
        return (
          <div key={layer.id} className="relative group">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => activateLayer(layer.id)}
              className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isActive
                  ? 'bg-medical-500 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5'
              }`}
              aria-label={`Activate ${layer.displayName}`}
            >
              {getIcon(layer.id)}
            </motion.button>

            {/* Tooltip */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1.5 rounded-lg bg-gray-900/90 dark:bg-dark-panel text-[10px] font-medium text-white shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap border border-white/10">
              {layer.displayName}
            </div>
          </div>
        );
      })}
      {layers.length === 0 && (
        <span className="text-[10px] text-gray-400 text-center py-4">...</span>
      )}
    </div>
  );
}
