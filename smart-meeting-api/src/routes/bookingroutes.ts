import express from 'express';
import {
  getBookings,
  createBooking
} from '../controllers/bookingcontrollers';

import { isAuthenticated } from '../middleware/authmiddleware';
import { checkBookingValidity } from '../middleware/rulesmiddleware';

const router = express.Router();

// GET /bookings – Réservations de l'utilisateur (admin = toutes)
router.get('/', isAuthenticated, getBookings);

// POST /bookings – Créer une réservation
router.post('/', isAuthenticated, checkBookingValidity, createBooking);

export default router;
