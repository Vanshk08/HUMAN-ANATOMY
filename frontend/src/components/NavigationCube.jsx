import React from 'react';
import { useAnatomyStore } from '../store/useAnatomyStore';
import { motion } from 'framer-motion';

export default function NavigationCube() {
  const { setCamera } = useAnatomyStore();

  const handleFaceClick = (face) => {
    // Mannequin center is around Y = 1.0. Set camera position and target based on face.
    // Use a small offset for top/bottom to avoid Gimbal lock.
    switch (face) {
      case 'front':
        setCamera({ x: 0, y: 1.0, z: 3.5 }, { x: 0, y: 1.0, z: 0 });
        break;
      case 'back':
        setCamera({ x: 0, y: 1.0, z: -3.5 }, { x: 0, y: 1.0, z: 0 });
        break;
      case 'left':
        setCamera({ x: -3.5, y: 1.0, z: 0 }, { x: 0, y: 1.0, z: 0 });
        break;
      case 'right':
        setCamera({ x: 3.5, y: 1.0, z: 0 }, { x: 0, y: 1.0, z: 0 });
        break;
      case 'top':
        setCamera({ x: 0.001, y: 4.0, z: 0.001 }, { x: 0, y: 1.0, z: 0 });
        break;
      case 'bottom':
        setCamera({ x: 0.001, y: -2.0, z: 0.001 }, { x: 0, y: 1.0, z: 0 });
        break;
      default:
        break;
    }
  };

  const faces = [
    { name: 'front', label: 'Front', style: 'translate-z-[30px]' },
    { name: 'back', label: 'Back', style: 'rotate-y-180 translate-z-[30px]' },
    { name: 'left', label: 'Left', style: 'rotate-y-[-90deg] translate-z-[30px]' },
    { name: 'right', label: 'Right', style: 'rotate-y-[90deg] translate-z-[30px]' },
    { name: 'top', label: 'Top', style: 'rotate-x-[90deg] translate-z-[30px]' },
    { name: 'bottom', label: 'Btm', style: 'rotate-x-[-90deg] translate-z-[30px]' },
  ];

  return (
    <div className="flex flex-col items-center p-3 rounded-2xl border border-gray-200/60 dark:border-dark-border/60 bg-white/80 dark:bg-dark-panel/80 backdrop-blur-md shadow-premium pointer-events-auto select-none">
      {/* 3D Cube Viewport */}
      <div className="w-20 h-20 flex items-center justify-center relative perspective-[400px]">
        <div 
          className="w-14 h-14 relative transform-style-3d transition-transform duration-500"
          style={{ transform: 'rotateX(-25deg) rotateY(45deg)' }}
        >
          {faces.map((f) => (
            <button
              key={f.name}
              onClick={() => handleFaceClick(f.name)}
              // inline styling is used for 3D transforms since Tailwind's default class support for arbitrary preserve-3d translates varies
              style={{
                transform: f.name === 'front' ? 'translateZ(28px)' :
                           f.name === 'back' ? 'rotateY(180deg) translateZ(28px)' :
                           f.name === 'left' ? 'rotateY(-90deg) translateZ(28px)' :
                           f.name === 'right' ? 'rotateY(90deg) translateZ(28px)' :
                           f.name === 'top' ? 'rotateX(90deg) translateZ(28px)' :
                           'rotateX(-90deg) translateZ(28px)'
              }}
              className="absolute w-full h-full inset-0 bg-white/60 dark:bg-dark-panel/60 border border-gray-300 dark:border-gray-700 flex items-center justify-center text-[9px] font-bold text-gray-500 dark:text-gray-400 hover:text-white hover:bg-medical-500 hover:border-medical-500 dark:hover:bg-medical-600 dark:hover:border-medical-600 transition-all duration-200 shadow-sm cursor-pointer"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <span className="text-[9px] font-semibold text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">Compass</span>
    </div>
  );
}
