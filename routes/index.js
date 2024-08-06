import express from 'express';
import userRouter from './user.routes.js';
import globalErrorHandler from '../middlewares/globalErrorHandler.js';

const router = express.Router();

router.use('/user', userRouter);
router.use(globalErrorHandler);

export default router;
