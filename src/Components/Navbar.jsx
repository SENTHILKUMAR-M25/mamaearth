
// import React, { useState, useEffect } from "react";
// import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Decode JWT and get user info
// const getUserFromToken = () => {
//   const token = localStorage.getItem("token");
//   if (!token) return null;
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return { id: payload.id, name: payload.name || payload.email || "U" }; // fallback to email or 'U'
//   } catch (err) {
//     return null;
//   }
// };

// const logout = () => {
//   localStorage.removeItem("token");
//   window.location.reload();
// };

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = getUserFromToken();
//   const [cartCount, setCartCount] = useState(0);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) return;
//     axios
//       .get("http://localhost:5000/api/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setCartCount(res.data.length))
//       .catch((err) => console.log(err));
//   }, [token]);

//   const items = [
//     "HOME", "FACE", "HAIR", "MAKEUP", "BODY", "BABY", "COMBOS",
//     "NEW LAUNCHES", "INGREDIENT", "ALL PRODUCTS", "BLOG",
//     "PLANT GOODNESS", "STORE LOCATOR"
//   ];

//   return (
//     <div className="w-full">
//       {/* Promo Bar */}
//       <div className="bg-red-600 text-white text-sm px-4 py-1 text-center">
//         Asia's 1st Brand with MADE SAFE Certified Products | Get Upto 35% Off On Orders Above Rs. 999 | Use Code: REDEEM35
//       </div>

//       {/* Header */}
//       <header className="flex items-center justify-between px-4 md:px-6 py-3 shadow-md">
//         {/* Logo */}
//         <div
//           className="text-2xl font-bold text-green-600 cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           mamaearth
//         </div>

//         {/* Desktop Search */}
//         <div className="hidden md:flex flex-1 mx-4">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search for Face Wash"
//               className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//           </div>
//         </div>
//         <div
//           className="relative cursor-pointer"
//           onClick={() => navigate("/cart")}
//         >
//           <ShoppingCart size={24} />
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//               {cartCount}
//             </span>
//           )}
//         </div>
//         {/* User / Cart Section */}
//         <div className="flex items-center gap-4">
//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-4">
//             {user ? (
//               <>
//                 {/* Cart */}


//                 {/* User Avatar */}
//                 <div
//                   className="flex items-center gap-2 cursor-pointer hover:text-green-600"
//                   onClick={logout}
//                 >
//                   <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center uppercase font-bold">
//                     {user.name[0]}
//                   </div>
//                   Logout
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div
//                   className="cursor-pointer hover:text-green-600 flex items-center gap-1"
//                   onClick={() => navigate("/login")}
//                 >
//                   <User size={24} /> Login
//                 </div>
               
//               </>
//             )}
//           </div>

//           {/* Mobile Cart */}

//           <div
//             className="relative md:hidden cursor-pointer"
//             onClick={() => navigate("/cart")}
//           >
//             <ShoppingCart size={24} />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                 {cartCount}
//               </span>
//             )}
//           </div>


//           {/* Mobile Menu Button */}
//           <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <X size={28} /> : <Menu size={28} />}
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white shadow-md">
//           <div className="flex flex-col gap-3 p-4">
//             {/* Search */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search for Face Wash"
//                 className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
//               />
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//             </div>

//             {/* Navigation Items */}
//             <ul className="flex flex-col gap-2">
//               {items.map((item) => (
//                 <li
//                   key={item}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             {/* Auth Section */}
//             <div className="flex flex-col gap-2 mt-2">
//               {user ? (
//                 <>
//                   <div
//                     className="flex items-center gap-2 cursor-pointer hover:text-green-600"
//                     onClick={logout}
//                   >
//                     <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center uppercase font-bold">
//                       {user.name[0]}
//                     </div>
//                     Logout
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div
//                     className="cursor-pointer hover:text-green-600"
//                     onClick={() => navigate("/login")}
//                   >
//                     Login
//                   </div>
                 
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Desktop Navigation Menu */}
//       <nav className="hidden md:block bg-white shadow-sm">
//         <ul className="flex flex-wrap justify-center gap-4 py-2 text-gray-700 font-medium text-sm">
//           {items.map((item) => (
//             <li key={item} className="hover:text-green-600 cursor-pointer">
//               {item}
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;





import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ---------------- Helper Functions ----------------

// Decode JWT and get user info
const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { id: payload.id, name: payload.name || payload.email || "User" };
  } catch (err) {
    return null;
  }
};

// Logout
const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

// ---------------- Navbar Component ----------------
const Navbar = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch cart count
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:5000/api/cart", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setCartCount(res.data.length))
      .catch(console.log);
  }, [token]);

  const items = [
    "HOME","FACE","HAIR","MAKEUP","BODY","BABY","COMBOS",
    "NEW LAUNCHES","INGREDIENT","ALL PRODUCTS","BLOG",
    "PLANT GOODNESS","STORE LOCATOR"
  ];

  // Get avatar letter
  const avatarLetter = user ? (user.name[0].toUpperCase() || "U") : "U";

  return (
    <div className="w-full">
      {/* Promo Bar */}
      <div className="bg-red-600 text-white text-sm px-4 py-1 text-center">
        Asia's 1st Brand with MADE SAFE Certified Products | Get Upto 35% Off On Orders Above Rs. 999 | Use Code: REDEEM35
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 shadow-md">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-green-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          mamaearth
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for Face Wash"
              className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Cart & User Section */}
        <div className="flex items-center gap-4">
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart */}
            <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            {/* User */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-green-600"
              onClick={user ? logout : () => navigate("/login")}
            >
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center uppercase font-bold">
                {avatarLetter}
              </div>
              {user ? "Logout" : "User"}
            </div>
          </div>

          {/* Mobile Cart */}
          <div className="relative md:hidden cursor-pointer" onClick={() => navigate("/cart")}>
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col gap-3 p-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search for Face Wash"
                className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            {/* Navigation Items */}
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="hover:text-green-600 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* Auth Section */}
            <div className="flex flex-col gap-2 mt-2">
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-green-600"
                onClick={user ? logout : () => navigate("/login")}
              >
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center uppercase font-bold">
                  {avatarLetter}
                </div>
                {user ? "Logout" : "User"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation Menu */}
      <nav className="hidden md:block bg-white shadow-sm">
        <ul className="flex flex-wrap justify-center gap-4 py-2 text-gray-700 font-medium text-sm">
          {items.map((item) => (
            <li key={item} className="hover:text-green-600 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;