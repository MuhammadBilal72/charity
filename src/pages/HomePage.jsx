import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Welcome to CharityConnect</h1>
      <p className="text-lg mb-8 text-gray-600 max-w-xl mx-auto">
        A platform to manage and support charitable donations, events, and volunteers. 
        Join us to make a difference in the community.
      </p>
      <div className="space-x-4">
        <Link
          to="/register"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Get Started
        </Link>
        <Link
          to="/events"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          View Events
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
