import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      
      {/* Card */}
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            />
            <label className="absolute left-3 top-3 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-green-400 peer-valid:-top-2 peer-valid:text-xs">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            />
            <label className="absolute left-3 top-3 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-green-400 peer-valid:-top-4 peer-valid:text-xs">
              Password
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;