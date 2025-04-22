import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({ email: "", contact: "" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setUser({ email: res.data.email, contact: res.data.contact });
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await API.put("/users/profile", {
        contact: user.contact,
        ...(password && { password }),
      });
      alert("Profile updated successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          className="w-full border p-2 rounded bg-gray-100"
          value={user.email}
          readOnly
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Contact Number</label>
        <input
          className="w-full border p-2 rounded"
          value={user.contact}
          onChange={(e) => setUser({ ...user, contact: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">New Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Confirm Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        onClick={handleUpdate}
      >
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
