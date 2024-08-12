import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/errorHandler';
export const authMiddleware = async (req, res, next) => {
    const token = req.authMiddleware.access_token;

    try {
        if (!token) {
            return next(new errorHandler('Authorization invalid'));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            req.user = decoded._id;
            req.email = decoded.email;
            next();
        });
    } catch (error) {
        next(error);
    }
};
