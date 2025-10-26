import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const protect = async (req, res, next) => {
  let token;

  // Headers are case-insensitive, so we access them via lowercase 'authorization'
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      // Extract the token from the "Bearer <token>" string
      token = authHeader.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token and attach to the request object
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ success: false, error: 'User not found' });
      }

      // Proceed to the next middleware/controller
      next();
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
  } else {
    // This will run if the header is missing or doesn't start with "Bearer "
    return res.status(401).json({ success: false, error: 'Not authorized, no token provided' });
  }
};