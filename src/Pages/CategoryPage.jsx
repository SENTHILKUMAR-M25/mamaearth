


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Star } from "lucide-react";

const API_PRODUCTS = "http://localhost:5000/api/products";
const API_CATEGORIES = "http://localhost:5000/api/categories";

const CategoryPage = () => {
  const { name } = useParams(); // Category name from URL
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch category info
    axios
      .get(API_CATEGORIES)
      .then((res) => {
        const cat = res.data.find((c) => c.name === name);
        setCategory(cat);
      })
      .catch((err) => console.log(err));
  }, [name]);

  useEffect(() => {
    // Fetch all products
    axios
      .get(API_PRODUCTS)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!category) return <p>Loading...</p>;

  // Filter products for selected category
  const filteredProducts = products.filter((p) => p.category === category.name);

  return (
    <div className="px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-gray-500 mb-8">{category.disc || "No description available"}</p>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-6">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const discount = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                )
              : 0;

            return (
              <div
                key={product._id}
                className="w-70 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col relative group"
              >
                {/* Label */}
                {product.label && (
                  <div className="absolute top-0 left-0 bg-[#98D148] text-white text-[11px] font-bold px-3 py-1.5 rounded-br-lg z-10 uppercase tracking-wide">
                    {product.label}
                  </div>
                )}

                {/* Image */}
                <div className="flex items-center justify-center">
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    className="h-36 object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="px-4 pb-4 flex-1 text-center">
                  <h2 className="text-[15px] font-bold text-gray-800 line-clamp-2 leading-snug min-h-10">
                    {product.name}
                  </h2>

                  {/* Features */}
                  <div className="text-[#eBA31F] text-[13px] font-semibold mt-2">
                    {Array.isArray(product.features)
                      ? product.features.join(" | ")
                      : product.features}
                  </div>

                  {/* Volume */}
                  <div className="text-gray-700 text-[14px] mt-3 font-medium">
                    {product.volume}
                  </div>

                  {/* Rating */}
                  <div className="flex justify-between items-center gap-1 mt-2 text-[13px] font-bold text-gray-800">
                    <div className="flex gap-3 justify-center items-center">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                    <span className="text-blue-500 flex items-center gap-1">
                      <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-2 h-2 text-white fill-current"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      </span>
                      {product.reviews} Reviews
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-2xl font-black text-gray-900">
                        ₹ {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-lg">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    {discount > 0 && (
                      <span className="bg-[#BCE27D] text-[#4A6D15] text-[11px] font-bold px-2 py-0.5 rounded">
                        {discount}% off
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => alert("Added to cart")}
                  className="w-full bg-[#00B5EF] hover:bg-[#0094C4] text-white py-4 text-[16px] font-black uppercase tracking-widest transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;