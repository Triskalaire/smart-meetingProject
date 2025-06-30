import express from 'express';
import { login } from '../controllers/authcontrollers';

const router = express.Router();

// POST /auth/login – Authentifie un utilisateur
router.post('/login', login);

export default router;
