/**
 * ==========================================================
 * modelUtils.js
 * ----------------------------------------------------------
 * Utilities for inspecting imported GLTF models.
 *
 * NOTE:
 * This file should ONLY contain model inspection utilities.
 * Mesh interaction (highlighting, visibility, isolation, etc.)
 * will live in meshUtils.js.
 * ==========================================================
 */

/**
 * Returns a simplified hierarchy of every object inside a GLTF scene.
 *
 * @param {THREE.Object3D} scene
 * @returns {Array<{
 *   name: string,
 *   type: string,
 *   isMesh: boolean
 * }>}
 */
export function getModelHierarchy(scene) {
  if (!scene) return [];

  const hierarchy = [];

  scene.traverse((child) => {
    hierarchy.push({
      name: child.name || "Unnamed",
      type: child.type,
      isMesh: child.isMesh === true,
    });
  });

  return hierarchy;
}

/**
 * Prints the model hierarchy to the browser console.
 * Useful during development to inspect exported GLTF files.
 *
 * @param {THREE.Object3D} scene
 */
export function logModelHierarchy(scene) {
  if (!scene) {
    console.warn("logModelHierarchy(): Scene is undefined.");
    return;
  }

  console.group("MODEL HIERARCHY");

  scene.traverse((child) => {
    console.log({
      name: child.name || "Unnamed",
      type: child.type,
      isMesh: child.isMesh === true,
    });
  });

  console.groupEnd();
}

/**
 * Returns all mesh objects contained in the scene.
 *
 * Useful for debugging and validation.
 *
 * @param {THREE.Object3D} scene
 * @returns {THREE.Mesh[]}
 */
export function getAllMeshes(scene) {
  if (!scene) return [];

  const meshes = [];

  scene.traverse((child) => {
    if (child.isMesh) {
      meshes.push(child);
    }
  });

  return meshes;
}

/**
 * Returns basic statistics about the imported model.
 *
 * @param {THREE.Object3D} scene
 * @returns {{
 *   totalObjects: number,
 *   totalMeshes: number
 * }}
 */
export function getModelStats(scene) {
  if (!scene) {
    return {
      totalObjects: 0,
      totalMeshes: 0,
    };
  }

  let totalObjects = 0;
  let totalMeshes = 0;

  scene.traverse((child) => {
    totalObjects++;

    if (child.isMesh) {
      totalMeshes++;
    }
  });

  return {
    totalObjects,
    totalMeshes,
  };
}