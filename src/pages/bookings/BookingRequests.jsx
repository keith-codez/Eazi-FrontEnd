// src/pages/bookings/BookingRequests.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get(`staff-booking-requests/`);
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching booking requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleReview = (id) => {
    navigate(`/booking-requests/${id}`);
  };

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
              <th className="text-left px-6 py-3">Vehicle</th>
              <th className="text-left px-6 py-3">Reviewed</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-t">
                <td className="px-6 py-4">{req.customer.first_name} {req.customer.last_name}</td>
                <td className="px-6 py-4">{req.customer.phone_number}</td>
                <td className="px-6 py-4">{req.start_date} - {req.end_date}</td>
                <td className="px-6 py-4">{req.vehicle.make} {req.vehicle.model}</td>
                <td className="px-6 py-4">{req.is_reviewed ? "Yes" : "No"}</td>
                <td className="px-6 py-4 relative">
                  <button onClick={() => setDropdownOpen(dropdownOpen === req.id ? null : req.id)}>
                    &#x22EE;
                  </button>
                  {dropdownOpen === req.id && (
                    <div className="absolute right-18 top-2 mb-2 w-32 bg-green-100 border rounded-sm shadow-lg z-10 dropdown">
                      <button
                        onClick={() => handleReview(req.id)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      >
                        Review
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-white p-4 shadow rounded space-y-2 relative">
            <p className="font-semibold">{req.customer.first_name} {req.customer.last_name}</p>
            <p><strong>Phone:</strong> {req.customer.phone_number}</p>
            <p><strong>Dates:</strong> {req.start_date} - {req.end_date}</p>
            <p><strong>Vehicle:</strong> {req.vehicle.make} {req.vehicle.model}</p>
            <p><strong>Reviewed:</strong> {req.is_reviewed ? "Yes" : "No"}</p>
            <button
              onClick={() => handleReview(req.id)}
              className="text-blue-600 text-sm underline mt-2"
            >
              Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingRequests;
