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
      <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer" onClick={() => navigate("/create-campaign")} >Create Campaign</button>
      {campaigns.length === 0 ? <p>No campaigns yet.</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.map(camp => (
            <div key={camp._id} className="p-4 border rounded shadow">
              <h2 className="font-bold">{camp.title}</h2>
              <p>{camp.description}</p>
              <div className="mt-2">
                <button className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer" onClick={() => navigate(`/campaign/${camp._id}`)}>View</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
