import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count from database when user logs in
  useEffect(() => {
    if (user?._id) {
      axios
        .get(`http://localhost:5000/api/cart?userId=${user._id}`)
        .then((res) => setCartCount(res.data.items.length))
        .catch((err) => console.log(err));
    } else {
      setCartCount(0);
    }
  }, [user]);

  // Add to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!user?._id) {
      alert("Please login first");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/cart/add", {
        userId: user._id,
        productId,
        quantity,
      });
      if (res.data.success) setCartCount((prev) => prev + quantity);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};