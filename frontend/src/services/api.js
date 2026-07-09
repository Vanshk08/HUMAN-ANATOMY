import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Fallback data in case the backend server is not running
const FALLBACK_DATA = {
  layers: [
    { id: 'skin', name: 'Skin', displayName: 'Skin', defaultVisible: true, icon: 'skin' },
    { id: 'muscles', name: 'Muscles', displayName: 'Muscles', defaultVisible: false, icon: 'muscles' },
    { id: 'skeleton', name: 'Skeleton', displayName: 'Skeleton', defaultVisible: false, icon: 'skeleton' },
    { id: 'veins', name: 'Veins', displayName: 'Veins & Arteries', defaultVisible: false, icon: 'veins' },
    { id: 'nervous', name: 'Nervous System', displayName: 'Nervous System', defaultVisible: false, icon: 'nerves' },
    { id: 'organs', name: 'Organs', displayName: 'Internal Organs', defaultVisible: false, icon: 'organs' }
  ],
  bodyparts: [
    { id: 'head', name: 'Head', displayName: 'Head', cameraPosition: { x: 0, y: 1.75, z: 0.8 }, cameraTarget: { x: 0, y: 1.7, z: 0 } },
    { id: 'torso', name: 'Torso', displayName: 'Torso', cameraPosition: { x: 0, y: 1.2, z: 1.5 }, cameraTarget: { x: 0, y: 1.1, z: 0 } },
    { id: 'arms', name: 'Arms', displayName: 'Arms', cameraPosition: { x: 0.7, y: 1.2, z: 1.5 }, cameraTarget: { x: 0, y: 1.2, z: 0 } },
    { id: 'legs', name: 'Legs', displayName: 'Legs', cameraPosition: { x: 0, y: 0.5, z: 1.8 }, cameraTarget: { x: 0, y: 0.5, z: 0 } },
    { id: 'hands', name: 'Hands', displayName: 'Hands', cameraPosition: { x: 0.8, y: 0.9, z: 0.8 }, cameraTarget: { x: 0.7, y: 0.9, z: 0 } },
    { id: 'feet', name: 'Feet', displayName: 'Feet', cameraPosition: { x: 0, y: 0.15, z: 0.9 }, cameraTarget: { x: 0, y: 0.05, z: 0 } }
  ],
  poses: [
    { id: 'a-pose', name: 'A Pose', displayName: 'A Pose' },
    { id: 't-pose', name: 'T Pose', displayName: 'T Pose' }
  ]
};

export const getHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.warn('Backend is offline. Using frontend fallback health state.');
    return { status: 'offline', error: error.message };
  }
};

export const getLayers = async () => {
  try {
    const response = await api.get('/layers');
    return response.data;
  } catch (error) {
    console.warn('Backend is offline. Loading fallback anatomy layers.');
    return FALLBACK_DATA.layers;
  }
};

export const getBodyParts = async () => {
  try {
    const response = await api.get('/bodyparts');
    return response.data;
  } catch (error) {
    console.warn('Backend is offline. Loading fallback body parts.');
    return FALLBACK_DATA.bodyparts;
  }
};

export const getPoses = async () => {
  try {
    const response = await api.get('/poses');
    return response.data;
  } catch (error) {
    console.warn('Backend is offline. Loading fallback poses.');
    return FALLBACK_DATA.poses;
  }
};
