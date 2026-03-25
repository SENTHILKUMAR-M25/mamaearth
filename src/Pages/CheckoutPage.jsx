import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_CART = "http://localhost:5000/api/cart";
const API_ORDER = "http://localhost:5000/api/orders";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch cart items
  const fetchCart = async () => {
    if (!token) return navigate("/login");

    try {
      const res = await axios.get(API_CART, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please login to checkout");
      navigate("/login");
    } else {
      fetchCart();
    }
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      return toast.error("Please fill all required fields");
    }

    // Check stock before placing order
    for (let item of cartItems) {
      if (item.quantity > item.product.quantity) {
        return toast.error(`${item.product.name} is out of stock`);
      }
    }

    try {
      const formattedItems = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      await axios.post(
        API_ORDER,
        { ...form, items: formattedItems, totalAmount: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully 🎉");

      setForm({ name: "", phone: "", email: "", address: "", pincode: "" });
      setCartItems([]);
      navigate("/");
    } catch (err) {
      console.log("Order Error:", err.response?.data);
      toast.error(err.response?.data?.msg || "Order failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* Shipping Form */}
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">🚚 Shipping Details</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <textarea
            name="address"
            placeholder="Full Address *"
            value={form.address}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode *"
            value={form.pincode}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <button
          onClick={placeOrder}
          className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:opacity-90 transition"
        >
          Place Order →
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow-md h-fit sticky top-20">
        <h2 className="text-2xl font-bold mb-6">🧾 Order Summary</h2>
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={`http://localhost:5000/uploads/${item.product.image}`}
                  alt={item.product.name}
                  className="w-14 h-14 object-contain bg-gray-100 p-1 rounded"
                />
                <div>
                  <p className="font-semibold text-sm">{item.product.name}</p>
                  <p className="text-xs text-gray-500">
                    ₹ {item.product.price} × {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-bold text-sm">
                ₹ {item.product.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2 text-gray-600">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {total}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="text-green-500">Free</span>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹ {total}</span>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          🔒 Secure Checkout | Cash on Delivery Available
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;