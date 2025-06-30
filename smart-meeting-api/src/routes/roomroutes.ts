import express from 'express';
import {
  getRooms,
  getRoomById,
  createRoom
} from '../controllers/roomcontrollers';

import { isAuthenticated, isAdmin } from '../middleware/authmiddleware';

const router = express.Router();

// GET /rooms – Liste des salles (auth requise)
router.get('/', isAuthenticated, getRooms);

// GET /rooms/:id – Détail d'une salle
router.get('/:id', isAuthenticated, getRoomById);

// POST /rooms – Créer une salle (admin seulement)
router.post('/', isAuthenticated, isAdmin, createRoom);

export default router;
