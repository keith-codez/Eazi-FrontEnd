// src/pages/bookings/BookingRequests.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("http://127.0.0.1:8000/api/staff/booking-requests/");
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching booking requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Loading booking requests...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-4">Booking Requests</h1>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white shadow rounded overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Phone</th>
              <th className="text-left px-6 py-3">Start - End</th>
              <th className="text-left px-6 py-3">Vehicle ID</th>
              <th className="text-left px-6 py-3">Reviewed</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-t">
                <td className="px-6 py-4">{req.first_name} {req.last_name}</td>
                <td className="px-6 py-4">{req.phone}</td>
                <td className="px-6 py-4">{req.start_date} - {req.end_date}</td>
                <td className="px-6 py-4">{req.vehicle}</td>
                <td className="px-6 py-4">{req.is_reviewed ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-white p-4 shadow rounded space-y-2">
            <p className="font-semibold">{req.first_name} {req.last_name}</p>
            <p><strong>Phone:</strong> {req.phone}</p>
            <p><strong>Dates:</strong> {req.start_date} - {req.end_date}</p>
            <p><strong>Vehicle ID:</strong> {req.vehicle}</p>
            <p><strong>Reviewed:</strong> {req.is_reviewed ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingRequests;
