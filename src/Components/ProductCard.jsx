import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const API = "http://localhost:5000/api/products";
const API_CART_ADD = "http://localhost:5000/api/cart/add";

// 🔥 Generate / Get sessionId
const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

const ProductCard = ({ selectedCategory }) => {
  const scrollRef = useRef();
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    axios
      .get(API)
      .then((res) => setProducts(res.data))
      .catch(console.log);
  }, []);

  // Filter
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (p) =>
            p.category &&
            (typeof p.category === "string"
              ? p.category === selectedCategory
              : p.category.name === selectedCategory)
        );

  // Scroll
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  // ================= ADD TO CART =================
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    const sessionId = getSessionId();

    if (product.quantity === 0) {
      return toast.error("Out of stock");
    }

    try {
      await axios.post(
        API_CART_ADD,
        {
          productId: product._id,
          quantity: 1,
          sessionId, // 🔥 for guest
        },
        {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        }
      );

      alert("Added to cart");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Failed to add to cart");
    }
  };

  // ❌ REMOVED:
  // localStorage guestCart
  // mergeGuestCart useEffect

  if (filteredProducts.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-gray-500">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="relative px-4 py-6">
      {/* Scroll Buttons */}
      {filteredProducts.length > 0 && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full border hover:bg-gray-50"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full border hover:bg-gray-50"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Products */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {filteredProducts.map((product) => {
          const discount = product.originalPrice
            ? Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )
            : 0;

          return (
            <div
              key={product._id}
              className="w-70 bg-white border rounded-xl overflow-hidden flex flex-col relative group"
            >
              {/* Stock */}
              <div className="absolute top-2 left-2 z-10">
                {product.quantity === 0 ? (
                  <span className="bg-red-500 text-white text-[10px] px-3 py-1 rounded-full font-bold">
                    Out of Stock
                  </span>
                ) : product.quantity <= 5 ? (
                  <span className="bg-orange-500 text-white text-[10px] px-3 py-1 rounded-full font-bold">
                    Low Stock
                  </span>
                ) : (
                  <span className="bg-green-500 text-white text-[10px] px-3 py-1 rounded-full font-bold">
                    In Stock
                  </span>
                )}
              </div>

              {/* Overlay */}
              {product.quantity === 0 && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center text-red-600 font-bold z-20">
                  Out of Stock
                </div>
              )}

              {/* Image */}
              <div className="flex justify-center p-3">
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="h-36 object-contain"
                />
              </div>

              {/* Info */}
              <div className="px-4 pb-4 flex-1 text-center">
                <h2 className="text-[15px] font-bold text-gray-800 line-clamp-2 min-h-[40px]">
                  {product.name}
                </h2>

                <div className="text-[#eBA31F] text-[13px] font-semibold mt-2">
                  {Array.isArray(product.features)
                    ? product.features.join(" | ")
                    : product.features}
                </div>

                <div className="text-gray-700 text-[14px] mt-2 font-medium">
                  {product.volume}
                </div>

                {/* Rating */}
                <div className="flex justify-between mt-2 text-[13px] font-bold text-gray-800">
                  <div className="flex gap-1 items-center">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    {product.rating}
                  </div>
                  <span className="text-blue-500 text-xs">
                    {product.reviews} Reviews
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <span className="text-xl font-black">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {discount > 0 && (
                    <span className="bg-[#BCE27D] text-[#4A6D15] text-[10px] px-2 py-1 rounded">
                      {discount}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Button */}
              <div className="p-3">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.quantity === 0}
                  className={`w-full py-2 rounded-lg font-bold ${
                    product.quantity > 0
                      ? "bg-[#00B5EF] hover:bg-[#0094C4] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCard;