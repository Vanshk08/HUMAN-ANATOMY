import { visceralSubsystems } from "./visceralSubsystems";

/**
 * Finds whether an object belongs to one of the
 * defined visceral subsystems.
 *
 * It checks the object itself and then walks
 * upward through its parent hierarchy.
 */
export function getVisceralSubsystem(mesh) {
  let current = mesh;

  while (current) {
    for (const subsystem of Object.values(visceralSubsystems)) {
      if (subsystem.roots.includes(current.name)) {
        return subsystem.id;
      }
    }

    current = current.parent;
  }

  return null;
}

/**
 * Builds a map:
 *
 * Mesh UUID -> subsystem ID
 *
 * Example:
 * {
 *   "uuid-123": "respiratory"
 * }
 */
export function buildVisceralSubsystemRegistry(meshRegistry) {
  const subsystemRegistry = new Map();

  meshRegistry.forEach((mesh) => {
    const subsystem = getVisceralSubsystem(mesh);

    if (subsystem) {
      subsystemRegistry.set(mesh.uuid, subsystem);
    }
  });

  return subsystemRegistry;
}
