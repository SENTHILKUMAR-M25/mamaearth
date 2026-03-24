import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderTable = ({ userView = false }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const ordersPerPage = 7;

  const API = userView
    ? "http://localhost:5000/api/orders/my"
    : "http://localhost:5000/api/orders";

  const token = localStorage.getItem("token");

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(API, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setOrders(res.data);
      setFilteredOrders(res.data);
    } catch (err) {
      console.error("Fetch Orders Error:", err);
      alert("❌ Failed to fetch orders!");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle search filter
  useEffect(() => {
    const filtered = orders.filter((o) =>
      [o._id, o.name, o.phone, o.email, o.address]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [search, orders]);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl shadow-2xl p-6">
        <h2 className="text-2xl font-extrabold text-white mb-4 flex items-center gap-2">
          📦 {userView ? "My Orders" : "All Orders"}
        </h2>

        {/* Search */}
        <div className="mb-6 flex justify-end">
          <input
            type="text"
            placeholder="Search by ID, Name, Phone, Email, Address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl w-full max-w-md bg-white/10 text-white placeholder-white/70 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead className="bg-indigo-900/30 text-white text-sm">
              <tr>
                <th className="p-3 rounded-tl-2xl">Order ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
                <th className="p-3">Address</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3 rounded-tr-2xl">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-10 text-gray-400">
                    No orders found
                  </td>
                </tr>
              ) : (
                currentOrders.map((o) => (
                  <tr
                    key={o._id}
                    className="border-b border-white/20 hover:bg-indigo-800/20 transition"
                  >
                    <td className="p-3 font-semibold truncate max-w-[120px]" title={o._id}>
                      {o._id.slice(0, 15)}...
                    </td>
                    <td className="p-3 truncate max-w-[150px]" title={o.name}>
                      {o.name.length > 20 ? o.name.slice(0, 20) + "..." : o.name}
                    </td>
                    <td className="p-3 truncate max-w-[100px]" title={o.phone}>{o.phone}</td>
                    <td className="p-3 truncate max-w-[150px]" title={o.email || "-"}>
                      {o.email || "-"}
                    </td>
                    <td className="p-3 truncate max-w-[200px]" title={o.address}>
                      {o.address}
                    </td>
                    <td className="p-3 truncate max-w-[200px]" title={o.items.map(item => `${item.product} x ${item.quantity}`).join(", ")}>
                      {o.items.length} {o.items.length === 1 ? "item" : "items"}
                    </td>
                    <td className="p-3 font-bold text-green-400">₹{o.totalAmount}</td>
                    <td className="p-3">{new Date(o.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-semibold"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-xl font-semibold ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "bg-indigo-700/30 hover:bg-indigo-600 text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-1 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-semibold"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTable;