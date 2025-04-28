import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowModal(false);
    navigate("/"); // navigate to home after logout
  };

  return (
    <>
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Charity System</Link>
        </h1>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/campaigns">Campaigns</Link>

          {user ? (
            <>
              {user.role === "user" && (
                <>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/profile">Profile</Link>
                </>
              )}

              {user.role === "admin" && (
                <Link to="/admin/dashboard">Admin Panel</Link>
              )}

              <button
                onClick={() => setShowModal(true)}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center  border-2 border-red-500">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
