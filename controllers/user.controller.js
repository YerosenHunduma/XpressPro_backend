import bcrypt from 'bcryptjs';
import User from '../models/users.model.js';
const signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {}
};
