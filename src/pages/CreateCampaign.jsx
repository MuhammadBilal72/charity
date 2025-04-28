import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';

const CampaignDetail = () => {
  const { id } = useParams(); // Get the campaign ID from URL params
  const { user } = useContext(AuthContext);
  const [campaign, setCampaign] = useState(null); // For existing campaign
  const [donation, setDonation] = useState("");
  const [editMode, setEditMode] = useState(false); // Whether we are editing or viewing
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });
  const [form, setForm] = useState({
    title: "",
    description: "",
    goal: "",
    endDate: "",
  });
  const navigate = useNavigate();

  // Fetch existing campaign when editing
  useEffect(() => {
    if (id) {
      const fetchCampaign = async () => {
        try {
          const res = await API.get(`/campaigns/${id}`);
          setCampaign(res.data);
          setForm(res.data);
        } catch {
          toast.error('Error loading campaign');
        }
      };
      fetchCampaign();
    }
  }, [id]);

  const isLoggedIn = !!user;
  const isOwner = isLoggedIn && user?._id === campaign?.createdBy?._id;
  const isAdmin = isLoggedIn && user?.role === "admin";
  
  const handleDelete = async () => {
    if (window.confirm("Delete this campaign?")) {
      try {
        await API.delete(`/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success('Campaign deleted successfully!');
        navigate("/dashboard");
      } catch (error) {
        toast.error('Error deleting campaign');
      }
    }
  };

  const handleUpdate = async () => {
    if (id) {
      try {
        await API.put(`/campaigns/${id}`, form, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEditMode(false);
        setCampaign({ ...campaign, ...form });
        toast.success('Campaign updated successfully!');
      } catch (error) {
        toast.error('Error updating campaign');
      }
    }
  };

  const handleCreate = async () => {
    try {
      await API.post(`/campaigns`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success('Campaign created successfully!');
      navigate("/dashboard");
    } catch (error) {
      toast.error('Error creating campaign');
    }
  };

  const handleDonation = async () => {
    try {
      await API.post(`/campaigns/${id}/donate`, { amount: donation, donorName: user.name }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success('Donation successful!');
      setDonation("");
      setShowDonationModal(false);
      // Reset card details
      setCardDetails({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: ""
      });
      // Refresh campaign data to show updated donations
      const res = await API.get(`/campaigns/${id}`);
      setCampaign(res.data);
    } catch (error) {
      toast.error('Error making donation');
    }
  };

  const openDonationModal = () => {
    setShowDonationModal(true);
  };

  const closeDonationModal = () => {
    setShowDonationModal(false);
  };

  const handleCardDetailsChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value
    });
  };

  // When no campaign is found and not in edit mode, show loading
  if (!campaign && id) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      {editMode || !id ? (
        // Show form for editing or creating
        <>
          <input
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full mb-3 px-4 py-2 border rounded"
            placeholder="Campaign Title"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full mb-3 px-4 py-2 border rounded"
            placeholder="Campaign Description"
          />
          <input
            name="goal"
            type="number"
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
            className="w-full mb-3 px-4 py-2 border rounded"
            placeholder="Target Amount"
          />
          <input
            name="endDate"
            type="date"
            value={form.endDate?.slice(0, 10)}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="w-full mb-3 px-4 py-2 border rounded"
            placeholder="End Date"
          />
          {id ? (
            <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          ) : (
            <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
              Create Campaign
            </button>
          )}
        </>
      ) : (
        // Display campaign details when not in edit mode
        <>
          <h2 className="text-2xl font-bold mb-2">{campaign.title}</h2>
          <p className="mb-3">{campaign.description}</p>
          <img src="https://cleverads.com.ph/blog/wp-content/uploads/2023/03/Campaign_la_gi_6_loai_hinh_Campaign_co_ban-768x512-1.webp" alt="Campaign" className="w-full rounded mb-4" />
          <p><strong>Target:</strong> ₹ {campaign.goal}</p>
          <p><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>

          {isLoggedIn && (isOwner || isAdmin) && (
            <div className="flex gap-4 mt-4">
              <button onClick={() => setEditMode(true)} className="bg-yellow-500 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          )}
          
          {isLoggedIn && !isAdmin && !isOwner && (
            <div className="mt-6">
              <input
                type="number"
                value={donation}
                onChange={(e) => setDonation(e.target.value)}
                placeholder="Enter donation amount"
                className="w-full px-4 py-2 border rounded mb-2"
              />
              <button onClick={openDonationModal} className="w-full bg-blue-600 text-white py-2 rounded">
                Donate
              </button>
            </div>
          )}

          {!isLoggedIn && (
            <div className="mt-6 p-4 bg-gray-100 rounded text-center">
              <p className="mb-2">Please log in to donate to this campaign</p>
              <button 
                onClick={() => navigate("/login")} 
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Log In
              </button>
            </div>
          )}
        </>
      )}

      {/* Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Complete Your Donation</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Donation Amount</label>
              <input
                type="number"
                required
                value={donation}
                onChange={(e) => setDonation(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter amount"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                required
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                className="w-full px-4 py-2 border rounded"
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength="19"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Card Holder Name</label>
              <input
                type="text"
                name="cardHolder"
                required
                value={cardDetails.cardHolder}
                onChange={handleCardDetailsChange}
                className="w-full px-4 py-2 border rounded"
                placeholder="John Doe"
              />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  required
                  value={cardDetails.expiryDate}
                  onChange={handleCardDetailsChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  required
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="XXX"
                  maxLength="3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeDonationModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDonation}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Confirm Donation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetail;