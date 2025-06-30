import express from 'express';
import { getBookings, createBooking } from '../controllers/bookingcontroller';
import { authenticateToken } from '../middleware/authmiddleware';
import { checkBookingConstraints } from '../middleware/rulesmiddleware';

const router = express.Router();

router.get('/', authenticateToken, getBookings);
router.post('/', authenticateToken, checkBookingConstraints, createBooking);

export default router;
