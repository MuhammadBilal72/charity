const express = require("express");
const router = express.Router();
const {
  createCampaign,
  getUserCampaigns,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  donateToCampaign
} = require("../controllers/campaignController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createCampaign);
router.get("/my", protect, getUserCampaigns);
router.get("/", getAllCampaigns);
router.get("/:id", getCampaignById);
router.put("/:id", protect, updateCampaign);
router.delete("/:id", protect, deleteCampaign);
router.post("/:id/donate", protect, donateToCampaign);

module.exports = router;
