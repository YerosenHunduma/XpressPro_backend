import bcrypt from 'bcryptjs';
import User from '../models/users.model.js';
import { validationResult } from 'express-validator';
import { errorHandler } from '../utils/errorHandler.js';

export const registration = async (req, res, next) => {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;

    const error = validationResult(req);
    try {
        if (!error.isEmpty()) {
            const errorMessage = error.array().map((err) => err.msg);
            return next(new errorHandler(errorMessage[0], 400));
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await new User({
            profile: { firstName, lastName },
            email,
            password: hashedPassword
        }).save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        next(error);
    }
};
