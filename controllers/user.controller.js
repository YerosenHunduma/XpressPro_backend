import bcrypt from 'bcryptjs';
import User from '../models/users.model.js';
import { validationResult } from 'express-validator';
import { errorHandler } from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';

export const registration = async (req, res, next) => {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;

    const error = validationResult(req);
    try {
        if (!error.isEmpty()) {
            const errorMessage = error.array().map((err) => err.msg);
            console.log(errorMessage);
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

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return next(new errorHandler('User not found', 404));
        }
        const isMatch = bcrypt.compare(user.password, password);

        if (!isMatch) {
            return next(new errorHandler('Either the Email or password you entered is incorrect', 404));
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.jwtSecretKey, { expiresIn: '1m' });

        const { password: pass, ...userInfo } = user._doc;

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
            .status(200)
            .json({ message: 'Signed in successfully', userInfo });
    } catch (error) {
        next(error);
    }
};
