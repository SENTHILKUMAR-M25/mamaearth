import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";

const API = "http://localhost:5000/api/products";
const API_CART_ADD = "http://localhost:5000/api/cart/add";

const ProductCard = ({ selectedCategory }) => {
  const scrollRef = useRef();
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    axios
      .get(API)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Filter by category
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

  // Scroll carousel
  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Add to cart handler
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    // ---------------- Guest Cart ----------------
    if (!token) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const existing = guestCart.find((item) => item.productId === product._id);

      if (existing) {
        if (existing.quantity + 1 > product.quantity) {
          return toast.error("Out of stock");
        }
        existing.quantity += 1;
      } else {
        guestCart.push({ productId: product._id, quantity: 1 });
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      toast.success("Added to cart (Guest)");
      return;
    }

    // ---------------- Logged-in User ----------------
    if (product.quantity === 0) return toast.error("Out of stock");

    try {
      await axios.post(
        API_CART_ADD,
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to cart");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Failed to add to cart");
    }
  };

  // Merge guest cart into user cart after login
  useEffect(() => {
    const mergeGuestCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      if (!guestCart.length) return;

      try {
        for (let item of guestCart) {
          await axios.post(
            API_CART_ADD,
            { productId: item.productId, quantity: item.quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
        localStorage.removeItem("guestCart");
        toast.success("Guest cart merged with your account");
      } catch (err) {
        console.error(err);
      }
    };

    mergeGuestCart();
  }, []);

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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full border border-gray-100 hover:bg-gray-50"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full border border-gray-100 hover:bg-gray-50"
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
                ((product.originalPrice - product.price) / product.originalPrice) * 100
              )
            : 0;

          return (
            <div
              key={product._id}
              className="w-70 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col relative group"
            >
              {/* Stock Label */}
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

              {/* Overlay when out of stock */}
              {product.quantity === 0 && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center text-red-600 font-bold text-lg z-20">
                  Out of Stock
                </div>
              )}

              {/* Image */}
              <div className="flex items-center justify-center p-3">
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="h-36 object-contain"
                />
              </div>

              {/* Product Info */}
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
                <div className="flex justify-between items-center mt-2 text-[13px] font-bold text-gray-800">
                  <div className="flex gap-1 items-center">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-blue-500 text-xs">{product.reviews} Reviews</span>
                </div>

                {/* Pricing */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <span className="text-xl font-black text-gray-900">₹{product.price}</span>
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

              {/* Add to Cart */}
              <div className="p-3">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.quantity === 0}
                  className={`w-full py-2 rounded-lg font-bold text-sm transition ${
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





