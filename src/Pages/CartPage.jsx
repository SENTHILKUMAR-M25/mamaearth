import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const API_CART = "http://localhost:5000/api/cart";

const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get(API_CART, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          "x-session-id": getSessionId(),
        },
      });
      setCartItems(res.data || []);
    } catch {
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const updateQuantity = async (id, newQty, stock) => {
    const availableStock = stock - 2; // RESERVED
    if (newQty < 1) return;
    if (newQty > availableStock) {
      alert(`⚠️ Maximum stock available: ${availableStock}`);
      return;
    }

    setLoadingItemId(id);
    try {
      await axios.put(`${API_CART}/update/${id}`, { quantity: newQty }, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          "x-session-id": getSessionId(),
        },
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update");
    } finally {
      setLoadingItemId(null);
    }
  };

  const removeItem = async (id) => {
    setLoadingItemId(id);
    try {
      await axios.delete(`${API_CART}/remove/${id}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          "x-session-id": getSessionId(),
        },
      });
      setCartItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setLoadingItemId(null);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckout = () => {
    if (!token) return navigate("/login");
    if (cartItems.length === 0) return toast.error("Cart is empty");
    navigate("/checkout");
  };

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
        <h2 className="text-3xl font-bold mb-2">🛒 Your Cart is Empty</h2>
        <p className="text-sm">Looks like you haven’t added anything yet.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-xl hover:scale-105 transform transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-black">🛒 Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-between items-center bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex gap-4 items-center w-full md:w-auto">
                <img
                  src={item.product?.image ? `http://localhost:5000/uploads/${item.product.image}` : "/placeholder.png"}
                  alt={item.product?.name}
                  className="w-24 h-24 object-contain bg-gray-100 p-2 rounded-xl"
                />
                <div className="flex flex-col justify-center">
                  <h2 className="p-4 font-medium text-gray-700">
                    <span title={item.product?.name}>
                      {item.product?.name.length > 30
                        ? item.product.name.slice(0, 30) + "..."
                        : item.product?.name}
                    </span>
                  </h2>
                  <p className="text-gray-700">₹ {item.product?.price}</p>
                  <p className="text-green-400 font-semibold">₹ {item.product?.price * item.quantity}</p>
                </div>
              </div>

              {/* Quantity & Remove */}
              <div className="flex items-center text-xl gap-4 mt-4 md:mt-0">
                <div className="flex items-center border border-white/30 rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1, item.product.quantity)}
                    disabled={loadingItemId === item._id}
                    className="px-3 py-1 text-gray-800 hover:bg-white/10 transition"
                  >−</button>
                  <span className="px-4 text-black/75 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1, item.product.quantity)}
                    disabled={loadingItemId === item._id}
                    className="px-3 py-1 text-gray-800 hover:bg-white/10 transition"
                  >+</button>
                </div>
                <button onClick={() => removeItem(item._id)} className="text-red-400 hover:text-red-500 transition">
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl h-fit sticky top-20">
          <h2 className="text-xl font-bold mb-4 text-blue-600">Order Summary</h2>
          <div className="flex justify-between text-gray-700 mb-2"><span>Items</span><span>{cartItems.length}</span></div>
          <div className="flex justify-between text-gray-700 mb-2"><span>Subtotal</span><span>₹ {total}</span></div>
          <hr className="border-gray-500 my-3" />
          <div className="flex justify-between font-bold text-black text-lg mb-4"><span>Total</span><span>₹ {total}</span></div>
          <button
            onClick={handleCheckout}
            className="w-full mt-2 bg-linear-to-r from-indigo-500 to-purple-500 py-3 rounded-xl font-semibold hover:scale-105 transform transition-all"
          >
            Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;