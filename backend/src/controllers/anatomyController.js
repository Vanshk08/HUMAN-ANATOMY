// Dummy data representing human anatomy layers, body parts, and poses.
// Camera positions and targets are optimized for a 3D mannequin model of height ~2.0 units centered at Y = 1.0.

const LAYERS = [
  {
    id: 'skin',
    name: 'Skin',
    displayName: 'Skin',
    defaultVisible: true,
    icon: 'skin',
  },
  {
    id: 'muscles',
    name: 'Muscles',
    displayName: 'Muscles',
    defaultVisible: false,
    icon: 'muscles',
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    displayName: 'Skeleton',
    defaultVisible: false,
    icon: 'skeleton',
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular System',
    displayName: 'Cardiovascular System',
    defaultVisible: false,
    icon: 'cardiovascular',
  },
  {
    id: 'lymphatic',
    name: 'Lymphatic System',
    displayName: 'Lymphatic System',
    defaultVisible: false,
    icon: 'lymphatic',
  },
  {
    id: 'nervous',
    name: 'Nervous System',
    displayName: 'Nervous System',
    defaultVisible: false,
    icon: 'nerves',
  },
  {
    id: 'organs',
    name: 'Organs',
    displayName: 'Internal Organs',
    defaultVisible: false,
    icon: 'organs',
  },
];

const BODY_PARTS = [
  {
    id: 'head',
    name: 'Head',
    displayName: 'Head',
    cameraPosition: { x: 0, y: 1.75, z: 0.8 },
    cameraTarget: { x: 0, y: 1.7, z: 0 }
  },
  {
    id: 'torso',
    name: 'Torso',
    displayName: 'Torso',
    cameraPosition: { x: 0, y: 1.2, z: 1.5 },
    cameraTarget: { x: 0, y: 1.1, z: 0 }
  },
  {
    id: 'arms',
    name: 'Arms',
    displayName: 'Arms',
    cameraPosition: { x: 0.7, y: 1.2, z: 1.5 },
    cameraTarget: { x: 0, y: 1.2, z: 0 }
  },
  {
    id: 'legs',
    name: 'Legs',
    displayName: 'Legs',
    cameraPosition: { x: 0, y: 0.5, z: 1.8 },
    cameraTarget: { x: 0, y: 0.5, z: 0 }
  },
  {
    id: 'hands',
    name: 'Hands',
    displayName: 'Hands',
    cameraPosition: { x: 0.8, y: 0.9, z: 0.8 },
    cameraTarget: { x: 0.7, y: 0.9, z: 0 }
  },
  {
    id: 'feet',
    name: 'Feet',
    displayName: 'Feet',
    cameraPosition: { x: 0, y: 0.15, z: 0.9 },
    cameraTarget: { x: 0, y: 0.05, z: 0 }
  }
];

const POSES = [
  { id: 'a-pose', name: 'A Pose', displayName: 'A Pose' },
  { id: 't-pose', name: 'T Pose', displayName: 'T Pose' }
];

export const getHealth = (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
};

export const getLayers = (req, res) => {
  res.status(200).json(LAYERS);
};

export const getBodyParts = (req, res) => {
  res.status(200).json(BODY_PARTS);
};

export const getPoses = (req, res) => {
  res.status(200).json(POSES);
};
