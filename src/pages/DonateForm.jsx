import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockCampaigns = {
  "1": {
    title: "Support Village Women Entrepreneurs",
    goalAmount: 50000,
    raisedAmount: 12000,
  },
  "2": {
    title: "Medical Help for Orphans",
    goalAmount: 30000,
    raisedAmount: 8000,
  },
};

const DonateForm = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const campaign = mockCampaigns[campaignId];

  const [amount, setAmount] = useState("");

  const handleDonate = async (e) => {
    e.preventDefault();

    // 🔁 MOCK API Call: In real case, replace with an actual POST to your backend
    console.log(`Donated ₹${amount} to ${campaign.title}`);

    // ✅ Redirect to Admin Campaigns page
    alert("Donation successful!");
    navigate("/admin/campaigns");
  };

  if (!campaign) {
    return <p className="text-center mt-10">Campaign not found.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md border rounded">
      <h2 className="text-xl font-bold mb-4">Donate to: {campaign.title}</h2>
      <p className="mb-2 text-gray-600">Goal: ₹{campaign.goalAmount}</p>
      <p className="mb-4 text-gray-600">Raised: ₹{campaign.raisedAmount}</p>

      <form onSubmit={handleDonate} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Donation Amount (INR)</label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default DonateForm;
