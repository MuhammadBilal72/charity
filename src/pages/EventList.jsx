import React from "react";

const events = [
  {
    id: 1,
    title: "Free Health Checkup Camp",
    date: "2025-04-28",
    location: "Vignan Hall, Vizag",
    description: "A free health camp for underprivileged communities.",
  },
  {
    id: 2,
    title: "Blood Donation Drive",
    date: "2025-05-05",
    location: "City Hospital",
    description: "Join us to donate blood and save lives.",
  },
  {
    id: 3,
    title: "Clothes Collection Drive",
    date: "2025-05-12",
    location: "Community Center",
    description: "Donate your unused clothes to help those in need.",
  },
];

const EventList = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Upcoming Events
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white border border-gray-200 p-5 rounded shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-blue-600">{event.title}</h3>
            <p className="text-gray-700 mt-1">{event.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              📅 {event.date} | 📍 {event.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
