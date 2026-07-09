# Somatic.io - Interactive Human Anatomy Viewer MVP

A premium, modern 3D interactive human anatomy viewer built using **React 19**, **Vite**, **Tailwind CSS**, **Three.js**, **React Three Fiber (R3F)**, **Zustand**, **Framer Motion**, and **Node.js / Express**.

Designed with a high-end, minimal clinical style reminiscent of Apple, Figma, and modern diagnostic software.

## Architecture

This project is set up as a decoupled monorepo:
- **`frontend/`**: Interactive client application serving the 3D canvas and HUD dashboard.
- **`backend/`**: Express server providing metadata endpoints for anatomy configurations.

---

## Technical Features

1. **Procedural 3D Mannequin & GLTF Loader**:
   - Tries loading a custom GLTF model from `/public/models/human.glb` with an automated name-based visibility layer system.
   - Gracefully falls back to a custom-designed procedural 3D mannequin if the GLB is not found or fails to load.
   - Systems modeled in the procedural mannequin: **Skin (glassmorphic glass shell), Muscles (capsule musculature), Bones (skeleton rig), Blood Vessels (veins/arteries), Nervous System (yellow electrical paths), and Internal Organs (lungs, heart, stomach, liver)**.
2. **Smooth Camera Lerping**:
   - Presets focus on Head, Torso, Arms, Legs, Hands, and Feet.
   - Camera moves smoothly using interpolation vectors under OrbitControls.
3. **Blender-Style Navigation Cube**:
   - An interactive orientation cube floating in the top left, built using CSS 3D transforms (`preserve-3d`), allowing orthographic viewport snapping (Front, Back, Left, Right, Top, Bottom).
4. **Zustand Store**:
   - Synced selections, visibility checkboxes, active solo systems, and camera vectors.
5. **Decoupled API Structure**:
   - Uses Axios inside services to connect to the backend.
   - Features automated frontend fallbacks so the client runs successfully even if the backend is offline.

---

## Decoupled Ports

- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## Installation & Running

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18+ recommended) installed.

### Option 1: Quick Start (Run Both Together)
Run the following commands in the root directory:

1. Install all dependencies across the monorepo:
   ```bash
   npm run install:all
   ```

2. Start both services concurrently:
   ```bash
   npm run dev
   ```

### Option 2: Running Independently

#### 1. Setup the Backend
```bash
cd backend
npm install
npm run dev
```

#### 2. Setup the Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## API Endpoints

The backend routes serve the following details:
- `GET /api/health` - Check health status.
- `GET /api/layers` - Anatomical layers config.
- `GET /api/bodyparts` - Target body parts and camera coordinates.
- `GET /api/poses` - Supported mannequin poses (A-Pose & T-Pose).

---

## Roadmap

### Phase 2: Detailed Exploration
- Internal organ selection & label overlays.
- Anatomy search engine.
- Medical information panel pulling from an anatomy data dictionary.

### Phase 3: Interactive Simulations
- Surgical simulation sandbox.
- Disease progression animations.
- Clinical "Doctor Mode" with annotations.

### Phase 4: Clinical Overlays
- CT Scan & MRI image slice overlays.
- Collaborative multi-user consultation spaces.
