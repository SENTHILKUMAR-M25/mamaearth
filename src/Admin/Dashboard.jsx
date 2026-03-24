import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    products: 0,
    categories: 0,
    orders: 0,
  });

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/orders"),
        ]);

        // ✅ Counts
        setCounts({
          products: productsRes.data.length || 0,
          categories: categoriesRes.data.length || 0,
          orders: ordersRes.data.length || 0,
        });

        // ✅ Group & SORT orders by date
        const grouped = {};

        ordersRes.data.forEach((order) => {
          const date = new Date(order.createdAt).toLocaleDateString();
          grouped[date] = (grouped[date] || 0) + 1;
        });

        const formatted = Object.keys(grouped)
          .map((date) => ({
            date,
            orders: grouped[date],
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // 🔥 FIX

        setOrderData(formatted);
      } catch (err) {
        console.error("Dashboard Error:", err);
      }
    };

    fetchData();
  }, []);

  const statData = [
    { name: "Products", value: counts.products, color: "#3B82F6" },
    { name: "Categories", value: counts.categories, color: "#10B981" },
    { name: "Orders", value: counts.orders, color: "#F59E0B" },
  ];

  return (
    <div className="p-6 bg-gray-50 h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statData.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-gray-500 text-sm uppercase">{stat.name}</h2>
            <p className="text-3xl font-bold mt-2" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section (FIXED) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            Distribution Breakdown
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={80}
                >
                  {statData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            Orders Analytics 📈
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#6366F1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;