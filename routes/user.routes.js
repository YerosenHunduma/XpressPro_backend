import express from 'express';
import * as user from '../controllers/user.controller.js';
import { registerationValidator } from '../validator/registrationValidator.js';
const router = express.Router();

router.post('/signup', registerationValidator, user.registration);

export default router;
