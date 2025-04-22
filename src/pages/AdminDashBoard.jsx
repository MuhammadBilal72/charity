import React from "react";

const AdminDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manage Donations */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Manage Donations</h3>
          <p className="text-gray-600">View and approve pending donations.</p>
        </div>

        {/* Manage Events */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Manage Events</h3>
          <p className="text-gray-600">Add, edit or delete upcoming events.</p>
        </div>

        {/* User Requests */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">User Requests</h3>
          <p className="text-gray-600">Respond to volunteer and donation requests.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
