import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");
    API.get("/campaigns/my").then(res => {
      if (Array.isArray(res.data)) {
        setCampaigns(res.data);
      } else {
        setCampaigns([]); // If not an array, set campaigns as an empty array
      }
    }).catch(err => {
      // Handle error if necessary
      console.error("Failed to fetch campaigns", err);
      setCampaigns([]); // Set campaigns as an empty array if API fails
    });
  }, [user, navigate]);
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome {user?.name}</h1>
      <button className="btn mb-4" onClick={() => navigate("/create-campaign")} >Create Campaign</button>
      {campaigns.length === 0 ? <p>No campaigns yet.</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.map(camp => (
            <div key={camp._id} className="p-4 border rounded shadow">
              <h2 className="font-bold">{camp.title}</h2>
              <p>{camp.description}</p>
              <div className="mt-2">
                <button className="btn" onClick={() => navigate(`/campaign/${camp._id}`)}>View</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
