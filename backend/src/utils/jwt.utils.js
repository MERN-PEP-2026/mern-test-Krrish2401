import jwt from 'jsonwebtoken';
import config from '../config/index.js';

/**
 * Generate JWT token
 * @param {Object} payload - Data to encode in token
 * @returns {string} JWT token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
export const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

/**
 * Generate token for user
 * @param {Object} user - User document
 * @returns {string} JWT token
 */
export const generateUserToken = (user) => {
  return generateToken({
    id: user._id,
    email: user.email,
    name: user.name,
  });
};
