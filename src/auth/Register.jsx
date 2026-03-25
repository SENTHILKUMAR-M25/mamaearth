import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const API = "http://localhost:5000/api/auth";

// 🔥 sessionId generator
const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const sessionId = getSessionId();

      // 🔥 REGISTER + MERGE GUEST CART
      const res = await axios.post(`${API}/register`, {
        ...formData,
        sessionId,
      });

      // ✅ AUTO LOGIN AFTER REGISTER
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ CLEAR GUEST CART
      localStorage.removeItem("guestCart");

      alert("🎉 Account created successfully!");

      // ✅ RESET FORM
      setFormData({ name: "", email: "", password: "" });

      // ✅ REDIRECT
      navigate("/");

    } catch (err) {
      const msg = err.response?.data?.msg || "Server error";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-800">
      
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
        
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account 🚀
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-2 rounded text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            />
            <label className="absolute left-3 top-3 text-gray-400 text-sm transition-all 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-400 
              peer-valid:-top-2 peer-valid:text-xs">
              Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            />
            <label className="absolute left-3 top-3 text-gray-400 text-sm transition-all 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-400 
              peer-valid:-top-2 peer-valid:text-xs">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pr-10 bg-transparent border border-gray-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 peer"
            />
            <label className="absolute left-3 top-3 text-gray-400 text-sm transition-all 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-400 
              peer-valid:-top-2 peer-valid:text-xs">
              Password
            </label>

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Register
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;