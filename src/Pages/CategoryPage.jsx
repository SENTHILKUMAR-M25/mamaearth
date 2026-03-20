import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../Components/ProductCard";

const API_PRODUCTS = "http://localhost:5000/api/products";
const API_CATEGORIES = "http://localhost:5000/api/categories";

const CategoryPage = () => {
  const { name } = useParams(); // Get category name from URL
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Get category info
    axios.get(`${API_CATEGORIES}`)
      .then((res) => {
        const cat = res.data.find((c) => c.name === name);
        setCategory(cat);
      })
      .catch((err) => console.log(err));

    // Get products for this category
    axios.get(API_PRODUCTS)
      .then((res) => {
        const filtered = res.data.filter((p) => p.category === name);
        setProducts(filtered);
      })
      .catch((err) => console.log(err));
  }, [name]);

  if (!category) return <p>Loading...</p>;

  return (
    <div className="px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-gray-500 mb-8">{category.disc || "No description available"}</p>

      {products.length === 0 ? (
        <p className="text-gray-600">No products available in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded shadow p-4">
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                className="h-40 w-full object-contain mb-3"
              />
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-gray-700 font-bold mt-1">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;