import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { FiArrowRight, FiActivity } from 'react-icons/fi';
import AnatomyLoader from "../components/AnatomyLoader";
import { useAnatomyStore } from '../store/useAnatomyStore';
import ThemeToggle from '../components/ThemeToggle';

function RotatingModel() {
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.35 * delta;
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.85, 0]}>
      <AnatomyLoader />
    </group>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme } = useAnatomyStore();

  const handleLaunch = () => {
    navigate('/viewer');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom Apple-like ease
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-white dark:bg-dark-bg transition-colors duration-300">
      {/* Top Navbar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-medical-500 flex items-center justify-center text-white shadow-premium">
            <FiActivity size={18} />
          </div>
          <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
            SOMATIC.IO
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={handleLaunch}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-medical-500 bg-medical-50 hover:bg-medical-100 dark:bg-medical-500/10 dark:hover:bg-medical-500/20 transition-all duration-200 cursor-pointer"
          >
            Enter App
          </button>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 z-10 py-10 md:py-0">
        {/* Left Side Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-lg"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-medical-200 bg-medical-50/50 dark:border-medical-500/30 dark:bg-medical-500/10 text-medical-600 dark:text-medical-200 text-[10px] font-bold uppercase tracking-wider mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-medical-500 animate-pulse"></span>
            Version 1.0 MVP
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-5"
          >
            Interactive <br />
            <span className="text-medical-500">Human Anatomy</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-8"
          >
            Explore every system of the human body in real time. Interact with high-fidelity skeletal, muscular, and organic configurations on a premium web platform.
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLaunch}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-medical-500 text-white font-semibold text-sm shadow-premium hover:bg-medical-600 transition-all duration-200 cursor-pointer"
            >
              Launch Viewer
              <FiArrowRight size={16} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Side 3D Rotating Mannequin */}
        <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center relative bg-gradient-to-b from-transparent to-gray-50/30 dark:to-dark-panel/5 rounded-3xl">
          <Canvas camera={{ position: [0, 0, 2.5], fov: 42 }}>
            <color attach="background" args={[theme === 'light' ? '#ffffff' : '#0a0a0c']} />
            <ambientLight intensity={theme === 'light' ? 0.9 : 0.4} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#0066cc" />
            <Environment preset="city" />
            
            <RotatingModel />

            <ContactShadows
              position={[0, -0.9, 0]}
              opacity={theme === 'light' ? 0.25 : 0.5}
              scale={2.5}
              blur={2.4}
              far={1.5}
            />
          </Canvas>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-gray-100 dark:border-dark-border flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium text-gray-400 dark:text-gray-500 z-10 gap-3 sm:gap-0">
        <span>© {new Date().getFullYear()} Somatic.io. All rights reserved.</span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Terms of Service</a>
          <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Documentation</a>
        </div>
      </footer>
    </div>
  );
}
