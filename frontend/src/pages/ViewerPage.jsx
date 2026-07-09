import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ViewerCanvas from '../components/ViewerCanvas';
import Sidebar from '../components/Sidebar';
import FloatingToolbar from '../components/FloatingToolbar';
import TopToolbar from '../components/TopToolbar';
import NavigationCube from '../components/NavigationCube';
import CameraControls from '../components/CameraControls';
import ThemeToggle from '../components/ThemeToggle';
import { useAnatomyStore } from '../store/useAnatomyStore';

export default function ViewerPage() {
  const navigate = useNavigate();
  const { isLoading } = useAnatomyStore();

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-white dark:bg-dark-bg transition-colors duration-300 select-none">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <ViewerCanvas />
      </div>

      {/* Floating UI HUD (Heads-Up Display) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6">
        
        {/* TOP ROW */}
        <div className="flex justify-between items-start w-full">
          {/* Top Left: Return Button + Orientation Compass */}
          <div className="flex flex-col gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-dark-panel/80 border border-gray-200/60 dark:border-dark-border/60 backdrop-blur-md shadow-premium hover:text-gray-900 dark:hover:text-white pointer-events-auto transition-colors cursor-pointer"
            >
              <FiArrowLeft size={14} />
              <span>Exit Viewer</span>
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <NavigationCube />
            </motion.div>
          </div>

          {/* Top Center: Focal Presets Toolbar */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center"
          >
            <TopToolbar />
          </motion.div>

          {/* Top Right: Dark Mode Selector */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>

        {/* MIDDLE ROW */}
        <div className="flex justify-between items-center w-full flex-grow my-4">
          {/* Left Sidebar (Anatomy / Pose settings) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="flex items-center h-full"
          >
            <Sidebar />
          </motion.div>

          {/* Right Floating Solo Layers Toolbar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="flex items-center h-full"
          >
            <FloatingToolbar />
          </motion.div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex justify-between items-end w-full">
          {/* Bottom Left: Camera Utility Presets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CameraControls />
          </motion.div>
          
          {/* Bottom Right: Interactive Status Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-3 py-1.5 rounded-xl border border-gray-200/60 dark:border-dark-border/60 bg-white/80 dark:bg-dark-panel/80 backdrop-blur-md shadow-premium text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider select-none pointer-events-auto"
          >
            {isLoading ? 'Fetching Data...' : 'Rendering 3D viewport'}
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}
