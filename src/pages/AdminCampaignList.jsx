import { useEffect, useState } from "react";
// import API from "../../utils/axios";
import axios from "../utils/axios.js";// Assuming you set baseURL in utils/axios.js

import { Link } from "react-router-dom";

const AdminCampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('/api/campaigns');
        setCampaigns(response.data); // Ensure this matches your state
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
  
    fetchCampaigns();
  }, []);
  

  if (loading) return <div className="text-center mt-10">Loading campaigns...</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin - All Campaigns</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="border rounded-lg p-5 shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
            <p className="text-gray-700 mb-2">{campaign.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              Goal: ₹{campaign.goalAmount} | Raised: ₹{campaign.raisedAmount}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              By: {campaign.creator?.name || "Unknown"}
            </p>
            <Link
              to={`/admin/campaign/${campaign._id}`}
              className="inline-block mt-2 text-blue-600 hover:underline"
            >
              View & Manage
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCampaignList;
