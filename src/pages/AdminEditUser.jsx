import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { toast } from "react-toastify";

const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "", role: "user" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await API.put(`/users/${id}`, {
        name: user.name,
        email: user.email,
        role: user.role,
      });
      // alert("User updated!");
      toast.success("User updated successfully!");
      navigate("/admin/users");
    } catch (err) {
      console.error("Update error", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      // alert("User deleted.");
      toast.success("User deleted successfully!");
      navigate("/admin/users");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading user info...</div>;

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Modify User</h1>
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          className="w-full border p-2 rounded"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          className="w-full border p-2 rounded"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Role</label>
        <select
          className="w-full border p-2 rounded"
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
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

export default AdminEditUser;
