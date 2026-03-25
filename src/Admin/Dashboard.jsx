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

        setCounts({
          products: productsRes.data.length || 0,
          categories: categoriesRes.data.length || 0,
          orders: ordersRes.data.length || 0,
        });

        // Group orders by date
        const grouped = {};
        ordersRes.data.forEach((order) => {
          const date = new Date(order.createdAt).toLocaleDateString();
          grouped[date] = (grouped[date] || 0) + 1;
        });

        const formatted = Object.keys(grouped)
          .map((date) => ({ date, orders: grouped[date] }))
          .sort((a, b) => new Date(a.date) - new Date(b.date));

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
    <div className="p-4  w-full md:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">📊 Dashboard Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {statData.map((stat, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
          >
            <h2 className="uppercase text-gray-300 text-sm">{stat.name}</h2>
            <p
              className="text-3xl font-bold mt-2"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-lg font-semibold mb-4">
            Distribution Breakdown
          </h2>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  labelStyle={{ fill: "#fff", fontSize: 12 }}
                >
                  {statData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", borderRadius: 8 }}
                />
                <Legend
                  wrapperStyle={{ color: "#e5e7eb" }}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Line Chart */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-lg font-semibold mb-4">Orders Analytics 📈</h2>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" tick={{ fill: "#d1d5db" }} />
                <YAxis tick={{ fill: "#d1d5db" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", borderRadius: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#6366F1"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
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