import { create } from 'zustand';

export const useAnatomyStore = create((set, get) => ({
  // =====================================================
  // Theme
  // =====================================================

  theme: 'light',

  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';

      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return { theme: nextTheme };
    }),

  setTheme: (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
  setIsLoading: (isLoading) => set({ isLoading }),

  // =====================================================
  // Layer Visibility
  // =====================================================

  visibilitySettings: {
    skin: true,
    muscles: false,
    skeleton: false,
    veins: false,
    nervous: false,
    organs: false,
  },

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
  // Active Layer
  // =====================================================

  currentLayer: 'skin',

  activateLayer: (layerId) =>
    set((state) => {
      const newVisibility = {
        ...state.visibilitySettings,
      };

      if (layerId !== 'skin') {
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
    set({ selectedBodyPart: bodyPartId });

    if (bodyPartId) {
      const part = get().bodyParts.find((b) => b.id === bodyPartId);

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
  // (NEW - Sprint 3.3)
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

  currentPose: 'a-pose',

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