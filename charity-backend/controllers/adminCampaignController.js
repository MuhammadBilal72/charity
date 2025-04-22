const Campaign = require("../models/Campaign");

// Get all campaigns
const getAllCampaignsAdmin = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("user", "name email");
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: "Error fetching campaigns" });
  }
};

// Get single campaign by ID
const getCampaignByIdAdmin = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate("user", "name email");
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Error fetching campaign" });
  }
};

// Update campaign by ID
const updateCampaignByAdmin = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    campaign.title = req.body.title || campaign.title;
    campaign.description = req.body.description || campaign.description;
    campaign.goalAmount = req.body.goalAmount || campaign.goalAmount;

    const updated = await campaign.save();
    res.json({ message: "Campaign updated", campaign: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating campaign" });
  }
};

// Delete campaign by ID
const deleteCampaignByAdmin = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    await campaign.remove();
    res.json({ message: "Campaign deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting campaign" });
  }
};

module.exports = {
  getAllCampaignsAdmin,
  getCampaignByIdAdmin,
  updateCampaignByAdmin,
  deleteCampaignByAdmin,
};
