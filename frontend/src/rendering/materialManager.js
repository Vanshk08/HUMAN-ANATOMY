/**
 * =====================================================
 * Material Manager
 * Initializes rendering resources.
 * =====================================================
 */

export function initializeMaterials(scene) {
  if (!scene) return;

  scene.traverse((child) => {
    if (!child.isMesh || !child.material) return;

    if (child.userData.materialInitialized) return;

    child.material = child.material.clone();

    child.userData.materialInitialized = true;
  });
}