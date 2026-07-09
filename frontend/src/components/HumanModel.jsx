import React, { Suspense, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAnatomyStore } from '../store/useAnatomyStore';

// React Error Boundary to handle GLB loading failure and trigger procedural fallback
class GLTFErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("GLTF model failed to load. Falling back to procedural humanoid mannequin.", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Loader for the external GLTF / GLB model
function GLTFModel() {
  const { scene } = useGLTF('/models/human.glb');
  const { visibilitySettings, currentPose } = useAnatomyStore();

  // Apply visibility toggles to children inside GLTF model based on name patterns
  scene.traverse((child) => {
    if (child.isMesh) {
      const name = child.name.toLowerCase();
      
      // Determine mesh visibility based on store states
      if (name.includes('skin')) {
        child.visible = visibilitySettings.skin;
        child.material.transparent = true;
        child.material.opacity = 0.2;
      } else if (name.includes('muscle')) {
        child.visible = visibilitySettings.muscles;
      } else if (name.includes('bone') || name.includes('skeleton')) {
        child.visible = visibilitySettings.skeleton;
      } else if (name.includes('vein') || name.includes('vessel') || name.includes('blood')) {
        child.visible = visibilitySettings.veins;
      } else if (name.includes('nerve') || name.includes('nervous')) {
        child.visible = visibilitySettings.nervous;
      } else if (name.includes('organ')) {
        child.visible = visibilitySettings.organs;
      }
    }
  });

  return <primitive object={scene} scale={1.0} position={[0, 0, 0]} />;
}

// The Procedural Mannequin fallback - builds a stunning clinical 3D humanoid
function ProceduralMannequin() {
  const { visibilitySettings, currentPose, theme } = useAnatomyStore();
  
  // Refs for arm animation (A-Pose to T-Pose lerp)
  const leftArmGroup = useRef();
  const rightArmGroup = useRef();

  useFrame((state, delta) => {
    // T-pose uses 90 degrees (Math.PI / 2), A-pose uses 20 degrees (Math.PI / 9)
    const targetAngle = currentPose === 't-pose' ? Math.PI / 2 : Math.PI / 9;
    
    if (leftArmGroup.current && rightArmGroup.current) {
      // Smooth lerp arm angles
      leftArmGroup.current.rotation.z = THREE.MathUtils.lerp(
        leftArmGroup.current.rotation.z,
        targetAngle,
        10 * delta
      );
      rightArmGroup.current.rotation.z = THREE.MathUtils.lerp(
        rightArmGroup.current.rotation.z,
        -targetAngle,
        10 * delta
      );
    }
  });

  // Theme-sensitive skin styling
  const skinColor = theme === 'light' ? '#0066cc' : '#00a3ff';
  const skinOpacity = theme === 'light' ? 0.12 : 0.08;

  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================= */}
      {/* SKELETON LAYER */}
      {/* ========================================================= */}
      {visibilitySettings.skeleton && (
        <group name="skeleton">
          {/* Skull */}
          <mesh position={[0, 1.75, 0]}>
            <sphereGeometry args={[0.11, 32, 32]} />
            <meshStandardMaterial color="#f9f6f0" roughness={0.8} />
          </mesh>
          {/* Spine */}
          <mesh position={[0, 1.25, 0]}>
            <cylinderGeometry args={[0.02, 0.025, 0.8, 16]} />
            <meshStandardMaterial color="#f9f6f0" roughness={0.8} />
          </mesh>
          {/* Ribcage */}
          {[1.4, 1.32, 1.24, 1.16].map((y, i) => (
            <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.12, 0.012, 8, 32]} />
              <meshStandardMaterial color="#f9f6f0" roughness={0.8} />
            </mesh>
          ))}
          {/* Pelvis */}
          <mesh position={[0, 0.88, 0]}>
            <torusGeometry args={[0.1, 0.025, 16, 32]} />
            <meshStandardMaterial color="#f9f6f0" roughness={0.8} />
          </mesh>
          
          {/* Left Leg Bones */}
          <group position={[0.1, 0.85, 0]}>
            <mesh position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.44, 8]} />
              <meshStandardMaterial color="#f9f6f0" />
            </mesh>
            <mesh position={[0, -0.62, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.44, 8]} />
              <meshStandardMaterial color="#f9f6f0" />
            </mesh>
          </group>
          {/* Right Leg Bones */}
          <group position={[-0.1, 0.85, 0]}>
            <mesh position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.44, 8]} />
              <meshStandardMaterial color="#f9f6f0" />
            </mesh>
            <mesh position={[0, -0.62, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.44, 8]} />
              <meshStandardMaterial color="#f9f6f0" />
            </mesh>
          </group>

          {/* Left Arm Bone (Inside Group for rotation) */}
          <group ref={leftArmGroup} position={[0.16, 1.45, 0]}>
            <group position={[0.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.35, 8]} />
                <meshStandardMaterial color="#f9f6f0" />
              </mesh>
              <mesh position={[0, -0.32, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 0.32, 8]} />
                <meshStandardMaterial color="#f9f6f0" />
              </mesh>
            </group>
          </group>

          {/* Right Arm Bone (Inside Group for rotation) */}
          <group ref={rightArmGroup} position={[-0.16, 1.45, 0]}>
            <group position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.35, 8]} />
                <meshStandardMaterial color="#f9f6f0" />
              </mesh>
              <mesh position={[0, -0.32, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 0.32, 8]} />
                <meshStandardMaterial color="#f9f6f0" />
              </mesh>
            </group>
          </group>
        </group>
      )}

      {/* ========================================================= */}
      {/* MUSCLES LAYER */}
      {/* ========================================================= */}
      {visibilitySettings.muscles && (
        <group name="muscles">
          {/* Pecs */}
          <mesh position={[0.07, 1.34, 0.08]} rotation={[0.1, 0, -0.1]}>
            <capsuleGeometry args={[0.045, 0.08, 16, 16]} />
            <meshStandardMaterial color="#a63a3a" roughness={0.6} />
          </mesh>
          <mesh position={[-0.07, 1.34, 0.08]} rotation={[0.1, 0, 0.1]}>
            <capsuleGeometry args={[0.045, 0.08, 16, 16]} />
            <meshStandardMaterial color="#a63a3a" roughness={0.6} />
          </mesh>
          {/* Abs */}
          <mesh position={[0, 1.1, 0.06]}>
            <boxGeometry args={[0.14, 0.25, 0.05]} />
            <meshStandardMaterial color="#b33636" roughness={0.7} />
          </mesh>
          {/* Thighs */}
          <mesh position={[0.1, 0.63, 0.02]}>
            <capsuleGeometry args={[0.065, 0.35, 8, 16]} />
            <meshStandardMaterial color="#942a2a" />
          </mesh>
          <mesh position={[-0.1, 0.63, 0.02]}>
            <capsuleGeometry args={[0.065, 0.35, 8, 16]} />
            <meshStandardMaterial color="#942a2a" />
          </mesh>
          {/* Calves */}
          <mesh position={[0.1, 0.23, 0]}>
            <capsuleGeometry args={[0.045, 0.3, 8, 16]} />
            <meshStandardMaterial color="#942a2a" />
          </mesh>
          <mesh position={[-0.1, 0.23, 0]}>
            <capsuleGeometry args={[0.045, 0.3, 8, 16]} />
            <meshStandardMaterial color="#942a2a" />
          </mesh>
        </group>
      )}

      {/* ========================================================= */}
      {/* VEINS & ARTERIES LAYER */}
      {/* ========================================================= */}
      {visibilitySettings.veins && (
        <group name="veins">
          {/* Major Venous Trunk (Blue) */}
          <mesh position={[0.02, 1.25, 0.03]}>
            <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
            <meshBasicMaterial color="#0055ff" />
          </mesh>
          {/* Major Arterial Trunk (Red) */}
          <mesh position={[-0.02, 1.25, 0.03]}>
            <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
            <meshBasicMaterial color="#ff2200" />
          </mesh>
          {/* Arm vessels branching */}
          <mesh position={[0.2, 1.4, 0.02]} rotation={[0, 0, Math.PI/4]}>
            <cylinderGeometry args={[0.005, 0.005, 0.5, 8]} />
            <meshBasicMaterial color="#ff2200" />
          </mesh>
          <mesh position={[-0.2, 1.4, 0.02]} rotation={[0, 0, -Math.PI/4]}>
            <cylinderGeometry args={[0.005, 0.005, 0.5, 8]} />
            <meshBasicMaterial color="#0055ff" />
          </mesh>
          {/* Leg vessels branching */}
          <mesh position={[0.09, 0.6, 0.01]} rotation={[0, 0, 0.08]}>
            <cylinderGeometry args={[0.006, 0.004, 0.7, 8]} />
            <meshBasicMaterial color="#ff2200" />
          </mesh>
          <mesh position={[-0.09, 0.6, 0.01]} rotation={[0, 0, -0.08]}>
            <cylinderGeometry args={[0.006, 0.004, 0.7, 8]} />
            <meshBasicMaterial color="#0055ff" />
          </mesh>
        </group>
      )}

      {/* ========================================================= */}
      {/* NERVOUS SYSTEM LAYER */}
      {/* ========================================================= */}
      {visibilitySettings.nervous && (
        <group name="nervous">
          {/* Brain representation */}
          <mesh position={[0, 1.76, 0.02]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#eec600" roughness={0.9} emissive="#ffea75" emissiveIntensity={0.2} />
          </mesh>
          {/* Spinal Cord (Yellow core) */}
          <mesh position={[0, 1.25, -0.01]}>
            <cylinderGeometry args={[0.008, 0.008, 0.75, 8]} />
            <meshBasicMaterial color="#eedb00" />
          </mesh>
          {/* Radiating Nerves (branches) */}
          {[1.4, 1.3, 1.2, 1.1, 1.0].map((y, idx) => (
            <group key={idx} position={[0, y, 0]}>
              <mesh position={[0.08, 0, 0.01]} rotation={[0, 0, Math.PI / 12]}>
                <cylinderGeometry args={[0.003, 0.001, 0.16, 8]} />
                <meshBasicMaterial color="#eedb00" />
              </mesh>
              <mesh position={[-0.08, 0, 0.01]} rotation={[0, 0, -Math.PI / 12]}>
                <cylinderGeometry args={[0.003, 0.001, 0.16, 8]} />
                <meshBasicMaterial color="#eedb00" />
              </mesh>
            </group>
          ))}
          {/* Sciatic Nerves */}
          <mesh position={[0.06, 0.6, -0.01]} rotation={[0, 0, 0.05]}>
            <cylinderGeometry args={[0.005, 0.002, 0.7, 8]} />
            <meshBasicMaterial color="#eedb00" />
          </mesh>
          <mesh position={[-0.06, 0.6, -0.01]} rotation={[0, 0, -0.05]}>
            <cylinderGeometry args={[0.005, 0.002, 0.7, 8]} />
            <meshBasicMaterial color="#eedb00" />
          </mesh>
        </group>
      )}

      {/* ========================================================= */}
      {/* ORGANS LAYER */}
      {/* ========================================================= */}
      {visibilitySettings.organs && (
        <group name="organs">
          {/* Heart */}
          <mesh position={[-0.02, 1.32, 0.05]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#d12e2e" roughness={0.3} metalness={0.1} />
          </mesh>
          {/* Right Lung */}
          <mesh position={[0.06, 1.32, 0.01]} rotation={[0.1, 0, -0.1]}>
            <capsuleGeometry args={[0.048, 0.1, 16, 16]} />
            <meshStandardMaterial color="#f0a5a5" roughness={0.7} />
          </mesh>
          {/* Left Lung */}
          <mesh position={[-0.06, 1.32, 0.01]} rotation={[0.1, 0, 0.1]}>
            <capsuleGeometry args={[0.048, 0.1, 16, 16]} />
            <meshStandardMaterial color="#f0a5a5" roughness={0.7} />
          </mesh>
          {/* Liver */}
          <mesh position={[0.04, 1.15, 0.03]} rotation={[0, 0, -0.15]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#782f2f" roughness={0.6} />
          </mesh>
          {/* Stomach */}
          <mesh position={[-0.04, 1.11, 0.03]}>
            <sphereGeometry args={[0.052, 16, 16]} />
            <meshStandardMaterial color="#bf7547" roughness={0.5} />
          </mesh>
        </group>
      )}

      {/* ========================================================= */}
      {/* SKIN LAYER (Translucent Mannequin shell) */}
      {/* ========================================================= */}
      {visibilitySettings.skin && (
        <group name="skin">
          {/* Head */}
          <mesh position={[0, 1.75, 0]}>
            <sphereGeometry args={[0.14, 32, 32]} />
            <meshStandardMaterial 
              color={skinColor} 
              transparent 
              opacity={skinOpacity} 
              roughness={0.2} 
              metalness={0.1} 
              depthWrite={false}
            />
          </mesh>
          {/* Neck */}
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.06, 0.065, 0.15, 16]} />
            <meshStandardMaterial 
              color={skinColor} 
              transparent 
              opacity={skinOpacity} 
              depthWrite={false}
            />
          </mesh>
          {/* Torso */}
          <mesh position={[0, 1.25, 0]}>
            <cylinderGeometry args={[0.18, 0.17, 0.55, 16]} />
            <meshStandardMaterial 
              color={skinColor} 
              transparent 
              opacity={skinOpacity} 
              roughness={0.3} 
              depthWrite={false}
            />
          </mesh>
          {/* Pelvis */}
          <mesh position={[0, 0.9, 0]}>
            <sphereGeometry args={[0.18, 32, 16]} />
            <meshStandardMaterial 
              color={skinColor} 
              transparent 
              opacity={skinOpacity} 
              depthWrite={false}
            />
          </mesh>
          
          {/* Left Leg */}
          <mesh position={[0.1, 0.55, 0]}>
            <cylinderGeometry args={[0.08, 0.06, 0.8, 16]} />
            <meshStandardMaterial 
              color={skinColor} 
              transparent 
              opacity={skinOpacity} 
              depthWrite={false}
            />
          </mesh>
          {/* Right Leg */}
          <mesh position={[-0.1, 0.55, 0]}>
            <cylinderGeometry args={[0.08, 0.06, 0.8, 16]} />
            <meshStandardMaterial 
              color={skinColor} 
              transparent 
              opacity={skinOpacity} 
              depthWrite={false}
            />
          </mesh>

          {/* Animating Left Arm Group */}
          <group ref={leftArmGroup} position={[0.18, 1.45, 0]}>
            <group position={[0.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <mesh>
                <cylinderGeometry args={[0.05, 0.04, 0.4, 16]} />
                <meshStandardMaterial 
                  color={skinColor} 
                  transparent 
                  opacity={skinOpacity} 
                  depthWrite={false}
                />
              </mesh>
              {/* Left Forearm */}
              <mesh position={[0, -0.32, 0]}>
                <cylinderGeometry args={[0.04, 0.03, 0.32, 16]} />
                <meshStandardMaterial 
                  color={skinColor} 
                  transparent 
                  opacity={skinOpacity} 
                  depthWrite={false}
                />
              </mesh>
            </group>
          </group>

          {/* Animating Right Arm Group */}
          <group ref={rightArmGroup} position={[-0.18, 1.45, 0]}>
            <group position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <mesh>
                <cylinderGeometry args={[0.05, 0.04, 0.4, 16]} />
                <meshStandardMaterial 
                  color={skinColor} 
                  transparent 
                  opacity={skinOpacity} 
                  depthWrite={false}
                />
              </mesh>
              {/* Right Forearm */}
              <mesh position={[0, -0.32, 0]}>
                <cylinderGeometry args={[0.04, 0.03, 0.32, 16]} />
                <meshStandardMaterial 
                  color={skinColor} 
                  transparent 
                  opacity={skinOpacity} 
                  depthWrite={false}
                />
              </mesh>
            </group>
          </group>
        </group>
      )}
    </group>
  );
}

// Parent Wrapper component linking the GLTF and Procedural implementations
export default function HumanModel() {
  return (
    <GLTFErrorBoundary fallback={<ProceduralMannequin />}>
      <Suspense fallback={<ProceduralMannequin />}>
        <GLTFModel />
      </Suspense>
    </GLTFErrorBoundary>
  );
}
