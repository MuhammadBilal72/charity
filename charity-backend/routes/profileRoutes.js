const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getUserProfile);
router.put("/", protect, updateUserProfile);
// router.delete("/", protect, deleteUser);

module.exports = router;
