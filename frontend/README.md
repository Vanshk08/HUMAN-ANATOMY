# Human Anatomy MVP - Frontend Client

This is the React 19 + Vite + Tailwind CSS + Three.js client for the Interactive Human Anatomy Viewer.

## Tech Stack
- **React 19**: Core framework
- **Vite**: Frontend bundler
- **Tailwind CSS**: Utility-first styling
- **Three.js / React Three Fiber / Drei**: 3D scene rendering, lighting, shadows, and orbit controls
- **Zustand**: Global client state management
- **Framer Motion**: Smooth interface transitions and button/panel micro-animations
- **React Icons**: Icon packs
- **Axios**: Network requests

## Key Components
- `ViewerCanvas.jsx`: Setting up the R3F scene, camera interpolation, lighting, and contact shadows.
- `AnatomyLoader.jsx`: Handles loading `/public/models/human.glb` and includes a full fallback `ProceduralMannequin` component made of individual translucent layers (Skin, Muscles, Bones, Vessels, Nerves, and Organs).
- `NavigationCube.jsx`: Interactive Blender-style navigation cube built using CSS 3D transforms.
- `Sidebar.jsx` & `FloatingToolbar.jsx`: Manage pose selections and layered visibility controls.

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the application:
   ```bash
   npm run dev
   ```
   The client will run on [http://localhost:5173](http://localhost:5173).
