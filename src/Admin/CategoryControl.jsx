import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/categories";

const CategoryControl = () => {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    image: null,
    disc: "", // description
    preview: "",
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API);
      setCategories(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("❌ Failed to fetch categories!");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Image preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, image: file, preview: URL.createObjectURL(file) });
  };

  // Add / Update
  const handleSubmit = async () => {
    if (!form.name || !form.disc) return alert("⚠️ Please fill all fields");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("disc", form.disc);
      if (form.image) formData.append("image", form.image);

      if (editId) {
        await axios.put(`${API}/${editId}`, formData);
        alert("✅ Category updated successfully!");
      } else {
        await axios.post(API, formData);
        alert("✅ Category created successfully!");
      }

      fetchCategories();
      closeModal();
    } catch (err) {
      console.error("Submit Error:", err);
      alert("❌ Something went wrong while submitting!");
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (cat) => {
    setForm({
      name: cat.name,
      disc: cat.disc || "",
      image: null,
      preview: cat.image ? `http://localhost:5000/uploads/${cat.image}` : "",
    });
    setEditId(cat._id);
    alert(`✏️ Editing category: ${cat.name}`);
  };

  // Delete
  const handleDelete = async (id, name) => {
    if (window.confirm(`⚠️ Are you sure you want to delete "${name}"?`)) {
      try {
        await axios.delete(`${API}/${id}`);
        fetchCategories();
        alert("🗑 Category deleted successfully!");
      } catch (err) {
        console.error("Delete Error:", err);
        alert("❌ Failed to delete category!");
      }
    }
  };

  // Reset form
  const closeModal = () => {
    setEditId(null);
    setForm({ name: "", image: null, disc: "", preview: "" });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🗂 Category Control</h1>
        <button
          onClick={() => alert("⚡ Ready to add a new category!")}
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700"
        >
          + Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-4">S.No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-500">
                  No categories added yet
                </td>
              </tr>
            ) : (
              categories.map((c, i) => (
                <tr key={c._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4">{i + 1}</td>
                  <td className="py-2">
                    {c.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${c.image}`}
                        className="h-12 w-12 object-cover rounded-md border"
                        alt={c.name}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="font-semibold text-gray-700">{c.name}</td>
                  <td className="p-4 font-medium text-gray-800">
                    <span title={c.disc}>
                      {c.disc.length > 30 ? c.disc.slice(0, 30) + "..." : c.disc}
                    </span>
                  </td>
                  <td className="text-center space-x-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id, c.name)}
                      className="text-red-600 hover:text-red-800 font-medium"
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
  );
};

export default CategoryControl;