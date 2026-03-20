import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/admin",
    },
    {
      name: "Products",
      icon: <Package size={18} />,
      path: "/admin/products",
    },
    {
      name: "Categories",
      icon: <Layers size={18} />,
      path: "/admin/categories",
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 z-40
        ${open ? "w-64" : "w-0 lg:w-20 overflow-hidden"}`}
      >
        {/* Logo */}
        <div className="p-5 text-xl font-bold border-b border-gray-700">
          {open ? "Admin Panel" : "AP"}
        </div>

        {/* Menu */}
        <nav className="mt-4 space-y-2">
          {menuItems.map((item, index) => {
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(item.path);

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                {item.icon}
                {open && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;