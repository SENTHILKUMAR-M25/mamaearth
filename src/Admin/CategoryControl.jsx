import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const API = "http://localhost:5000/api/categories";

const CategoryControl = () => {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    image: null,
    disc: "",
    preview: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, image: file, preview: URL.createObjectURL(file) });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.disc)
      return toast.error("Please fill all fields!");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("disc", form.disc);
      if (form.image) formData.append("image", form.image);

      if (editId) {
        await axios.put(`${API}/${editId}`, formData);
        toast.success("Category updated successfully!");
      } else {
        await axios.post(API, formData);
        toast.success("Category created successfully!");
      }

      fetchCategories();
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cat) => {
    setForm({
      name: cat.name,
      disc: cat.disc || "",
      image: null,
      preview: cat.image ? `http://localhost:5000/uploads/${cat.image}` : "",
    });
    setEditId(cat._id);
    setShowModal(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await axios.delete(`${API}/${id}`);
        fetchCategories();
        toast.success("Category deleted successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete category!");
      }
    }
  };

  const closeModal = () => {
    setEditId(null);
    setForm({ name: "", image: null, disc: "", preview: "" });
    setShowModal(false);
  };

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            🗂 Category Control
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition w-full md:w-auto"
          >
            + Add Category
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow mt-4">
          <table className="w-full text-left text-white min-w-[600px] md:min-w-full">
            <thead>
              <tr className="border-b border-gray-600 text-gray-300">
                <th className="p-4">S.No</th>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Description</th>
                <th className="text-center p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-400">
                    No categories added yet
                  </td>
                </tr>
              ) : (
                categories.map((c, i) => (
                  <tr
                    key={c._id}
                    className="border-b border-gray-700 hover:bg-white/10 transition-all duration-200"
                  >
                    <td className="p-4">{i + 1}</td>
                    <td className="py-2">
                      {c.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${c.image}`}
                          className="h-12 w-12 object-cover rounded-md border"
                          alt={c.name}
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="font-semibold text-gray-300">{c.name}</td>
                    <td className="p-4 font-medium text-gray-300">
                      <span title={c.disc}>
                        {c.disc.length > 30
                          ? c.disc.slice(0, 30) + "..."
                          : c.disc}
                      </span>
                    </td>
                    <td className="text-center space-x-2 flex justify-center">
                      <button
                        onClick={() => handleEdit(c)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id, c.name)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-3xl shadow-xl p-6 w-full max-w-lg relative text-white">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Category" : "Add New Category"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Category Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="p-3 rounded border border-gray-700 bg-gray-800 w-full placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="file"
                onChange={handleImage}
                className="p-2 rounded border border-gray-700 w-full text-sm text-gray-400 bg-gray-800 placeholder-gray-500"
              />
              {form.preview && (
                <img
                  src={form.preview}
                  alt="Preview"
                  className="h-32 w-full object-cover rounded-md border md:col-span-2"
                />
              )}
              <textarea
                placeholder="Description"
                value={form.disc}
                onChange={(e) => setForm({ ...form, disc: e.target.value })}
                className="p-3 rounded border border-gray-700 bg-gray-800 w-full md:col-span-2 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded bg-gray-600 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryControl;