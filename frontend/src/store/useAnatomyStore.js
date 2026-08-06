import { create } from "zustand";
import { anatomySystems } from "../anatomy/anatomySystems";
import { getStructureByUUID } from "../anatomy/anatomyRegistry";

// =====================================================
// Initial Layer Visibility
// =====================================================

const initialVisibilitySettings = anatomySystems.reduce(
  (settings, system) => {
    settings[system.id] = system.defaultVisible;
    return settings;
  },
  {}
);

// =====================================================
// Initial Visceral Subsystem Visibility
// =====================================================

const initialVisceralSubsystemVisibility = {
  respiratory: true,
  digestive: true,
  urinary: true,
  endocrine: true,
  reproductive: true,
};

// =====================================================
// Anatomy Store
// =====================================================

export const useAnatomyStore = create((set, get) => ({
  // =====================================================
  // Theme
  // =====================================================

  theme: "light",

  toggleTheme: () =>
    set((state) => {
      const nextTheme =
        state.theme === "light"
          ? "dark"
          : "light";

      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return {
        theme: nextTheme,
      };
    }),

  setTheme: (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    set({
      theme,
    });
  },

  // =====================================================
  // API Data
  // =====================================================

  layers: [],
  bodyParts: [],
  poses: [],

  setLayers: (layers) =>
    set({
      layers,
    }),

  setBodyParts: (bodyParts) =>
    set({
      bodyParts,
    }),

  setPoses: (poses) =>
    set({
      poses,
    }),

  isLoading: true,

  setIsLoading: (isLoading) =>
    set({
      isLoading,
    }),

  // =====================================================
  // Layer Visibility
  // Sprint 8.6.6A + 8.6.6C
  // =====================================================

  visibilitySettings: initialVisibilitySettings,

  // -----------------------------------------------------
  // Toggle Layer Visibility
  // -----------------------------------------------------

  toggleVisibility: (layerId) =>
    set((state) => {
      const nextVisible =
        !state.visibilitySettings[layerId];

      const nextState = {
        visibilitySettings: {
          ...state.visibilitySettings,
          [layerId]: nextVisible,
        },
      };

      // -------------------------------------------------
      // Selection Hardening
      // -------------------------------------------------

      if (
        !nextVisible &&
        state.selectionContext?.system === layerId
      ) {
        nextState.selectionContext = null;
        nextState.selectedStructure = null;
      }

      // -------------------------------------------------
      // Isolation Hardening
      // -------------------------------------------------

      if (
        !nextVisible &&
        state.isolatedStructureUUID
      ) {
        const isolatedStructure =
          getStructureByUUID(
            state.isolatedStructureUUID
          );

        if (
          isolatedStructure?.system === layerId
        ) {
          nextState.isolatedStructureUUID = null;
        }
      }

      return nextState;
    }),

  // -----------------------------------------------------
  // Set Layer Visibility
  // -----------------------------------------------------

  setVisibility: (
    layerId,
    isVisible
  ) =>
    set((state) => {
      const nextState = {
        visibilitySettings: {
          ...state.visibilitySettings,
          [layerId]: isVisible,
        },
      };

      // -------------------------------------------------
      // Selection Hardening
      // -------------------------------------------------

      if (
        !isVisible &&
        state.selectionContext?.system === layerId
      ) {
        nextState.selectionContext = null;
        nextState.selectedStructure = null;
      }

      // -------------------------------------------------
      // Isolation Hardening
      // Sprint 8.6.6C
      // -------------------------------------------------

      if (
        !isVisible &&
        state.isolatedStructureUUID
      ) {
        const isolatedStructure =
          getStructureByUUID(
            state.isolatedStructureUUID
          );

        if (
          isolatedStructure?.system === layerId
        ) {
          nextState.isolatedStructureUUID = null;
        }
      }

      return nextState;
    }),

  // =====================================================
  // Visceral Subsystem Visibility
  // Sprint 8.6.6B + 8.6.6C
  // =====================================================

  visceralSubsystemVisibility:
    initialVisceralSubsystemVisibility,

  // -----------------------------------------------------
  // Toggle Single Subsystem
  // -----------------------------------------------------

  toggleVisceralSubsystem: (
    subsystemId
  ) =>
    set((state) => {
      const nextVisible =
        !state.visceralSubsystemVisibility[
          subsystemId
        ];

      const nextState = {
        visceralSubsystemVisibility: {
          ...state.visceralSubsystemVisibility,
          [subsystemId]: nextVisible,
        },
      };

      // -------------------------------------------------
      // Selection Hardening
      // -------------------------------------------------

      if (
        !nextVisible &&
        state.selectionContext?.system ===
          "visceral" &&
        state.selectionContext?.subsystem ===
          subsystemId
      ) {
        nextState.selectionContext = null;
        nextState.selectedStructure = null;
      }

      // -------------------------------------------------
      // Isolation Hardening
      // Sprint 8.6.6C
      // -------------------------------------------------

      if (
        !nextVisible &&
        state.isolatedStructureUUID
      ) {
        const isolatedStructure =
          getStructureByUUID(
            state.isolatedStructureUUID
          );

        if (
          isolatedStructure?.system === "visceral" &&
          isolatedStructure?.subsystem === subsystemId
        ) {
          nextState.isolatedStructureUUID = null;
        }
      }

      return nextState;
    }),

  // -----------------------------------------------------
  // Set Single Subsystem Visibility
  // -----------------------------------------------------

  setVisceralSubsystemVisibility: (
    subsystemId,
    isVisible
  ) =>
    set((state) => {
      const nextState = {
        visceralSubsystemVisibility: {
          ...state.visceralSubsystemVisibility,
          [subsystemId]: isVisible,
        },
      };

      // -------------------------------------------------
      // Selection Hardening
      // -------------------------------------------------

      if (
        !isVisible &&
        state.selectionContext?.system ===
          "visceral" &&
        state.selectionContext?.subsystem ===
          subsystemId
      ) {
        nextState.selectionContext = null;
        nextState.selectedStructure = null;
      }

      // -------------------------------------------------
      // Isolation Hardening
      // Sprint 8.6.6C
      // -------------------------------------------------

      if (
        !isVisible &&
        state.isolatedStructureUUID
      ) {
        const isolatedStructure =
          getStructureByUUID(
            state.isolatedStructureUUID
          );

        if (
          isolatedStructure?.system === "visceral" &&
          isolatedStructure?.subsystem === subsystemId
        ) {
          nextState.isolatedStructureUUID = null;
        }
      }

      return nextState;
    }),

  // -----------------------------------------------------
  // Set All Visceral Subsystems
  // -----------------------------------------------------

  setAllVisceralSubsystems: (
    isVisible
  ) =>
    set((state) => {
      const nextVisibility = {};

      Object.keys(
        state.visceralSubsystemVisibility
      ).forEach((subsystemId) => {
        nextVisibility[subsystemId] =
          isVisible;
      });

      const nextState = {
        visceralSubsystemVisibility:
          nextVisibility,
      };

      // -------------------------------------------------
      // Selection Hardening
      // -------------------------------------------------

      if (
        !isVisible &&
        state.selectionContext?.system ===
          "visceral" &&
        state.selectionContext?.subsystem
      ) {
        nextState.selectionContext = null;
        nextState.selectedStructure = null;
      }

      // -------------------------------------------------
      // Isolation Hardening
      // Sprint 8.6.6C
      // -------------------------------------------------

      if (
        !isVisible &&
        state.isolatedStructureUUID
      ) {
        const isolatedStructure =
          getStructureByUUID(
            state.isolatedStructureUUID
          );

        if (
          isolatedStructure?.system === "visceral" &&
          isolatedStructure?.subsystem
        ) {
          nextState.isolatedStructureUUID = null;
        }
      }

      return nextState;
    }),

  // =====================================================
  // Active Layer
  // =====================================================

  currentLayer: "skin",

  activateLayer: (layerId) =>
    set((state) => {
      const newVisibility = {
        ...state.visibilitySettings,
      };

      if (layerId !== "skin") {
        newVisibility.skin = false;
      }

      newVisibility[layerId] = true;

      return {
        currentLayer: layerId,
        visibilitySettings: newVisibility,
      };
    }),

  // =====================================================
  // Body Part Navigation
  // =====================================================

  selectedBodyPart: null,

  setSelectedBodyPart: (
    bodyPartId
  ) => {
    set({
      selectedBodyPart: bodyPartId,
    });

    if (bodyPartId) {
      const part = get().bodyParts.find(
        (bodyPart) =>
          bodyPart.id === bodyPartId
      );

      if (part) {
        set({
          cameraPosition:
            part.cameraPosition,

          cameraTarget:
            part.cameraTarget,
        });
      }
    }
  },

  // =====================================================
  // Selection State
  // =====================================================

  selectedStructure: null,
  selectionContext: null,

  // -----------------------------------------------------
  // Legacy Structure Selection
  // -----------------------------------------------------

  setSelectedStructure: (
    structure
  ) =>
    set({
      selectedStructure: structure,
    }),

  clearSelectedStructure: () =>
    set({
      selectedStructure: null,
    }),

  // -----------------------------------------------------
  // Whole-Body Selection Context
  // -----------------------------------------------------

  setSelectionContext: (
    context
  ) =>
    set({
      selectionContext: context,

      selectedStructure:
        context?.structure ?? null,
    }),

  clearSelectionContext: () =>
    set({
      selectionContext: null,
      selectedStructure: null,
    }),

  // =====================================================
  // Structure Visibility
  // Sprint 8.6
  // =====================================================

  hiddenStructureUUIDs: [],

  // -----------------------------------------------------
  // Hide Structure
  // -----------------------------------------------------

  hideStructure: (meshUUID) =>
    set((state) => {
      if (!meshUUID) {
        return state;
      }

      if (
        state.hiddenStructureUUIDs.includes(
          meshUUID
        )
      ) {
        return state;
      }

      return {
        hiddenStructureUUIDs: [
          ...state.hiddenStructureUUIDs,
          meshUUID,
        ],
      };
    }),

  // -----------------------------------------------------
  // Show Structure
  // -----------------------------------------------------

  showStructure: (meshUUID) =>
    set((state) => ({
      hiddenStructureUUIDs:
        state.hiddenStructureUUIDs.filter(
          (uuid) =>
            uuid !== meshUUID
        ),
    })),

  // -----------------------------------------------------
  // Restore All Hidden Structures
  // -----------------------------------------------------

  restoreAllStructures: () =>
    set({
      hiddenStructureUUIDs: [],
    }),

  // -----------------------------------------------------
  // Check Structure Visibility
  // -----------------------------------------------------

  isStructureHidden: (
    meshUUID
  ) =>
    get().hiddenStructureUUIDs.includes(
      meshUUID
    ),

  // =====================================================
  // Structure Isolation
  // Sprint 8.6.5
  // =====================================================

  isolatedStructureUUID: null,

  // -----------------------------------------------------
  // Isolate Structure
  // -----------------------------------------------------

  isolateStructure: (
    meshUUID
  ) => {
    if (!meshUUID) {
      return;
    }

    set({
      isolatedStructureUUID:
        meshUUID,
    });
  },

  // -----------------------------------------------------
  // Exit Isolation
  // -----------------------------------------------------

  clearIsolation: () =>
    set({
      isolatedStructureUUID: null,
    }),

  // -----------------------------------------------------
  // Check Isolation State
  // -----------------------------------------------------

  isIsolationActive: () =>
    get().isolatedStructureUUID !== null,

  // =====================================================
  // Pose
  // =====================================================

  currentPose: "a-pose",

  setCurrentPose: (
    poseId
  ) =>
    set({
      currentPose: poseId,
    }),

  // =====================================================
  // Camera
  // =====================================================

  cameraPosition: {
    x: 0,
    y: 1.0,
    z: 3.5,
  },

  cameraTarget: {
    x: 0,
    y: 1.0,
    z: 0,
  },

  setCamera: (
    position,
    target
  ) =>
    set({
      cameraPosition: position,
      cameraTarget: target,
    }),

  resetCamera: () =>
    set({
      cameraPosition: {
        x: 0,
        y: 1.0,
        z: 3.5,
      },

      cameraTarget: {
        x: 0,
        y: 1.0,
        z: 0,
      },

      selectedBodyPart: null,

      selectedStructure: null,

      selectionContext: null,
    }),
}));