import express from 'express';
import userRoutes from './user.routes.js';
import bookingRoutes from './booking.routes.js';
import globalErrorHandler from '../middlewares/globalErrorHandler.js';

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/booking', bookingRoutes);
router.use(globalErrorHandler);

export default router;
