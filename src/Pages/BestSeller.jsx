// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "../Components/ProductCard";

// const CATEGORY_API = "http://localhost:5000/api/categories";

// const BestSellers = () => {
//   const [categories, setCategories] = useState([]);

//   // 📥 Fetch categories
//   useEffect(() => {
//     axios
//       .get(CATEGORY_API)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <section className="px-6 py-12 bg-gray-50">
      

//       {/* 🔥 LOOP EACH CATEGORY */}
//       {categories.map((cat) => (
//         <div key={cat._id} className="mb-16 mx-20">
          
//           {/* CATEGORY HEADER */}
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h3 className="text-2xl font-semibold text-gray-800">
//                 {cat.name}
//               </h3>
//               <p className="text-gray-500 text-sm mt-1">
//                 {cat.disc || "No description available"} {/* ✅ Use disc */}
//               </p>
//             </div>
//             <button className="bg-blue-500 p-2 rounded-lg text-white font-medium hover:underline">
//               VIEW ALL
//             </button>
//           </div>

//           {/* PRODUCTS GRID */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//             <ProductCard selectedCategory={cat.name} />
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default BestSellers;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

const CATEGORY_API = "http://localhost:5000/api/categories";

const BestSellers = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(CATEGORY_API)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="px-6 py-12 bg-gray-50">
      {categories.map((cat) => (
        <div key={cat._id} className="mb-16 mx-20">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {cat.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {cat.disc || "No description available"}
              </p>
            </div>

            <button
              onClick={() => navigate(`/category/${cat.name}`)} // ✅ Navigate to category page
              className="bg-blue-500 p-2 rounded-lg text-white font-medium hover:underline"
            >
              VIEW ALL
            </button>
          </div>

          <div className=" ">
            <ProductCard selectedCategory={cat.name} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default BestSellers;