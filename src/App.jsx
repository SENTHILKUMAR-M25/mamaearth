// import HomePage from "./Pages/Home"

// function App() {

//   return (
//    <>
//    <HomePage />
//    </>
//   )
// }

// export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./Pages/Home";

// Admin
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import ProductControl from "./Admin/ProductControl";
import CategoryControl from "./Admin/CategoryControl";
import CategoryPage from "./Pages/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Page */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductControl />} />
          <Route path="categories" element={<CategoryControl />} />
        </Route>
        <Route path="/category/:name" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;