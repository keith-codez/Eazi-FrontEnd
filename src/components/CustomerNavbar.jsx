import { Link } from "react-router-dom";

const CustomerNavbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">EaziDrive</Link>
        <div className="space-x-6">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-200">About</Link>
          <Link to="/contact" className="text-white hover:text-gray-200">Contact</Link>
          <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
          <Link to="/register-customer" className="text-white hover:text-gray-200">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;