/**
 * =====================================================
 * meshUtils.js
 * Utilities for working with anatomical meshes.
 * =====================================================
 */

/**
 * Creates a Map of mesh names -> mesh objects.
 *
 * @param {THREE.Object3D} scene
 * @returns {Map<string, THREE.Mesh>}
 */
export function buildMeshRegistry(scene) {
  const registry = new Map();

  if (!scene) return registry;

  scene.traverse((child) => {
    if (!child.isMesh) return;

    const name = child.name || `Mesh_${registry.size}`;

    registry.set(name, child);
  });

  return registry;
}

/**
 * Returns a mesh by name.
 */
export function findMesh(registry, meshName) {
  return registry.get(meshName) || null;
}