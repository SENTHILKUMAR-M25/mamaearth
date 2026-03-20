import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    products: 0,
    categories: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [productsRes, categoriesRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/categories"),
        ]);

        setCounts({
          products: productsRes.data.length || 0,
          categories: categoriesRes.data.length || 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchCounts();
  }, []);

  // Prepare data for mapping and charts
  const statData = [
    { name: "Products", value: counts.products, color: "#3B82F6" }, // Blue
    { name: "Categories", value: counts.categories, color: "#10B981" }, // Green
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards using Map */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statData.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-gray-500 text-sm font-medium uppercase">{stat.name}</h2>
            <p className="text-3xl font-bold mt-2" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Distribution Breakdown</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;