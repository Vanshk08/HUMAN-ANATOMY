/**
 * Model Loader
 *
 * Responsible for resolving anatomical
 * system definitions into model paths.
 */

/**
 * Returns the model path for a system.
 */
export function getModelPath(system) {
  if (!system) return null;

  if (!system.enabled) return null;

  return system.model;
}

/**
 * Determines whether a system
 * should be loaded.
 */
export function shouldLoadSystem(system) {
  return Boolean(system?.enabled);
}