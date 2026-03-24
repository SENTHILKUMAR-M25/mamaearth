import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_CART = "http://localhost:5000/api/cart";
const API_PRODUCTS = "http://localhost:5000/api/products";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch all products (needed for guest cart mapping)
  useEffect(() => {
    axios.get(API_PRODUCTS).then((res) => setProducts(res.data)).catch(console.log);
  }, []);

  // Fetch cart (user or guest)
  const fetchCart = async () => {
    if (!token) {
      // Guest cart
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const mappedCart = guestCart.map((item) => ({
        _id: item.productId,
        product: products.find((p) => p._id === item.productId) || {},
        quantity: item.quantity,
      }));
      setCartItems(mappedCart);
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get(API_CART, { headers });
      setCartItems(res.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token, products]);


const updateQuantity = async (id, newQty, stock) => {
  if (newQty < 1) return;

  // Limit to stock
  const maxStock = Math.min(stock, stock-2);
  if (newQty > maxStock) return toast.error(`Only ${maxStock} in stock`);

  setLoadingItemId(id);

  try {
    if (!token) {
      // Update guest cart
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const item = guestCart.find((i) => i.productId === id);
      if (!item) return;
      item.quantity = newQty;
      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      setCartItems((prev) =>
        prev.map((c) => (c._id === id ? { ...c, quantity: newQty } : c))
      );
    } else {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(`${API_CART}/update/${id}`, { quantity: newQty }, { headers });
      setCartItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, quantity: newQty } : item))
      );
    }
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.msg || "Failed to update quantity");
  } finally {
    setLoadingItemId(null);
  }
};
  // Remove item
  const removeItem = async (id) => {
    setLoadingItemId(id);
    try {
      if (!token) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        localStorage.setItem(
          "guestCart",
          JSON.stringify(guestCart.filter((item) => item.productId !== id))
        );
        setCartItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        const headers = { Authorization: `Bearer ${token}` };
        await axios.delete(`${API_CART}/remove/${id}`, { headers });
        setCartItems((prev) => prev.filter((item) => item._id !== id));
      }
      toast.success("Item removed");
    } catch (err) {
      console.log(err);
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

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <h2 className="text-2xl font-bold mb-2">🛒 Your Cart is Empty</h2>
        <p className="text-sm">Looks like you haven’t added anything yet.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">🛒 Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">

        {/* CART ITEMS */}
        <div className="md:col-span-2 space-y-5">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white/70 backdrop-blur-md border border-gray-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product?.image ? `http://localhost:5000/uploads/${item.product.image}` : "/placeholder.png"}
                  alt={item.product?.name}
                  className="w-24 h-24 object-contain rounded-lg bg-gray-100 p-2"
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.product?.name || "Product unavailable"}</h2>
                  <p className="text-gray-500 text-sm">₹ {item.product?.price || 0}</p>
                  <p className="text-sm mt-1 font-semibold text-green-600">₹ {(item.product?.price || 0) * item.quantity}</p>
                  {item.product?.quantity <= 5 && item.product?.quantity > 0 && <p className="text-xs text-orange-500 mt-1">Only few left!</p>}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1, item.product.quantity)} disabled={loadingItemId === item._id} className="px-3 py-1 hover:bg-gray-100">−</button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1, item.product.quantity)} disabled={loadingItemId === item._id} className="px-3 py-1 hover:bg-gray-100">+</button>
                </div>
                <button onClick={() => removeItem(item._id)} disabled={loadingItemId === item._id} className="text-red-500 hover:text-red-700 transition"><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-200 p-6 rounded-2xl shadow-md h-fit sticky top-20">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2 text-gray-600"><span>Items</span><span>{cartItems.length}</span></div>
          <div className="flex justify-between mb-2 text-gray-600"><span>Subtotal</span><span>₹ {total}</span></div>
          <div className="flex justify-between mb-2 text-gray-600"><span>Delivery</span><span className="text-green-500">Free</span></div>
          <hr className="my-3" />
          <div className="flex justify-between text-lg font-bold"><span>Total</span><span>₹ {total}</span></div>
          <button onClick={handleCheckout} className="w-full mt-5 bg-linear-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-bold hover:opacity-90 transition">Proceed to Checkout →</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;