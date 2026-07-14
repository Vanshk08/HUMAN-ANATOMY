/**
 * Anatomy Manifest
 *
 * Defines every anatomical system
 * available to the engine.
 */

export const anatomyManifest = [
  {
    id: "skeleton",
    name: "Skeleton",

    model: "/models/skeleton.glb",

    visible: true,

    enabled: true,
  },

  // Future systems
  {
    id: "muscles",
    name: "Muscles",

    model: "/models/muscles.glb",

    visible: false,

    enabled: false,
  },

  {
    id: "organs",
    name: "Organs",

    model: "/models/organs.glb",

    visible: false,

    enabled: false,
  },

  {
    id: "nervous",
    name: "Nervous System",

    model: "/models/nervous.glb",

    visible: false,

    enabled: false,
  },

  {
    id: "cardiovascular",
    name: "Cardiovascular System",

    model: "/models/cardiovascular.glb",

    visible: false,

    enabled: false,
    
    preload: true,
  },
];