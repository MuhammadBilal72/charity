import User from "./models/User.js";
import bcrypt from "bcryptjs";

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Update profile (email, contactNumber, password)
export const updateProfile = async (req, res) => {
  const { email, contactNumber, password } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (email) user.email = email;
    if (contactNumber) user.contactNumber = contactNumber;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};
