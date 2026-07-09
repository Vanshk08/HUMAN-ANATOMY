import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useAnatomyStore } from '../store/useAnatomyStore';
import HumanModel from './HumanModel';

// Camera controller to interpolate between target settings and current camera vectors
function CameraController() {
  const { cameraPosition, cameraTarget } = useAnatomyStore();
  const { camera } = useThree();
  const controlsRef = useRef();

  useFrame((state, delta) => {
    // Smoothly lerp camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraPosition.x, 6 * delta);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, cameraPosition.y, 6 * delta);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraPosition.z, 6 * delta);

    if (controlsRef.current) {
      // Smoothly lerp orbit controls target
      controlsRef.current.target.x = THREE.MathUtils.lerp(controlsRef.current.target.x, cameraTarget.x, 6 * delta);
      controlsRef.current.target.y = THREE.MathUtils.lerp(controlsRef.current.target.y, cameraTarget.y, 6 * delta);
      controlsRef.current.target.z = THREE.MathUtils.lerp(controlsRef.current.target.z, cameraTarget.z, 6 * delta);
      
      // Update OrbitControls internally to reflect manual position/target shifts
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false} // Disable panning as per design requirements
      enableZoom={true}
      enableRotate={true}
      minDistance={0.5}
      maxDistance={6}
      makeDefault
    />
  );
}

export default function ViewerCanvas() {
  const { theme } = useAnatomyStore();

  return (
    <div className="w-full h-full relative canvas-container">
      <Canvas
        camera={{ position: [0, 1.0, 3.5], fov: 45 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        {/* Dynamic theme-dependent background color */}
        <color attach="background" args={[theme === 'light' ? '#ffffff' : '#0a0a0c']} />
        
        {/* Soft clinical scene lighting */}
        <ambientLight intensity={theme === 'light' ? 0.85 : 0.45} />
        
        {/* Directional Key light */}
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={theme === 'light' ? 1.4 : 1.0} 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {/* Subtle rim light for medical outline rendering */}
        <directionalLight 
          position={[-5, 3, -5]} 
          intensity={theme === 'light' ? 0.6 : 0.8} 
          color={theme === 'light' ? '#0066cc' : '#3399ff'} 
        />

        {/* Ambient environment mapping for premium metallic/specular highlights */}
        <Environment preset="city" />

        {/* Anatomy 3D Model Group */}
        <group>
          <HumanModel />
        </group>

        {/* Soft contact floor shadows */}
        <ContactShadows 
          position={[0, -0.01, 0]} 
          opacity={theme === 'light' ? 0.35 : 0.6} 
          scale={3} 
          blur={2.0} 
          far={1.5} 
        />

        {/* Camera interpolation controller */}
        <CameraController />
      </Canvas>
    </div>
  );
}
