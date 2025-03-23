import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MoreVertical } from "lucide-react";



const API_URL = "http://127.0.0.1:8000/api/staff/customers/";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" });
  const [searchQuery, setSearchQuery] = useState("");

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


  const handleSort = (key) => {
    if (!key) return; // If no key selected, do nothing
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    const aValue =
      sortConfig.key === "name" ? `${a.first_name} ${a.last_name}` : a[sortConfig.key];
    const bValue =
      sortConfig.key === "name" ? `${b.first_name} ${b.last_name}` : b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  const filteredCustomers = sortedCustomers.filter((customer) => {
    const fullName = `${customer.first_name} ${customer.last_name}`.toLowerCase();
    const email = customer.email?.toLowerCase() || "";
    const phone = customer.phone_number?.toLowerCase() || "";
    const nationalId = customer.national_id?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
  
    return (
      fullName.includes(query) ||
      email.includes(query) ||
      phone.includes(query) ||
      nationalId.includes(query)
    );
  });



  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-6 sm:py-4 md:mt-0 mt-5 overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-1 sticky top-0 bg-white z-20"> 
        <h2 className="text-xl font-bold mb-2 sm:mb-0">Customers</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-4 sm:mb-0"></div>
          <div className="hidden md:flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by name, email, phone, or ID..."
              className="border border-gray-300 px-4 py-2 rounded-lg w-80 mb-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div> 
          <button
            onClick={() => navigate('/add-customer')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hidden md:block"
          >
            Add Customer
          </button>
        </div>

      {/* Table for Desktop */}
      <div className="bg-white rounded-sm shadow-md py-0 overflow-x-auto hidden md:block" style={{ maxHeight: '500px' }}>
        <table className="w-full min-w-[600px]">
          <thead className="sticky top-0 bg-blue-100 z-10">
            <tr className="text-gray-600 font-semibold text-sm bg-blue-100">
              <th
                className="p-3 text-left cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name {sortConfig.key === "name" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
              </th>
              <th
                className="p-3 text-left cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email {sortConfig.key === "email" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
              </th>
            
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">National ID</th>
              <th
                className="p-3 text-left cursor-pointer"
                onClick={() => handleSort("created_at")}
              >
                Date Added {sortConfig.key === "created_at" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
              </th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {filteredCustomers.map((customer) => (
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
      <div className="block md:hidden my-4">
        {/* Search for Mobile */}
        <div className="flex flex-col gap-4 mb-5">
          <input
            type="text"
            placeholder="Search by name, email, phone, or ID..."
            className="border border-gray-300 px-4 py-2 rounded-lg w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            id="sort"
            onChange={(e) => handleSort(e.target.value)}
            className="w-50 p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="created_at">Date Added</option>
          </select>
          <button
            onClick={() => navigate('/add-customer')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
          >
            Add Customer
          </button>
        </div>
    
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white shadow-md rounded-xl p-4 mb-4 relative">
            {/* 3 Dots Menu Button */}
            <button
              onClick={() => toggleMenu(customer.id)}
              className="absolute top-4 right-4 p-2 menu-btn"
            >
              <MoreVertical className="w-5 h-5 text-gray-600 rotate-90" />
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
            <div className="mt-4 space-y-2"> 
              <div className="flex justify-between mt-5">
                <span className="font-semibold text-gray-700">First Name:</span>
                <span className="text-gray-700">{customer.first_name}</span>
              </div>
              <div className="border-t-[0.5px] border-gray-300" />

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Last Name:</span>
                <span className="text-gray-700">{customer.last_name}</span>
              </div>
              <div className="border-t-[0.5px] border-gray-300" />

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Phone:</span>
                <span className="text-gray-700">{customer.phone_number}</span>
              </div>
              <div className="border-t-[0.5px] border-gray-300" />

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Last Booking:</span>
                <span className="text-gray-700">{customer.last_booking_date || "N/A"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerList;
