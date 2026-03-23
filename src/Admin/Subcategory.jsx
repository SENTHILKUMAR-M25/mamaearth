import React, { useEffect, useState } from "react";
import axios from "axios";

const CATEGORY_API = "http://localhost:5000/api/categories";
const SUBCATEGORY_API = "http://localhost:5000/api/subcategories";

const SubcategoryControl = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    category: "",
    name: "",
    disc: "",
    image: null,
    preview: "",
  });

  // Fetch Categories and Subcategories
  const fetchData = async () => {
    try {
      const catRes = await axios.get(CATEGORY_API);
      setCategories(catRes.data);

      const subRes = await axios.get(SUBCATEGORY_API);
      setSubcategories(subRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Image preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, image: file, preview: URL.createObjectURL(file) });
  };


  const handleSubmit = async () => {
    if (!form.name || !form.category) return alert("⚠️ Please fill all fields");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("category", form.category);
      formData.append("name", form.name);
      formData.append("disc", form.disc);
      if (form.image) formData.append("image", form.image);

      if (editId) {
        await axios.put(`${SUBCATEGORY_API}/${editId}`, formData);
        alert("✅ Subcategory updated successfully!");
      } else {
        await axios.post(SUBCATEGORY_API, formData);
        alert("✅ Subcategory added successfully!");
      }

      fetchData();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("❌ Operation failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  const handleEdit = (sub) => {
    setForm({
      category: sub.category._id,
      name: sub.name,
      disc: sub.disc || "",
      image: null,
      preview: sub.image ? `http://localhost:5000/uploads/${sub.image}` : "",
    });
    setEditId(sub._id);
    setShowModal(true);
    alert(`✏️ Editing subcategory: ${sub.name}`);
  };


  const handleDelete = async (id, name) => {
    if (window.confirm(`⚠️ Are you sure you want to delete "${name}"?`)) {
      try {
        await axios.delete(`${SUBCATEGORY_API}/${id}`);
        fetchData();
        alert("🗑 Subcategory deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("❌ Failed to delete subcategory!");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm({ category: "", name: "", disc: "", image: null, preview: "" });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🗂 Subcategory Control</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700"
        >
          + Add Subcategory
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
              <th>Category</th>
              <th>Description</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-500">
                  No subcategories added yet
                </td>
              </tr>
            ) : (
              subcategories.map((s, i) => (
                <tr key={s._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4">{i + 1}</td>
                  <td className="py-2">
                    {s.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${s.image}`}
                        className="h-12 w-12 object-cover rounded-md border"
                        alt={s.name}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="font-semibold text-gray-700">{s.name}</td>
                  <td className="text-gray-600">{s.category?.name}</td>
                  <td className="text-gray-600 text-sm max-w-xs truncate">{s.disc}</td>
                  <td className="text-center space-x-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-3xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              {editId ? "Edit Subcategory" : "Add New Subcategory"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Select Category</label>
                <select
                  className="w-full px-4 py-2 mt-1 border rounded-xl focus:ring-2 focus:ring-green-300 outline-none"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Subcategory Name</label>
                <input
                  className="w-full px-4 py-2 mt-1 border rounded-xl focus:ring-2 focus:ring-green-300 outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                <textarea
                  className="w-full px-4 py-2 mt-1 border rounded-xl focus:ring-2 focus:ring-green-300 outline-none resize-none"
                  rows={3}
                  value={form.disc}
                  onChange={(e) => setForm({ ...form, disc: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Image</label>
                <input
                  type="file"
                  className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  onChange={handleImage}
                />
              </div>

              {form.preview && (
                <img
                  src={form.preview}
                  className="h-28 w-28 object-cover rounded-xl border mx-auto shadow-md"
                  alt="Preview"
                />
              )}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`px-6 py-2 rounded-lg bg-green-600 text-white font-bold shadow-lg transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
              >
                {loading ? "Processing..." : editId ? "Save Changes" : "Create Subcategory"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubcategoryControl;