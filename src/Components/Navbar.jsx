// // import React from "react";
// // import { Search, ShoppingCart, User } from "lucide-react";


// // const Navbar = () => {

    
// //     const items = ["HOME", "FACE", "HAIR", "MAKEUP", "BODY", "BABY", "COMBOS", "NEW LAUNCHES", "INGREDIENT", "ALL PRODUCTS", "BLOG", "PLANT GOODNESS", "STORE LOCATOR"];

// //     return (
// //         <div>
// //             <div className="bg-red-600 text-white text-sm px-4 py-1 text-center">
// //                 Asia's 1st Brand with MADE SAFE Certified Products | Get Upto 35% Off On Orders Above Rs. 999 | Use Code: REDEEM35
// //             </div>
// //             <div>
// //                 <header className="flex items-center justify-between px-6 py-4 shadow-md">
// //                     <div className="text-2xl font-bold text-green-600">mamaearth</div>
// //                     <div className="flex-1 mx-4">
// //                         <div className="relative">
// //                             <input
// //                                 type="text"
// //                                 placeholder="Search for Face Wash"
// //                                 className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
// //                             />
// //                             <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
// //                         </div>
// //                     </div>
// //                     <div className="flex items-center space-x-4">
// //                         <ShoppingCart size={24} />
// //                         <User size={24} />
// //                     </div>
// //                 </header>
// //             </div>
// //             <nav className="bg-white shadow-sm">
// //                 <ul className="flex flex-wrap justify-center gap-4 py-2 text-gray-700 font-medium text-sm">
// //                     {items.map(item => (
// //                         <li key={item} className="hover:text-green-600 cursor-pointer">{item}</li>
// //                     ))}
// //                 </ul>
// //             </nav>

// //         </div>
// //     );
// // };




// // export default Navbar



// // import React, { useContext } from "react";
// // import { Search, ShoppingCart, User } from "lucide-react";
// // import { CartContext } from "../context/CartContext";
// // import { AuthContext } from "../context/AuthContext";
// // import {  useNavigate } from "react-router-dom";

// // const Navbar = () => {
// //   const { cartCount } = useContext(CartContext); // cart count
// //   const { user } = useContext(AuthContext); // logged-in user
// // const navigate = useNavigate();
// //   const items = [
// //     "HOME", "FACE", "HAIR", "MAKEUP", "BODY", "BABY", "COMBOS",
// //     "NEW LAUNCHES", "INGREDIENT", "ALL PRODUCTS", "BLOG", "PLANT GOODNESS", "STORE LOCATOR"
// //   ];

// //   return (
// //     <div className="sticky top-0 z-50">
// //       {/* Top Promo Bar */}
// //       <div className="bg-red-600 text-white text-sm px-4 py-1 text-center">
// //         Asia's 1st Brand with MADE SAFE Certified Products | Get Upto 35% Off On Orders Above Rs. 999 | Use Code: REDEEM35
// //       </div>

// //       {/* Header */}
// //       <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
// //         {/* Logo */}
// //         <div className="text-2xl font-bold text-green-600 cursor-pointer">mamaearth</div>

// //         {/* Search Bar */}
// //         <div className="flex-1 mx-4">
// //           <div className="relative">
// //             <input
// //               type="text"
// //               placeholder="Search for Face Wash"
// //               className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
// //             />
// //             <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
// //           </div>
// //         </div>

// //         {/* User & Cart */}
// //         <div className="flex items-center space-x-4">
// //           {/* Cart */}
// //           <div className="relative cursor-pointer">
// //             <ShoppingCart size={24} />
// //             {cartCount > 0 && (
// //               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
// //                 {cartCount}
// //               </span>
// //             )}
// //           </div>

// //           {/* User Initial */}
// //           <button
// //       onClick={() => {
// //         if (!user) {
// //           navigate("/login"); // go to login if not logged in
// //         } else {
// //           // optional: go to profile page or open dropdown
// //           console.log("User clicked", user.name);
// //         }
// //       }}
// //       className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold cursor-pointer"
// //     >
// //       {user ? user.name[0].toUpperCase() : <User size={16} />}
// //     </button>
// //         </div>
// //       </header>

// //       {/* Navbar Links */}
// //       <nav className="bg-white shadow-sm">
// //         <ul className="flex flex-wrap justify-center gap-4 py-2 text-gray-700 font-medium text-sm">
// //           {items.map(item => (
// //             <li key={item} className="hover:text-green-600 cursor-pointer">{item}</li>
// //           ))}
// //         </ul>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Navbar;





// import React, { useContext } from "react";
// import { Search, ShoppingCart, User } from "lucide-react";
// import { CartContext } from "../context/CartContext";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { cartCount } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const items = [
//     "HOME",
//     "FACE",
//     "HAIR",
//     "MAKEUP",
//     "BODY",
//     "BABY",
//     "COMBOS",
//     "NEW LAUNCHES",
//     "INGREDIENT",
//     "ALL PRODUCTS",
//     "BLOG",
//     "PLANT GOODNESS",
//     "STORE LOCATOR",
//   ];

//   return (
//     <div>
//       {/* Top promo bar */}
//       <div className="bg-red-600 text-white text-sm px-4 py-1 text-center">
//         Asia's 1st Brand with MADE SAFE Certified Products | Get Upto 35% Off On Orders Above Rs. 999 | Use Code: REDEEM35
//       </div>

//       {/* Main header */}
//       <header className="flex items-center justify-between px-6 py-4 shadow-md">
//         <div className="text-2xl font-bold text-green-600 cursor-pointer" onClick={() => navigate("/")}>
//           mamaearth
//         </div>

//         <div className="flex-1 mx-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search for Face Wash"
//               className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//           </div>
//         </div>

//         <div className="flex items-center space-x-4">
//           <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
//             <ShoppingCart size={24} />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </div>

//           <button
//             className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold cursor-pointer"
//             onClick={() => (!user ? navigate("/login") : console.log("Go to profile"))}
//           >
//             {user ? user.name[0].toUpperCase() : <User size={16} />}
//           </button>
//         </div>
//       </header>

//       {/* Navigation menu */}
//       <nav className="bg-white shadow-sm">
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








// // Navbar.js
// import React from "react";
// import { Search, ShoppingCart, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";

// // Auth helper functions


// const [cartCount, setCartCount] = useState(0);
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
// const getUserFromToken = () => {
//   const token = localStorage.getItem("token");
//   if (!token) return null;

//   try {
//     const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT payload
//     return { id: payload.id };
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
//   const user = getUserFromToken(); // check if logged in

//   const items = [
//     "HOME","FACE","HAIR","MAKEUP","BODY","BABY","COMBOS",
//     "NEW LAUNCHES","INGREDIENT","ALL PRODUCTS","BLOG",
//     "PLANT GOODNESS","STORE LOCATOR"
//   ];

//   return (
//     <div>
//       {/* Promo Bar */}
//       <div className="bg-red-600 text-white text-sm px-4 py-1 text-center">
//         Asia's 1st Brand with MADE SAFE Certified Products | Get Upto 35% Off On Orders Above Rs. 999 | Use Code: REDEEM35
//       </div>

//       {/* Main Header */}
//       <header className="flex items-center justify-between px-6 py-4 shadow-md">
//         {/* Logo */}
//         <div className="text-2xl font-bold text-green-600 cursor-pointer" onClick={() => navigate("/")}>
//           mamaearth
//         </div>

//         {/* Search Bar */}
//         <div className="flex-1 mx-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search for Face Wash"
//               className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//           </div>
//         </div>

//         {/* User / Cart Section */}
//         <div className="flex items-center space-x-4">
//           {user ? (
//             <>
//                <div className="relative">
//         <ShoppingCart size={24} />
//         {cartCount > 0 && (
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//             {cartCount}
//           </span>
//         )}
//       </div>
//               <div className="flex items-center gap-2 cursor-pointer" onClick={logout}>
//                 <User size={24} /> Logout
//               </div>
//             </>
//           ) : (
//             <>
//               <div
//                 className="cursor-pointer hover:text-green-600"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </div>
//               <div
//                 className="cursor-pointer hover:text-green-600"
//                 onClick={() => navigate("/register")}
//               >
//                 Register
//               </div>
//             </>
//           )}
//         </div>
//       </header>

//       {/* Navigation Menu */}
//       <nav className="bg-white shadow-sm">
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



// Navbar.js
import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Auth helper functions
const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT payload
    return { id: payload.id };
  } catch (err) {
    return null;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUserFromToken(); // check if logged in

  const [cartCount, setCartCount] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCartCount(res.data.length))
      .catch((err) => console.log(err));
  }, [token]);

  const items = [
    "HOME","FACE","HAIR","MAKEUP","BODY","BABY","COMBOS",
    "NEW LAUNCHES","INGREDIENT","ALL PRODUCTS","BLOG",
    "PLANT GOODNESS","STORE LOCATOR"
  ];

  return (
    <div>
      {/* Promo Bar */}
      <div className="bg-red-600 text-white text-sm px-4 py-1 text-center">
        Asia's 1st Brand with MADE SAFE Certified Products | Get Upto 35% Off On Orders Above Rs. 999 | Use Code: REDEEM35
      </div>

      {/* Main Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md">
        {/* Logo */}
        <div className="text-2xl font-bold text-green-600 cursor-pointer" onClick={() => navigate("/")}>
          mamaearth
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for Face Wash"
              className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* User / Cart Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 cursor-pointer" onClick={logout}>
                <User size={24} /> Logout
              </div>
            </>
          ) : (
            <>
              <div
                className="cursor-pointer hover:text-green-600"
                onClick={() => navigate("/login")}
              >
                Login
              </div>
              <div
                className="cursor-pointer hover:text-green-600"
                onClick={() => navigate("/register")}
              >
                Register
              </div>
            </>
          )}
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-white shadow-sm">
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