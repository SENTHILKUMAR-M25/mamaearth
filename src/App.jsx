// // import HomePage from "./Pages/Home"

// // function App() {

// //   return (
// //    <>
// //    <HomePage />
// //    </>
// //   )
// // }

// // export default App

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // Pages
// import HomePage from "./Pages/Home";

// // Admin
// import AdminLayout from "./Admin/AdminLayout";
// import Dashboard from "./Admin/Dashboard";
// import ProductControl from "./Admin/ProductControl";
// import CategoryControl from "./Admin/CategoryControl";
// import CategoryPage from "./Pages/CategoryPage";
// import SubcategoryControl from "./Admin/Subcategory";
// import { CartProvider } from "./context/CartContext";
// import LoginPage from "./Pages/Login";
// import RegisterPage from "./Pages/Register";

// function App() {
//   return (
//     <CartProvider >
//     <BrowserRouter>

//       <Routes>
//         {/* User Page */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />


//         {/* Admin Panel */}
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="products" element={<ProductControl />} />
//           <Route path="categories" element={<CategoryControl />} />
//           <Route path="subcategories" element={<SubcategoryControl />} />
//         </Route>
//         <Route path="/category/:name" element={<CategoryPage />} />
//       </Routes>
//     </BrowserRouter>
//     </CartProvider>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Pages
import HomePage from "./Components/Home";
import LoginPage from "./auth/Login";
import RegisterPage from "./auth/Register";
import CategoryPage from "./Pages/CategoryPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
// // Admin
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import ProductControl from "./Admin/ProductControl";
import CategoryControl from "./Admin/CategoryControl";
import SubcategoryControl from "./Admin/Subcategory";

// Context
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import UserTable from "./Admin/UserTable";
import OrderTable from "./Admin/Order";
import { useEffect } from "react";



function App() {
 
  useEffect(() => {
    let sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("sessionId", sessionId);
    }
  }, []);


  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* User Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* Admin Panel */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductControl />} />
              <Route path="categories" element={<CategoryControl />} />
              <Route path="subcategories" element={<SubcategoryControl />} />
              <Route path="users" element={<UserTable />} />
              <Route path="order" element={<OrderTable />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;