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
    <div className="container mx-auto p-6">
      <button onClick={() => navigate('/customers')} className="text-blue-500 mb-4">&larr; Back to Customers</button>

      {/* Customer Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
        <p><strong>Title:</strong> {customer.title}</p>
        <p><strong>Name:</strong> {customer.first_name} {customer.last_name}</p>
        <p><strong>Phone Number:</strong> {customer.phone_number}</p>
        <p><strong>Email:</strong> {customer.email || 'N/A'}</p>
        <p><strong>National ID:</strong> {customer.national_id}</p>
        <p><strong>Address:</strong> {customer.street_address}, {customer.address_line2 || ''}, {customer.city}, {customer.country}</p>
        <p><strong>Created At:</strong> {new Date(customer.created_at).toLocaleDateString('en-GB')}</p>
        <p><strong>Last Booking Date:</strong> {customer.last_booking_date ? new Date(customer.last_booking_date).toLocaleDateString('en-GB') : 'N/A'}</p>
      </div>

      {/* Driver's License Section */}
      {customer.drivers_license && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Driver's License</h2>
          <img src={customer.drivers_license} alt="Driver's License" className="w-full max-w-sm rounded-md" />
        </div>
      )}

      {/* Next of Kin Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Next of Kin</h2>
        <h3 className="font-semibold">Primary Next of Kin</h3>
        <p>{customer.next_of_kin1_first_name} {customer.next_of_kin1_last_name} ({customer.next_of_kin1_phone})</p>
        <p>ID: {customer.next_of_kin1_id_number}</p>

        {customer.next_of_kin2_first_name && (
          <>
            <h3 className="font-semibold mt-4">Secondary Next of Kin</h3>
            <p>{customer.next_of_kin2_first_name} {customer.next_of_kin2_last_name} ({customer.next_of_kin2_phone})</p>
            <p>ID: {customer.next_of_kin2_id_number}</p>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button onClick={() => navigate(`/edit-customer/${customer.id}`)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Edit Customer</button>
        <button onClick={() => alert('Deleting customer...')} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">Delete Customer</button>
      </div>
    </div>
  );
};

export default CustomerDetails;
