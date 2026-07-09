import express from 'express';
import { getHealth, getLayers, getBodyParts, getPoses } from '../controllers/anatomyController.js';

const router = express.Router();

router.get('/health', getHealth);
router.get('/layers', getLayers);
router.get('/bodyparts', getBodyParts);
router.get('/poses', getPoses);

export default router;
