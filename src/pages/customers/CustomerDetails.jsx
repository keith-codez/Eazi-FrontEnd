import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import axios from "axios";


const API_URL = "http://127.0.0.1:8000/api/staff/customers/";

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Placeholder API Call
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`${API_URL}${id}/`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomer();
  }, [id]);

  if (!customer) {
    return <p>Loading customer details...</p>;
  }

  return (
    <div className='w-full min-h-screen px-4 md:px-8 py-6 sm:py-4 md:mt-0 mt-5 overflow-hidden'>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-3">
        {/* Header */}
        <h2 className="text-xl font-bold">Customers</h2>

        {/* Search Input and Button */}
        <div className="hidden md:flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by name, email, phone, or ID..."
            className="border border-gray-300 px-4 py-2 rounded-lg w-80"
            
          />
          
          <button
            onClick={() => navigate('/add-customer')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hidden md:block cursor-pointer"
          >
            Add Customer
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 mt-5 "style={{ height: 'calc(100vh - 100px)'   }}>
      {/* Left Section - Customer Details */}
      <div className="md:w-1/3 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
          <p><strong>Title:</strong> {customer.title}</p>
          <p><strong>Name:</strong> {customer.first_name} {customer.last_name}</p>
          <p><strong>Phone Number:</strong> {customer.phone_number}</p>
          <p><strong>Email:</strong> {customer.email || 'N/A'}</p>
          <p><strong>National ID:</strong> {customer.national_id}</p>
          <p>
            <strong>Address:</strong> {customer.street_address}
            {customer.address_line2 ? `, ${customer.address_line2}` : ''}, {customer.city}, {customer.country}
          </p>
          <p><strong>Created On:</strong> {new Date(customer.created_at).toLocaleDateString('en-GB')}</p>
          <p><strong>Last Booking Date:</strong> {customer.last_booking_date ? new Date(customer.last_booking_date).toLocaleDateString('en-GB') : 'N/A'}</p>
          <p><strong>Drivers Licence</strong></p>
          <img src={customer.drivers_license} alt="Drivers Licence" className="w-full h-auto" />
        </div>
      </div>

      {/* Right Section - Analytics, Financials, and Booking History Table */}
      <div className="md:w-2/3 flex flex-col gap-6">

      {/* Customer Analytics with 3 columns */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Customer Analytics</h2>

        {/* Three-column layout */}
        <div className="grid grid-cols-3 gap-4">
          {/* Total Bookings */}
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <p className="text-2xl font-bold">{customer.total_bookings || 0}</p>
          </div>

          {/* Total Spent */}
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Total Spent</h3>
            <p className="text-2xl font-bold">${customer.total_spent?.toFixed(2) || '0.00'}</p>
          </div>

          {/* Total Mileage */}
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Total Mileage</h3>
            <p className="text-2xl font-bold">{customer.total_mileage || 0} km</p>
          </div>
        </div>
      </div>

        {/* Booking History Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Booking History</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Booking ID</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder for booking data */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">#12345</td>
                <td className="border border-gray-300 px-4 py-2">2025-03-20</td>
                <td className="border border-gray-300 px-4 py-2">$100</td>
                <td className="border border-gray-300 px-4 py-2">Completed</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">#12346</td>
                <td className="border border-gray-300 px-4 py-2">2025-03-21</td>
                <td className="border border-gray-300 px-4 py-2">$75</td>
                <td className="border border-gray-300 px-4 py-2">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
      );
};

export default CustomerDetails;
