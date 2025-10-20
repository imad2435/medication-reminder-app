import User from '../models/User.model.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    // req.user is attached by our 'protect' middleware
    // We already fetched the user in the middleware, so we can just send it back
    const user = await User.findById(req.user.id).select('-password');

    if (user) {
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// --- ADD THIS NEW FUNCTION ---
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      // Update fields if they are provided in the request body
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      // Note: We are not handling password updates here.
      // That is often a separate, more complex flow.

      const updatedUser = await user.save();

      res.status(200).json({
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    // Handle potential duplicate email/username errors
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};