import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 p-6 lg:ml-0">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;