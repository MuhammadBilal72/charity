const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  goal: Number,
  amountRaised: {
    type: Number,
    default: 0
  },
  donors: [
    {
      name: String,
      amount: Number,
      donatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', CampaignSchema);
