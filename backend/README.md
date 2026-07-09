# Human Anatomy MVP - Backend API

This is the Node.js + Express backend serving API endpoints for the Human Anatomy MVP.

## Tech Stack
- **Node.js**: Runtime environment
- **Express**: Web framework
- **Cors**: Cross-origin resource sharing
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger
- **Nodemon**: Auto-restarting development server

## Endpoints
- `GET /api/health` - Check API health status.
- `GET /api/layers` - Retrieve human anatomy layer configurations (e.g., Skin, Muscles, Skeleton).
- `GET /api/bodyparts` - Retrieve body parts mapping and camera focal locations.
- `GET /api/poses` - Retrieve available character poses (e.g., A-Pose, T-Pose).

## Running the Backend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run in development mode:
   ```bash
   npm run dev
   ```
   The backend will run on [http://localhost:5000](http://localhost:5000).
