const Campaign = require("../models/Campaigns.js");

// Create a new campaign
const createCampaign = async (req, res) => {
  const { title, description, goalAmount, image } = req.body;

  try {
    const campaign = await Campaign.create({
      title,
      description,
      goalAmount,
      image,
      createdBy: req.user.id,
    });
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Error creating campaign" });
  }
};

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find().populate("createdBy", "email contactNumber");
  res.json(campaigns);
};

const getUserCampaigns = async (req, res) => {
  try {
    // Find campaigns created by the logged-in user
    const campaigns = await Campaign.find({ createdBy: req.user.id }).populate("createdBy", "email");
    
    if (!campaigns.length) {
      return res.status(200).json({ message: "No campaigns found for this user" });
    }

    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user campaigns", error: err.message });
  }
};

// Get a single campaign
const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate("createdBy", "email");
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Error fetching campaign" });
  }
};

// Update a campaign
const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    if (campaign.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, goalAmount, image } = req.body;

    if (title) campaign.title = title;
    if (description) campaign.description = description;
    if (goalAmount) campaign.goalAmount = goalAmount;
    if (image) campaign.image = image;

    await campaign.save();
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Error updating campaign" });
  }
};

// Delete a campaign
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    if (campaign.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await campaign.remove();
    res.json({ message: "Campaign deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting campaign" });
  }
};
// POST /api/campaigns/:id/donate
const donateToCampaign = async (req, res) => {
    const { id } = req.params;
    const { amount, donorName } = req.body;
  
    try {
      const campaign = await Campaign.findById(id);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
  
      // Update the raised amount
      campaign.amountRaised += amount;
  
      // Optional: Push donor info
      campaign.donors.push({ name: donorName, amount });
  
      await campaign.save();
  
      res.status(200).json({ message: "Donation successful", campaign });
    } catch (error) {
      res.status(500).json({ message: "Donation failed", error: error.message });
    }
  };
  
module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  donateToCampaign,
  getUserCampaigns
};