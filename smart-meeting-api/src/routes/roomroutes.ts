import express from 'express';
import { getRooms, getRoomById, createRoom } from '../controllers/roomcontrollers';
import { authenticateToken, isAdmin } from '../middleware/authmiddleware';

const router = express.Router();

router.get('/', authenticateToken, getRooms);
router.get('/:id', authenticateToken, getRoomById);
router.post('/', authenticateToken, isAdmin, createRoom);

export default router;
