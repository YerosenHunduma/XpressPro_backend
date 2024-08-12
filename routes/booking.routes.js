import express from 'express';
import * as booking from '../controllers/booking.controller.js';
import { authMiddleware } from '../middlewares/authMidddleware.js';

const router = express.Router();

router.post('/book-journey', authMiddleware, booking.booking);

export default router;
