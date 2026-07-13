/**
 * =====================================================
 * meshUtils.js
 * Utilities for working with anatomical meshes.
 * =====================================================
 */

/**
 * Creates a Map of mesh UUID -> mesh.
 *
 * UUIDs are guaranteed to be unique by Three.js.
 *
 * @param {THREE.Object3D} scene
 * @returns {Map<string, THREE.Mesh>}
 */
export function buildMeshRegistry(scene) {
  const registry = new Map();

  if (!scene) return registry;

  scene.traverse((child) => {
    if (!child.isMesh) return;

    registry.set(child.uuid, child);
  });

  return registry;
}

/**
 * Lookup mesh by UUID.
 */
export function findMesh(registry, uuid) {
  return registry.get(uuid) || null;
}