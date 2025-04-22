const User = require("../models/User.js");

// Admin: Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// Admin: Get single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// Admin: Update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updated = await user.save();
    res.json({ message: "User updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Admin: Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.remove();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Assuming user ID is stored in the request after authentication
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve profile" });
  }
};

// Update the logged-in user's profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming user ID is stored in the request after authentication
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updated = await user.save();
    res.json({ message: "Profile updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile
};
