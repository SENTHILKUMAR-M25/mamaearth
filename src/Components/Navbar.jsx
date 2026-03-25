import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ---------------- Helper Functions ----------------
const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const displayName = payload.name || payload.email || "User";
    return { id: payload.id, name: displayName };
  } catch {
    return null;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

// Optional: dynamic avatar colors
const getAvatarColor = (name) => {
  const colors = ["bg-green-600", "bg-blue-600", "bg-red-600", "bg-yellow-600"];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

// ---------------- Navbar Component ----------------
const Navbar = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch cart count for logged-in user
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCartCount(res.data.length))
      .catch(console.log);
  }, [token]);

  const items = [
    "HOME","FACE","HAIR","MAKEUP","BODY","BABY","COMBOS",
    "NEW LAUNCHES","INGREDIENT","ALL PRODUCTS","BLOG",
    "PLANT GOODNESS","STORE LOCATOR"
  ];

  const avatarLetter = user ? user.name.charAt(0).toUpperCase() : "U";
  const avatarColor = user ? getAvatarColor(user.name) : "bg-gray-600";

  return (
    <div className="w-full fixed top-0 left-0 z-[999] bg-white/70 backdrop-blur-xl">
      
      {/* Promo Bar */}
      <div className="bg-red-600 text-white text-xs md:text-sm text-center py-1 px-2">
        Get Upto 35% Off On Orders Above ₹999 | Use Code: REDEEM35
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-3 sm:px-5 md:px-8 py-3">
        
        {/* Logo */}
        <div
          className="text-xl sm:text-2xl font-bold text-green-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          mamaearth
        </div>

        {/* Search (Tablet + Desktop) */}
        <div className="hidden sm:flex flex-1 mx-3 md:mx-6">
          <div className="relative w-full max-w-[500px] mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border rounded-full py-2 px-4 pl-10 text-sm md:text-base focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Desktop User */}
          <div
            className="hidden md:flex items-center gap-2 cursor-pointer hover:text-green-600"
            onClick={user ? logout : () => navigate("/login")}
          >
            <div className={`w-8 h-8 rounded-full ${avatarColor} text-white flex items-center justify-center font-bold`}>
              {avatarLetter}
            </div>
            <span className="text-sm">{user ? "Logout" : "Login"}</span>
          </div>

          {/* Mobile Menu */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slideDown">
          <div className="p-4 space-y-4">
            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border rounded-full py-2 px-4 pl-10"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>

            {/* Menu Items */}
            <ul className="flex flex-col gap-3 text-sm">
              {items.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer hover:text-green-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* User */}
            <div
              className="flex items-center gap-2 pt-2 border-t cursor-pointer"
              onClick={user ? logout : () => navigate("/login")}
            >
              <div className={`w-8 h-8 rounded-full ${avatarColor} text-white flex items-center justify-center font-bold`}>
                {avatarLetter}
              </div>
              <span>{user ? "Logout" : "Login"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <nav className="hidden md:block bg-white border-t">
        <ul className="flex flex-wrap justify-center gap-4 lg:gap-6 py-2 text-xs md:text-sm font-medium">
          {items.map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-green-600 whitespace-nowrap"
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;