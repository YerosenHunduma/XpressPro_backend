import bcrypt from 'bcryptjs';
import User from '../models/users.model.js';
import { validationResult } from 'express-validator';
import { errorHandler } from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';

export const registration = async (req, res, next) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        return next(new errorHandler('User with this Email address already exists', 400));
    }

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
            profile: { firstName, lastName, phoneNumber },
            email,
            password: hashedPassword
        }).save();
        res.status(201).json({ success: true, message: 'User registered successfully!' });
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
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return next(new errorHandler('Either the Email or password you entered is incorrect', 404));
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.jwtSecretKey, { expiresIn: '1d' });

        const { password: pass, ...userInfo } = user._doc;

        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'None'
        })
            .status(200)
            .json({ success: true, userInfo });
    } catch (error) {
        next(error);
    }
};

export const signout = async (req, res) => {
    res.clearCookie('access_token').status(200).json({ success: true, message: 'User signed out successfully!' });
};
