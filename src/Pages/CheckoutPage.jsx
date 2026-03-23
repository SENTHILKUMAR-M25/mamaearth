import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_CART = "http://localhost:5000/api/cart";
const API_ORDER = "http://localhost:5000/api/orders";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    contactNumber: "",
    email: "",
    address: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get(API_CART, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data || []);
    } catch {
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckout = async (e) => {
  e.preventDefault();
  if (!userId) return toast.error("Please login first");
  if (cartItems.length === 0) return toast.error("Cart is empty");

  setLoading(true);
  try {
    const products = cartItems.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const orderData = { userId, ...form, products, totalAmount };

    const res = await axios.post(API_ORDER, orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data);
    
    if (res.data.success) {
      // Show confirmation alert
      window.alert("✅ Your order has been placed successfully!");
      
      // Clear form and cart
      setCartItems([]);
      setForm({ name: "", contactNumber: "", email: "", address: "", pincode: "" });
    } else {
      window.alert("❌ Failed to place order. Please try again.");
    }
  } catch (err) {
    console.error("Checkout Error:", err);
    window.alert("❌ Failed to place order. Please try again.");
  } finally {
    setLoading(false);
  }
};
  if (cartItems.length === 0 && !showPopup) {
    return <p className="text-center mt-10 text-gray-500 text-lg">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Cart Summary */}
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Cart Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white/70 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5000/uploads/${item.product.image}`}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x ₹{item.product.price}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">₹{item.product.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-bold mt-6 text-gray-800">Total: ₹{totalAmount}</h3>
        </div>

        {/* Checkout Form */}
        <form
          onSubmit={handleCheckout}
          className="space-y-4 bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Your Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={form.contactNumber}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl font-bold shadow-lg hover:scale-105 transform transition-all"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm text-center shadow-2xl border border-gray-200">
            <p className="text-lg font-semibold mb-6">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-linear-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:scale-105 transform transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;