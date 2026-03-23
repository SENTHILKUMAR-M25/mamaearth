import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_CART = "http://localhost:5000/api/cart";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loadingItemId, setLoadingItemId] = useState(null); // for disabling buttons
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch cart items
  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get(API_CART, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // Update quantity
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    setLoadingItemId(id);
    try {
      await axios.put(
        `${API_CART}/update/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, quantity } : item))
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to update quantity");
    } finally {
      setLoadingItemId(null);
    }
  };

  // Remove item
  const removeItem = async (id) => {
    setLoadingItemId(id);
    try {
      await axios.delete(`${API_CART}/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Item removed");
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove item");
    } finally {
      setLoadingItemId(null);
    }
  };

  // Calculate total safely
  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  // Handle Checkout button
  const handleCheckout = () => {
    if (!token) return toast.error("Please login first");
    if (cartItems.length === 0) return toast.error("Cart is empty");
    navigate("/checkout"); // assuming you have a Checkout page route
  };

  if (!cartItems || cartItems.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        Your cart is empty.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-white p-4 rounded shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  item.product?.image
                    ? `http://localhost:5000/uploads/${item.product.image}`
                    : "/placeholder.png"
                }
                alt={item.product?.name || "Product"}
                className="w-20 h-20 object-contain"
              />
              <div>
                <h2 className="font-semibold">
                  {item.product?.name || "Product unavailable"}
                </h2>
                <p className="text-gray-500">₹ {item.product?.price || 0}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
                disabled={loadingItemId === item._id}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
                disabled={loadingItemId === item._id}
              >
                +
              </button>
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500 hover:text-red-700"
                disabled={loadingItemId === item._id}
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: ₹ {total}</h2>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded font-bold"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;