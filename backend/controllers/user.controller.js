import User from '../models/User.model.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = { id: req.user._id, username: req.user.username, email: req.user.email };
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      const updatedUser = await user.save();
      res.status(200).json({
        success: true,
        data: { id: updatedUser._id, username: updatedUser.username, email: updatedUser.email }
      });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};