import express from 'express';
import authRoutes from './routes/authroutes';
import roomRoutes from './routes/roomroutes';
import bookingRoutes from './routes/bookingroutes';

const app = express();

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);

export default app;
