import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';

const CustomerBookingRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/booking-requests/')
      .then(res => setRequests(res.data))
      .catch(err => console.error('Error fetching booking requests:', err));
  }, []);

  const handleConfirmClick = (requestId) => {
    navigate(`/customer/booking-requests/${requestId}/confirm`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Booking Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map(req => (
          <div key={req.id} className="border rounded-xl shadow-sm p-4 bg-white">
            <div className="flex items-center space-x-4">
              <img
              src={req.vehicle.main_image}
              alt={`${req.vehicle.make} ${req.vehicle.model}`}
              className="w-32 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{req.vehicle?.make} {req.vehicle?.model}</h3>
                <p className="text-sm text-gray-600">Submitted: {new Date(req.created_at).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Status: <span className="font-medium">{req.status}</span></p>
                <p className="text-sm text-gray-600">Deposit: ${req.vehicle?.deposit}</p>
              </div>
            </div>
            {req.status === 'accepted' && (
              <div className="mt-4 text-right">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={() => handleConfirmClick(req.id)}
                >
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerBookingRequestsPage;
