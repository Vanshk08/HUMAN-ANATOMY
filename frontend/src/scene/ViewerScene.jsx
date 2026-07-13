import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

import { useAnatomyStore } from "../store/useAnatomyStore";
import AnatomyLoader from "../components/AnatomyLoader";

// Camera controller
function CameraController() {
  const { cameraPosition, cameraTarget } = useAnatomyStore();
  const { camera } = useThree();

  const controlsRef = useRef();

  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      cameraPosition.x,
      6 * delta
    );

    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      cameraPosition.y,
      6 * delta
    );

    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      cameraPosition.z,
      6 * delta
    );

    if (controlsRef.current) {
      controlsRef.current.target.x = THREE.MathUtils.lerp(
        controlsRef.current.target.x,
        cameraTarget.x,
        6 * delta
      );

      controlsRef.current.target.y = THREE.MathUtils.lerp(
        controlsRef.current.target.y,
        cameraTarget.y,
        6 * delta
      );

      controlsRef.current.target.z = THREE.MathUtils.lerp(
        controlsRef.current.target.z,
        cameraTarget.z,
        6 * delta
      );

      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom
      enableRotate
      minDistance={0.5}
      maxDistance={6}
      makeDefault
    />
  );
}

export default function ViewerScene() {
  const { theme } = useAnatomyStore();

  return (
    <>
      {/* Background */}
      <color
        attach="background"
        args={[theme === "light" ? "#ffffff" : "#0a0a0c"]}
      />

      {/* Lighting */}
      <ambientLight intensity={theme === "light" ? 0.85 : 0.45} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={theme === "light" ? 1.4 : 1.0}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <directionalLight
        position={[-5, 3, -5]}
        intensity={theme === "light" ? 0.6 : 0.8}
        color={theme === "light" ? "#0066cc" : "#3399ff"}
      />

      {/* Environment */}
      <Environment preset="city" />

      {/* Anatomy */}
      <group>
        <AnatomyLoader />
      </group>

      {/* Ground Shadows */}
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={theme === "light" ? 0.35 : 0.6}
        scale={3}
        blur={2}
        far={1.5}
      />

      {/* Camera */}
      <CameraController />
    </>
  );
}