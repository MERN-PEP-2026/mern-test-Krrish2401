import jwt from 'jsonwebtoken';
import config from '../config/index.js';
export const generateToken = (payload) => {
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn,
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};


export const generateUserToken = (user) => {
    return generateToken({
        id: user._id,
        email: user.email,
        name: user.name,
    });
};
