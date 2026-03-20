import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const API = "http://localhost:5000/api/products";

const ProductCard = ({ selectedCategory }) => {
  const scrollRef = useRef();
  const [products, setProducts] = useState([]);

  // 📥 Fetch products from backend
  useEffect(() => {
    axios
      .get(API)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔎 Filter products by selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // 🖱️ Scroll function for carousel
  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // ❌ Show message if no products
  if (filteredProducts.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-gray-500">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="relative px-4 py-6">

      {/* 🔘 Only show scroll buttons if there are products */}
      {filteredProducts.length > 0 && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full border border-gray-100 hover:bg-gray-50 transition"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full border border-gray-100 hover:bg-gray-50 transition"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {filteredProducts.map((product) => {
          const discount = product.originalPrice
            ? Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) *
                  100
              )
            : 0;

          return (
            <div
              key={product._id}
              className=" min-w-[280px] bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col relative group"
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
                <h2 className="text-[15px] font-bold text-gray-800 line-clamp-2 leading-snug min-h-[40px]">
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
    </div>
  );
};

export default ProductCard;