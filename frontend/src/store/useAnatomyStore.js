import { create } from "zustand";
import { anatomySystems } from "../anatomy/anatomySystems";

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
// Sprint 8.4
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
      const nextTheme = state.theme === "light" ? "dark" : "light";

      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return { theme: nextTheme };
    }),

  setTheme: (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    set({ theme });
  },

  // =====================================================
  // API Data
  // =====================================================

  layers: [],
  bodyParts: [],
  poses: [],

  setLayers: (layers) => set({ layers }),
  setBodyParts: (bodyParts) => set({ bodyParts }),
  setPoses: (poses) => set({ poses }),

  isLoading: true,

  setIsLoading: (isLoading) =>
    set({
      isLoading,
    }),

  // =====================================================
  // Layer Visibility
  // =====================================================

  visibilitySettings: initialVisibilitySettings,

  toggleVisibility: (layerId) =>
    set((state) => ({
      visibilitySettings: {
        ...state.visibilitySettings,
        [layerId]: !state.visibilitySettings[layerId],
      },
    })),

  setVisibility: (layerId, isVisible) =>
    set((state) => ({
      visibilitySettings: {
        ...state.visibilitySettings,
        [layerId]: isVisible,
      },
    })),

  // =====================================================
  // Visceral Subsystem Visibility
  // Sprint 8.4
  // =====================================================

  visceralSubsystemVisibility:
    initialVisceralSubsystemVisibility,

  toggleVisceralSubsystem: (subsystemId) =>
    set((state) => ({
      visceralSubsystemVisibility: {
        ...state.visceralSubsystemVisibility,

        [subsystemId]:
          !state.visceralSubsystemVisibility[subsystemId],
      },
    })),

  setVisceralSubsystemVisibility: (
    subsystemId,
    isVisible
  ) =>
    set((state) => ({
      visceralSubsystemVisibility: {
        ...state.visceralSubsystemVisibility,

        [subsystemId]: isVisible,
      },
    })),

  setAllVisceralSubsystems: (isVisible) =>
    set((state) => {
      const nextVisibility = {};

      Object.keys(
        state.visceralSubsystemVisibility
      ).forEach((subsystemId) => {
        nextVisibility[subsystemId] = isVisible;
      });

      return {
        visceralSubsystemVisibility: nextVisibility,
      };
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

  setSelectedBodyPart: (bodyPartId) => {
    set({
      selectedBodyPart: bodyPartId,
    });

    if (bodyPartId) {
      const part = get().bodyParts.find(
        (bodyPart) => bodyPart.id === bodyPartId
      );

      if (part) {
        set({
          cameraPosition: part.cameraPosition,
          cameraTarget: part.cameraTarget,
        });
      }
    }
  },

  // =====================================================
  // Selected Anatomical Structure
  // =====================================================

  selectedStructure: null,

  setSelectedStructure: (structure) =>
    set({
      selectedStructure: structure,
    }),

  clearSelectedStructure: () =>
    set({
      selectedStructure: null,
    }),

  // =====================================================
  // Pose
  // =====================================================

  currentPose: "a-pose",

  setCurrentPose: (poseId) =>
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

  setCamera: (position, target) =>
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
    }),
}));