import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axios";

const AdminCampaignView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    goalAmount: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await API.get(`/campaigns/${id}`);
        setCampaign(res.data);
      } catch (err) {
        console.error("Failed to load campaign", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await API.put(`/campaigns/${id}`, {
        title: campaign.title,
        description: campaign.description,
        goalAmount: campaign.goalAmount,
      });
      alert("Campaign updated!");
      navigate("/admin/campaigns");
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) return;
    try {
      await API.delete(`/campaigns/${id}`);
      alert("Campaign deleted.");
      navigate("/admin/campaigns");
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading campaign...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Manage Campaign</h1>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          className="w-full border p-2 rounded"
          value={campaign.title}
          onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border p-2 rounded"
          value={campaign.description}
          onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium">Goal Amount</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={campaign.goalAmount}
          onChange={(e) => setCampaign({ ...campaign, goalAmount: e.target.value })}
        />
      </div>
      <div className="flex justify-between">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleUpdate}
          disabled={updating}
        >
          {updating ? "Updating..." : "Update"}
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminCampaignView;
