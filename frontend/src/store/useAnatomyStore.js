import { create } from 'zustand';

export const useAnatomyStore = create((set, get) => ({
  // Theme state
  theme: 'light',
  toggleTheme: () => set((state) => {
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

  // API Config Data
  layers: [],
  bodyParts: [],
  poses: [],
  setLayers: (layers) => set({ layers }),
  setBodyParts: (bodyParts) => set({ bodyParts }),
  setPoses: (poses) => set({ poses }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),

  // Left Checklist Visibility
  visibilitySettings: {
    skin: true,
    muscles: false,
    skeleton: false,
    veins: false,
    nervous: false,
    organs: false
  },
  toggleVisibility: (layerId) => set((state) => ({
    visibilitySettings: {
      ...state.visibilitySettings,
      [layerId]: !state.visibilitySettings[layerId]
    }
  })),
  setVisibility: (layerId, isVisible) => set((state) => ({
    visibilitySettings: {
      ...state.visibilitySettings,
      [layerId]: isVisible
    }
  })),

  // Right Toolbar - "Activate Layer" (Solo Mode)
  currentLayer: 'skin',
  activateLayer: (layerId) => set((state) => {
    // When activating a layer, make it visible and turn off other overlapping visual systems (e.g. Skin) to highlight it
    const newVisibility = { ...state.visibilitySettings };
    
    // Solo logic: If we activate skeleton/muscles/organs/nervous/veins, hide the skin so we can see inside!
    if (layerId !== 'skin') {
      newVisibility.skin = false;
    }
    
    // Make sure the selected layer is turned on
    newVisibility[layerId] = true;

    return {
      currentLayer: layerId,
      visibilitySettings: newVisibility
    };
  }),

  // Top Toolbar - Active Body Part Focus
  selectedBodyPart: null,
  setSelectedBodyPart: (bodyPartId) => {
    set({ selectedBodyPart: bodyPartId });
    if (bodyPartId) {
      const part = get().bodyParts.find(b => b.id === bodyPartId);
      if (part) {
        set({
          cameraPosition: part.cameraPosition,
          cameraTarget: part.cameraTarget
        });
      }
    }
  },

  // Left Sidebar Pose Selection
  currentPose: 'a-pose',
  setCurrentPose: (poseId) => set({ currentPose: poseId }),

  // Camera State (shared with OrbitControls for smooth lerping)
  cameraPosition: { x: 0, y: 1.0, z: 3.5 },
  cameraTarget: { x: 0, y: 1.0, z: 0 },
  setCamera: (position, target) => set({ cameraPosition: position, cameraTarget: target }),
  resetCamera: () => set({
    cameraPosition: { x: 0, y: 1.0, z: 3.5 },
    cameraTarget: { x: 0, y: 1.0, z: 0 },
    selectedBodyPart: null
  })
}));
