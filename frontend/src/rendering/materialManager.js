/**
 * =====================================================
 * Material Manager
 *
 * Owns structure-level material state.
 *
 * Responsibilities:
 * - Clone shared GLTF materials
 * - Preserve original material appearance
 * - Apply selection highlight
 * - Restore original appearance
 *
 * Sprint 8.5.5
 * =====================================================
 */

const HIGHLIGHT_COLOR = "#38bdf8";

// =====================================================
// Initialize Materials
// =====================================================

export function initializeMaterials(scene) {
  if (!scene) return;

  scene.traverse((child) => {
    if (!child.isMesh || !child.material) {
      return;
    }

    if (child.userData.materialInitialized) {
      return;
    }

    // Every anatomical mesh gets its own material instance.
    child.material = child.material.clone();

    // Preserve the original rendering state.
    child.userData.originalMaterialState =
      captureMaterialState(child.material);

    child.userData.materialInitialized = true;
  });
}

// =====================================================
// Capture Material State
// =====================================================

function captureMaterialState(material) {
  return {
    color: material.color
      ? material.color.clone()
      : null,

    emissive: material.emissive
      ? material.emissive.clone()
      : null,

    emissiveIntensity:
      material.emissiveIntensity ?? null,
  };
}

// =====================================================
// Highlight Mesh
// =====================================================

export function highlightMesh(mesh) {
  if (
    !mesh?.isMesh ||
    !mesh.material ||
    !mesh.userData.materialInitialized
  ) {
    return;
  }

  const material = mesh.material;

  if (material.color) {
    material.color.set(HIGHLIGHT_COLOR);
  }

  if (material.emissive) {
    material.emissive.set(HIGHLIGHT_COLOR);

    material.emissiveIntensity = 0.35;
  }

  material.needsUpdate = true;
}

// =====================================================
// Restore Mesh
// =====================================================

export function restoreMesh(mesh) {
  if (
    !mesh?.isMesh ||
    !mesh.material
  ) {
    return;
  }

  const originalState =
    mesh.userData.originalMaterialState;

  if (!originalState) {
    return;
  }

  const material = mesh.material;

  if (
    material.color &&
    originalState.color
  ) {
    material.color.copy(
      originalState.color
    );
  }

  if (
    material.emissive &&
    originalState.emissive
  ) {
    material.emissive.copy(
      originalState.emissive
    );
  }

  if (
    originalState.emissiveIntensity !== null
  ) {
    material.emissiveIntensity =
      originalState.emissiveIntensity;
  }

  material.needsUpdate = true;
}