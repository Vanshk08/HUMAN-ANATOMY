/**
 * Visceral Subsystem Definitions
 *
 * Maps structures inside visceral.glb to their
 * anatomical subsystem.
 *
 * IMPORTANT:
 * These names must exactly match object names
 * exported from Z-Anatomy.
 */

export const visceralSubsystems = {
  // =====================================================
  // Respiratory System
  // =====================================================

  respiratory: {
    id: "respiratory",
    displayName: "Respiratory System",

    roots: [
      "Epiglottis",
      "Mucosa_of_nasal_cavity",

      "Trachea",

      "Left_main_bronchus",
      "Right_main_bronchus",

      "Inferior_lobe_of_left_lung",
      "Superior_lobe_of_left_lung",

      "Inferior_lobe_of_right_lung",
      "Middle_lobe_of_right_lung",
      "Superior_lobe_of_right_lung",

      "Pleura",
    ],
  },

  // =====================================================
  // Digestive System
  // =====================================================

  digestive: {
    id: "digestive",
    displayName: "Digestive System",

    roots: [
      // Peritoneal / intestinal structures
      "Greater_omentum",
      "Lesser_omentum",
      "Mesocolon",

      // Large intestine
      "Ascending_colon",
      "Descending_colon",
      "Sigmoid_colon",
      "Transverse_colon",
      "Free_taenia",
      "Mesocolic_taenia",
      "Omental_taenia",
      "Vermiform_appendix",

      // Small intestine
      "Duodenum",
      "Jejunum",

      // Stomach
      "Stomach",

      // Hepatobiliary system
      "Bile_duct",

      "Anterior_lateral_segment_of_liver_(VI)",
      "Anterior_medial_segment_of_liver_(V)",
      "Left_anterior_lateral_segment_of_liver_(III)",
      "Left_medial_segment_of_liver_(IV)",
      "Left_posterior_lateral_segment_of_liver_(II)",
      "Posterior_lateral_segment_of_liver_(VII)",
      "Posterior_medial_segment_of_liver_(VIII)",
      "Posterior_segment_of_liver_(I)",

      // Pharynx
      "Laryngopharynx",
      "Nasopharynx",
      "Oropharynx",

      // Oral cavity
      "Gingiva",
      "Soft_palate",
      "Tongue",
      "Uvula_of_palate",

      // Parotid glands
      "(Accessory_parotid_gland)l",
      "(Accessory_parotid_gland)r",
      "Parotid_ductl",
      "Parotid_ductr",
      "Parotid_glandl",
      "Parotid_glandr",

      // Sublingual glands
      "Sublingual_glandl",
      "Sublingual_glandr",

      // Submandibular glands
      "Submandibular_ductl",
      "Submandibular_ductr",
      "Submandibular_glandl",
      "Submandibular_glandr",

      // Pancreatic ducts
      "Accessory_pancreatic_duct",
      "Pancreatic_duct",
    ],
  },
  urinary: {
  id: "urinary",
  displayName: "Urinary System",

  roots: [
    "Kidneyl",
    "Kidneyr",
    "Renal_pelvisl",
    "Renal_pelvisr",
    "Ureterl",
    "Ureterr",
    "Urethra",
    "Urinary_bladder",
  ],
},

endocrine: {
  id: "endocrine",
  displayName: "Endocrine System",

  roots: [
    "Adenohypophysis",
    "Neurohypophysis",

    "Inferior_parathyroid_glandl",
    "Inferior_parathyroid_glandr",
    "Superior_parathyroid_glandl",
    "Superior_parathyroid_glandr",

    "Pineal_gland",

    "Suprarenal_glandl",
    "Suprarenal_glandr",

    "Thyroid_gland",
  ],
},

reproductive: {
  id: "reproductive",
  displayName: "Reproductive System",

  roots: [
    "Corpus_cavernosum_of_penis",
    "Corpus_spongiosum_of_penis",
    "Glans_penis",

    "Ductus_deferensl",
    "Ductus_deferensr",

    "Ejaculatory_ductl",
    "Ejaculatory_ductr",

    "Epididymisl",
    "Epididymisr",

    "Prostate",

    "Seminal_glandl",
    "Seminal_glandr",

    "Testisl",
    "Testisr",
  ],
},
};

