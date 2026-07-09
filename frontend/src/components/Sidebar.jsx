import React, { useState, useRef, useEffect } from 'react';
import { useAnatomyStore } from '../store/useAnatomyStore';
import { FiCheck, FiChevronDown, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
  const {
    poses,
    currentPose,
    setCurrentPose,
    layers,
    visibilitySettings,
    toggleVisibility
  } = useAnatomyStore();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedPoseName = poses.find((p) => p.id === currentPose)?.displayName || 'A Pose';

  return (
    <div className="w-60 flex flex-col gap-5 p-4 border border-gray-200/60 dark:border-dark-border/60 bg-white/80 dark:bg-dark-panel/80 backdrop-blur-md rounded-2xl shadow-premium pointer-events-auto">
      {/* Pose Selection Dropdown */}
      <div className="flex flex-col gap-2" ref={dropdownRef}>
        <label className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Pose Setup
        </label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-50/50 hover:bg-gray-100/50 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-dark-border rounded-xl transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              <FiUser className="text-gray-400" />
              {selectedPoseName}
            </span>
            <FiChevronDown className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute top-full left-0 right-0 mt-1.5 p-1 bg-white dark:bg-dark-panel border border-gray-200 dark:border-dark-border rounded-xl shadow-lg z-20"
              >
                {poses.map((pose) => (
                  <button
                    key={pose.id}
                    onClick={() => {
                      setCurrentPose(pose.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      currentPose === pose.id
                        ? 'bg-medical-50 text-medical-500 dark:bg-medical-500/10'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5'
                    }`}
                  >
                    {pose.displayName}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Visibility Checklist */}
      <div className="flex flex-col gap-2.5">
        <label className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Anatomical Systems
        </label>
        <div className="flex flex-col gap-1.5">
          {layers.map((layer) => {
            const isChecked = !!visibilitySettings[layer.id];
            return (
              <button
                key={layer.id}
                onClick={() => toggleVisibility(layer.id)}
                className="flex items-center gap-3 w-full text-left py-1 group cursor-pointer"
              >
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all duration-200 ${
                    isChecked
                      ? 'bg-medical-500 border-medical-500 text-white'
                      : 'border-gray-200 dark:border-dark-border group-hover:border-gray-400 dark:group-hover:border-gray-600'
                  }`}
                >
                  {isChecked && <FiCheck size={11} strokeWidth={3} />}
                </div>
                <span
                  className={`text-xs transition-colors ${
                    isChecked
                      ? 'text-gray-900 dark:text-white font-medium'
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  }`}
                >
                  {layer.displayName}
                </span>
              </button>
            );
          })}
          {layers.length === 0 && (
            <span className="text-xs text-gray-400 dark:text-gray-500">Loading systems...</span>
          )}
        </div>
      </div>
    </div>
  );
}
