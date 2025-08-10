import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { findUserById } from "../config/memoryStorage.js";

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');

      // Check if MongoDB is connected
      if (process.env.MONGO_URI) {
        // Get user from database
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Get user from memory storage
        req.user = findUserById(decoded.id);
      }

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect; 