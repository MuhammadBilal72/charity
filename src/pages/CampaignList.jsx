import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axios";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await API.get("/campaigns");
        setCampaigns(res.data);
      } catch (err) {
        console.error("Failed to load campaigns", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading campaigns...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <Link
              to={`/campaign/${campaign._id}`}
              key={campaign._id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src="https://cleverads.com.ph/blog/wp-content/uploads/2023/03/Campaign_la_gi_6_loai_hinh_Campaign_co_ban-768x512-1.webp"
                alt="Campaign"
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold mb-1">{campaign.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Target: ₹{campaign.targetAmount}
              </p>
              <p className="text-sm text-gray-500">
                {campaign.description.slice(0, 100)}...
              </p>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full">No campaigns available.</p>
        )}
      </div>
    </div>
  );
};

export default CampaignList;
