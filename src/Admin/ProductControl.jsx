import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, Package } from "lucide-react";

const PRODUCT_API = "http://localhost:5000/api/products";
const CATEGORY_API = "http://localhost:5000/api/categories";
const SUBCATEGORY_API = "http://localhost:5000/api/subcategories";

const ProductControl = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const initialForm = {
    name: "",
    category: "",
    subcategory: "",
    label: "",
    highlight: "",
    subHighlight: "",
    volume: "",
    rating: "",
    reviews: "",
    price: "",
    originalPrice: "",
    features: "",
    image: null,
    preview: "",
  };

  const [form, setForm] = useState(initialForm);

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none";

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(PRODUCT_API);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch products!");
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch categories!");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Handle Category Change
  const handleCategoryChange = async (e) => {
    const selectedCategoryName = e.target.value;
    setForm({ ...form, category: selectedCategoryName, subcategory: "" });

    const categoryObj = categories.find((c) => c.name === selectedCategoryName);
    if (categoryObj) {
      try {
        const res = await axios.get(`${SUBCATEGORY_API}?category=${categoryObj._id}`);
        setSubcategories(res.data);
      } catch (err) {
        console.error(err);
        setSubcategories([]);
      }
    } else {
      setSubcategories([]);
    }
  };

  // Handle image preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file, preview: URL.createObjectURL(file) });
    }
  };

  // Submit product
  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.price) {
      return alert("⚠️ Please fill all required fields: Name, Category, Price");
    }

    const formData = new FormData();
    for (const key in form) {
      if (key === "features") {
        formData.append(key, form[key].split(",").map(f => f.trim()));
      } else if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    }

    try {
      if (editId) {
        await axios.put(`${PRODUCT_API}/${editId}`, formData);
        alert("✅ Product updated successfully!");
      } else {
        await axios.post(PRODUCT_API, formData);
        alert("✅ Product added successfully!");
      }

      fetchProducts();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save product!");
    }
  };

  // Edit product
  const handleEdit = async (p) => {
    setForm({
      ...p,
      features: Array.isArray(p.features) ? p.features.join(",") : p.features,
      preview: p.image ? `http://localhost:5000/uploads/${p.image}` : "",
    });
    setEditId(p._id);

    // Fetch subcategories for this product's category
    const categoryObj = categories.find((c) => c.name === p.category);
    if (categoryObj) {
      try {
        const res = await axios.get(`${SUBCATEGORY_API}?category=${categoryObj._id}`);
        setSubcategories(res.data);
      } catch (err) {
        console.error(err);
        setSubcategories([]);
      }
    }

    setShowModal(true);
    alert(`✏️ Editing product: ${p.name}`);
  };

  // Delete product
  const handleDelete = async (id, name) => {
    if (window.confirm(`⚠️ Are you sure you want to delete "${name}"?`)) {
      try {
        await axios.delete(`${PRODUCT_API}/${id}`);
        fetchProducts();
        alert("🗑 Product deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("❌ Failed to delete product!");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm(initialForm);
    setSubcategories([]);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Package className="text-indigo-600" />
            Product Control
          </h1>
          <p className="text-gray-500 text-sm">Manage your products easily</p>
        </div>
        <button
          onClick={() => {
            setShowModal(true);
            alert("⚡ Ready to add a new product!");
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">S.No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>SubCategory</th>
              <th>Price</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-10 text-gray-400">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((p, i) => (
                <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4 font-semibold">{i + 1}</td>
                  <td className="p-4">
                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      className="h-12 w-12 rounded-lg object-cover border"
                      alt={p.name}
                    />
                  </td>
                   <td className="p-4 font-medium text-gray-800">
                    <span title={p.name}>
                      {p.name.length > 30 ?p.name.slice(0, 30) + "..." : p.name}
                    </span>
                  </td>
                  <td>
                    {p.category ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {p.category}
                      </span>
                    ) : (
                      <span className="text-red-400 text-xs">Not Saved</span>
                    )}
                  </td>
                  <td>
                    {p.subcategory ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {p.subcategory}
                      </span>
                    ) : (
                      <span className="text-red-400 text-xs">Not Saved</span>
                    )}
                  </td>
                  <td>
                    <div className="font-bold text-indigo-600">₹{p.price}</div>
                    <div className="text-xs line-through text-gray-400">₹{p.originalPrice}</div>
                  </td>
                  <td className="text-center space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg"
                    >
                      <Edit2 size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id, p.name)}
                      className="p-2 bg-red-100 hover:bg-red-200 rounded-lg"
                    >
                      <Trash2 size={16} className="text-red-600" />
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
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex justify-center items-start pt-10 pb-10 z-50 overflow-y-auto">
          <div className="bg-white p-8 rounded-[2rem] w-full max-w-2xl shadow-2xl border border-gray-100 mx-4">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {editId ? "Edit Product" : "Add New Product"}
              </h2>
              <p className="text-gray-500 mt-2">Fill in the details to update your inventory</p>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(initialForm).map((key) => {
                if (key === "image") {
                  return (
                    <div key={key} className="md:col-span-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                        Product Image
                      </label>
                      <input type="file" onChange={handleImage} className={inputClass} />
                      {form.preview && (
                        <img
                          src={form.preview}
                          alt="Preview"
                          className="mt-2 h-24 w-24 object-cover rounded-lg border"
                        />
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div key={key}>
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      {key === "category" ? (
                        <select
                          className={inputClass}
                          value={form.category}
                          onChange={handleCategoryChange}
                        >
                          <option value="">Select Category</option>
                          {categories.map((c) => (
                            <option key={c._id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      ) : key === "subcategory" ? (
                        <select
                          className={inputClass}
                          value={form.subcategory}
                          onChange={(e) =>
                            setForm({ ...form, subcategory: e.target.value })
                          }
                          disabled={!form.category}
                        >
                          <option value="">Select Subcategory</option>
                          {subcategories.map((s) => (
                            <option key={s._id} value={s.name}>{s.name}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={["price", "originalPrice", "rating", "reviews"].includes(key) ? "number" : "text"}
                          step={key === "rating" ? "0.1" : undefined}
                          className={inputClass}
                          value={form[key] || ""}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          placeholder={key}
                        />
                      )}
                    </div>
                  );
                }
              })}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
              <button
                onClick={closeModal}
                className="px-8 py-3 rounded-xl text-gray-600 font-semibold hover:bg-gray-100 transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleSubmit}
                className="px-10 py-3 rounded-xl bg-gray-900 text-white font-bold shadow-xl hover:bg-black active:scale-95 transition-all"
              >
                {editId ? "Update Product" : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductControl;