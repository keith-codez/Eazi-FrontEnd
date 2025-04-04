import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import axios from "axios";
import BackButton from "../../components/BackButton";

const API_URL = "http://127.0.0.1:8000/api/staff/customers/";
const API_URL_BOOKING = "http://127.0.0.1:8000/api/staff/bookings/"

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [customer, setCustomer] = useState("");
  const [activeTab, setActiveTab] = useState("customer");
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalBookings: 0,
    totalSpent: 0,
    totalMileage: 0
});




useEffect(() => {
  setLoading(true); // Start loading
  axios.get(`${API_URL}${id}/`)
      .then(response => setCustomer(response.data))
      .catch(error => console.error("Error fetching customer:", error));

  axios.get(`${API_URL_BOOKING}customer/${id}/`)
      .then(response => {
        setBookings(response.data);
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error("Error fetching bookings:", error);
        setLoading(false); // Stop loading even on error
      });

  axios.get(`${API_URL}${id}/analytics/`)
      .then(response => setAnalytics(response.data))
      .catch(error => console.error("Error fetching analytics:", error));
}, []);
  

  return (
    <div className='w-full min-h-screen px-0 md:px-6 py-3 sm:py-4 md:mt-0 mt-5 overflow-hidden border'> 
      <div className="p-4">
        <BackButton />
      </div>
      <div className="container mx-auto p-1 flex flex-col md:flex-row gap-6 mt-5 "style={{ minHeight: 'calc(100vh - 100px)', overflowY: 'auto'  }}>
        {/* Left Section - Customer Details */}
        <div className="md:w-1/3 flex flex-col gap-6">


          <div className="w-full max-w-lg mx-auto">
            {/* Mini Navigation Bar */}
            <div className="flex justify-between bg-blue-600 text-white p-1 rounded-t-md">
              {["customer", "kin1", "kin2"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center py-2 cursor-pointer ${
                    activeTab === tab ? "bg-blue-800" : "bg-blue-600"
                  } transition-colors duration-200 rounded-md`}
                >
                  {tab === "customer" ? "Customer" : tab === "kin1" ? "Kin 1" : "Kin 2"}
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="p-4 bg-white rounded-b-lg shadow-md">
              {activeTab === "customer" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-center">Customer Details</h2>
                  <div className='mt-4 p-4 space-y-2'>
                    <div className='flex justify-between mt-5'>
                      <span className="font-bold">Title:</span>
                      <span className="text-gray-700">{customer.title} </span>
                    </div>
                    <div className="border-t-[0.5px] border-gray-300" />
                    <div className='flex justify-between mt-5'>
                      <span className="font-bold">Name:</span>
                      <span className="text-gray-700">{customer.first_name} {customer.last_name} </span>
                    </div>
                    <div className="border-t-[0.5px] border-gray-300" />
                    <div className='flex justify-between mt-5'>
                      <span className="font-bold">Phone Number:</span>
                      <span className="text-gray-700">{customer.phone_number} </span>
                    </div>
                    <div className="border-t-[0.5px] border-gray-300" />
                    <div className='flex justify-between mt-5'>
                      <span className="font-bold">Email:</span>
                      <span className="text-gray-700">{customer.email} </span>
                    </div>
                    <div className="border-t-[0.5px] border-gray-300" />
                    <div className='flex justify-between mt-5'>
                      <span className="font-bold">National ID:</span>
                      <span className="text-gray-700">{customer.national_id} </span>
                    </div>
                    <div className="border-t-[0.5px] border-gray-300" />
                    <div className='mt-3'>
                      <span className="font-bold block">Address:</span>
                      <span className="text-gray-700 block">
                      {customer.street_address ? `${customer.street_address}, ` : ''}
                      {customer.address_line2 ? ` ${customer.address_line2}` : ''}
                      {customer.city ? `${customer.city},` : ''}
                      {customer.country ? ` ${customer.country}` : ''}
                      </span>
                    </div>
                    <div className="border-t-[0.5px] border-gray-300" />
                    <div className='flex justify-between mt-5'>
                      <span className="font-bold">Date Added:</span>
                      <span className="text-gray-700"> {new Date(customer.created_at).toLocaleDateString("en-GB")}</span>
                    </div>
                    <div className="border-t-[0.5px] border-gray-300" />
                    <div className='flex justify-between mt-5'>
                      <span className="font-bold">Last Booking Date:</span>
                      <span className="text-gray-700"> {customer.last_booking_date ? new Date(customer.last_booking_date).toLocaleDateString("en-GB") : "N/A"}</span>
                    </div>
                    <div className="border-t-[0.5px] border-gray-300" />
                    
        
                      <p><strong>Drivers License:</strong></p>
                      <img src={customer.drivers_license} alt="Drivers License" className="w-50 h-auto rounded-md" />
                      </div>
                </div>
              )}

              {activeTab === "kin1" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Next of Kin 1</h2>
                  {customer?.next_of_kin1_first_name? (  // Apply optional chaining (?.)
                    <>
                      <p><strong>Name:</strong> {customer.next_of_kin1_first_name} {customer.next_of_kin1_last_name} </p>
                      <p><strong>Phone Number:</strong> {customer.next_of_kin1_phone}</p>
                      <p><strong>ID Number:</strong> {customer.next_of_kin1_id_number}</p>
                    </>
                  ) : (
                    <p className="text-gray-500">No Next of Kin 1 provided.</p>
                  )}
                </div>
              )}

              {activeTab === "kin2" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Next of Kin 2</h2>
                  {customer?.next_of_kin_2 ? (  // Apply optional chaining (?.)
                    <>
                      <p><strong>Name:</strong> {customer.next_of_kin_2?.name}</p>
                      <p><strong>Phone Number:</strong> {customer.next_of_kin_2?.phone}</p>
                      <p><strong>Relationship:</strong> {customer.next_of_kin_2?.relationship}</p>
                    </>
                  ) : (
                    <p className="text-gray-500">No Next of Kin 2 provided.</p>
                  )}
                </div>
              )}

            </div>
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
                <p className="text-2xl font-bold">{analytics.totalBookings}</p>
              </div>
              {/* Total Spent */}
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <h3 className="text-lg font-semibold">Total Spent</h3>
                <p className="text-2xl font-bold">${analytics.totalSpent.toFixed(2)}</p>
              </div>
              {/* Total Mileage */}
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <h3 className="text-lg font-semibold">Total Mileage</h3>
                <p className="text-2xl font-bold">{analytics.totalMileage} km</p>
              </div>
            </div>
          </div>


          <div className="bg-white p-6 rounded-lg shadow-md hidden md:block">
            <h2 className="text-2xl font-bold mb-4">Booking History</h2>
            {loading ? (
              <p>Loading...</p>
            ) : bookings.length === 0 ? (
              <p>No bookings found for this customer.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Booking ID</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                    <th className="border border-gray-300 px-4 py-2">Deposit</th>
                    <th className="border border-gray-300 px-4 py-2">Discount</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{booking.id}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(booking.booking_date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">${booking.booking_amount}</td>
                      <td className="border border-gray-300 px-4 py-2">${booking.booking_deposit}</td>
                      <td className="border border-gray-300 px-4 py-2">${booking.discount_amount}</td>
                      <td className="border border-gray-300 px-4 py-2">{booking.booking_status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>


          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {/* Booking Cards */}
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-gray-50 shadow-lg rounded-xl p-4 mb-4 relative">
                  {/* Booking Details */}
                  <div className="mt-4 p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Booking ID</span>
                      <span className="text-gray-700">#{booking.id}</span>
                    </div>
                    <div className="border-t-[0.5px] border-gray-300" />

                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Date</span>
                      <span className="text-gray-700">{booking.booking_}</span>
                    </div>
                    <div className="border-t-[0.5px] border-gray-300" />

                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Amount</span>
                      <span className="text-gray-700">${booking.booking_amount}</span>
                    </div>
                    <div className="border-t-[0.5px] border-gray-300" />

                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Status</span>
                      <span className={`px-2 py-1 rounded-lg text-white ${booking.booking_status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                        {booking.booking_status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    );
}

export default CustomerDetails;
