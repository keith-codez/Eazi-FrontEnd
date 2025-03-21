import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MoreVertical } from "lucide-react";


const API_URL = "http://127.0.0.1:8000/api/staff/customers/";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-customer/${id}`);
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown") && !e.target.closest(".menu-btn")) {
        setMenuOpen(null);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-6 mt-16 md:mt-0 overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sticky top-0 bg-white z-20 py-4"> 
        <h2 className="text-xl font-bold mb-2 sm:mb-0">Customers</h2>
        <button
          onClick={() => navigate('/add-customer')}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Customer
        </button>
      </div>
      {/* Table for Desktop */}
      <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto hidden md:block" style={{ maxHeight: '800px' }}>
        <table className="w-full min-w-[600px]">
          <thead className="sticky top-0 bg-blue-100 z-10">
            <tr className="text-gray-600 font-semibold text-sm bg-blue-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">National ID</th>
              <th className="p-3 text-left">Date Added</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto" style={{ maxHeight: '650px', overflowY: 'auto' }}>
            {customers.map((customer) => (
              <tr key={customer.id} className="even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3">{customer.first_name} {customer.last_name} </td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.phone_number}</td>
                <td className="p-3">{customer.national_id}</td>
                <td className="p-3"> {new Date(customer.created_at).toLocaleDateString('en-GB')}</td>
                <td className="p-3 text-center relative">
                <button onClick={() => toggleMenu(customer.id)} className="p-2">
                  <MoreVertical className="w-5 h-5 text-gray-600 menu-btn" />
                  </button>

                  {menuOpen === customer.id && (
                    <div className="absolute right-18 top-2 mb-2 w-32 bg-green-100 border rounded-sm shadow-lg z-10 dropdown">
                      <button
                        onClick={() => handleEdit(customer.id)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleEdit(customer.id)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-200"
                      >
                        View
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Layout for Mobile */}
      <div className="block md:hidden">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white shadow-md rounded-xl p-4 mb-4 relative">
            {/* 3 Dots Menu Button */}
            <button
              onClick={() => toggleMenu(customer.id)}
              className="absolute top-4 right-4 p-2 menu-btn"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {menuOpen === customer.id && (
              <div className="absolute top-12 right-4 w-32 bg-white border rounded-lg shadow-lg z-10 dropdown">
                <button
                  onClick={() => handleEdit(customer.id)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </button>
              </div>
            )}

            {/* Customer Details */}
            <div className="mt-4"> 
              <p className="text-gray-700"><span className="font-semibold">First Name:</span> {customer.first_name}</p>
              <div className="border-t-[0.5px] border-gray-300 my-2" />
              <p className="text-gray-700"><span className="font-semibold">Last Name:</span> {customer.last_name}</p>
              <div className="border-t-[0.5px] border-gray-300 my-2" />
              <p className="text-gray-700"><span className="font-semibold">Phone:</span> {customer.phone_number}</p>
              <div className="border-t-[0.5px] border-gray-300 my-2" />
              <p className="text-gray-700"><span className="font-semibold">Last Booking:</span> {customer.last_booking_date || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerList;
