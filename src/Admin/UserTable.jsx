import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setLoadingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/auth/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          User Management 👥
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-gray-600 text-gray-300">
                <th className="p-3">User ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Created</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-700 hover:bg-white/10 transition"
                >
                  <td className="p-3">{user.userId}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteUser(user._id)}
                      disabled={loadingId === user._id}
                      className="flex items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <p className="text-gray-400 mt-4 text-center">No users found</p>
        )}
      </div>
    </div>
  );
};

export default UserTable;