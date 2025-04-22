const express = require("express");
const router = express.Router();

const {
  getAllCampaignsAdmin,
  getCampaignByIdAdmin,
  updateCampaignByAdmin,
  deleteCampaignByAdmin,
} = require("../controllers/adminCampaignController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getAllCampaignsAdmin);
router.get("/:id", protect, adminOnly, getCampaignByIdAdmin);
router.put("/:id", protect, adminOnly, updateCampaignByAdmin);
router.delete("/:id", protect, adminOnly, deleteCampaignByAdmin);

module.exports = router;
