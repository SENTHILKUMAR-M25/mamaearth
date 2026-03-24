// import React, { useState } from "react";
// import axios from "axios";

// const Register = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState(""); // For displaying errors

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset previous error
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/register", formData);
//       alert(`Registered successfully! Your ID: ${res.data.userId}`);
//       // Optionally, reset form after successful registration
//       setFormData({ name: "", email: "", password: "" });
//     } catch (err) {
//       console.error(err);
//       // Safe access to error message
//       const msg = err.response?.data?.msg || "Server error";
//       setError(msg);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded bg-white">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      alert(`Registered successfully! Your ID: ${res.data.userId}`);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      const msg = err.response?.data?.msg || "Server error";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      
      {/* Card */}
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account 🚀
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-2 rounded text-sm mb-4">
            {error}
          </div>
        )}

        {/* Form */}
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

            {/* Toggle Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => window.location.href = "/login"}
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