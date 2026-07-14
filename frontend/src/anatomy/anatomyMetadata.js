/**
 * Default Anatomy Metadata
 *
 * Defines the canonical schema for every anatomical structure.
 * Every structure in the engine should conform to this shape.
 */

export const DEFAULT_STRUCTURE = {
  id: "",

  uuid: "",

  displayName: "",

  latinName: "",

  aliases: [],

  system: "",

  category: "",

  region: "",

  side: "",

  visible: true,

  selectable: true,

  metadata: {
    bloodSupply: [],

    innervation: [],

    muscleAttachments: [],

    articulations: [],

    clinicalNotes: [],

    relatedStructures: [],
  },
};