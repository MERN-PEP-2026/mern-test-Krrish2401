import { verifyToken } from '../utils/jwt.utils.js';
import User from '../models/User.model.js';
import { AppError } from './errorHandler.js';


export const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('Access denied. No token provided.', 401));
        }

        const decoded = verifyToken(token);

        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new AppError('User no longer exists.', 401));
        }

        req.user = {
            id: user._id,
            email: user.email,
            name: user.name,
        };

        next();
    } catch (error) {
        next(error);
    }
};
