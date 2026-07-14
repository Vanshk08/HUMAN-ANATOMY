import { anatomyManifest } from "./anatomyManifest";

/**
 * System Manager
 *
 * Responsible for tracking anatomical systems
 * available to the engine.
 */

const systems = new Map();

/**
 * Initialize systems from the anatomy manifest.
 */
anatomyManifest.forEach((system) => {
  systems.set(system.id, {
    id: system.id,
    name: system.name,
    model: system.model,
    visible: system.visible,
    enabled: system.enabled,
    preload: system.preload,
    loaded: false,
  });
});

/**
 * Register a new anatomical system.
 */
export function registerSystem(system) {
  systems.set(system.id, system);
}

/**
 * Get a system by ID.
 */
export function getSystem(id) {
  return systems.get(id) || null;
}

/**
 * Get all registered systems.
 */
export function getSystems() {
  return Array.from(systems.values());
}

/**
 * Update a system.
 */
export function updateSystem(id, updates) {
  const system = systems.get(id);

  if (!system) return;

  systems.set(id, {
    ...system,
    ...updates,
  });
}

/**
 * Remove all systems.
 */
export function clearSystems() {
  systems.clear();
}

/**
 * Total number of registered systems.
 */
export function getSystemCount() {
  return systems.size;
}