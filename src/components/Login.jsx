import React, { useState } from "react";
import { loginManager } from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginManager(formData.username, formData.password);
      onLogin(data.access_token);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data.error || "Login failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="w-96 p-6 bg-white rounded shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          onChange={handleChange}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit">
          Login
        </button>
        <p className="mt-2 text-red-500">{message}</p>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
        <p className="mt-4 text-center">
          Forgot Password?{" "}
          <Link to="/request/password_reset" className="text-blue-600 hover:underline">Reset Password</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
