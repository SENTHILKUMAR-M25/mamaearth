import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, Package } from "lucide-react";
import { toast } from "react-hot-toast";

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
    highlight: "",
    subHighlight: "",
    volume: "",
    rating: "",
    reviews: "",
    price: "",
    originalPrice: "",
    quantity: "",
    features: "",
    image: null,
    preview: "",
  };
  const [form, setForm] = useState(initialForm);

  const inputClass =
    "w-full px-4 py-2 border border-white/20 bg-white/5 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none";

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(PRODUCT_API);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products!");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch categories!");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setForm({ ...form, image: file, preview: URL.createObjectURL(file) });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.price) {
      return toast.error("Please fill required fields: Name, Category, Price");
    }

    const formData = new FormData();
    for (const key in form) {
      if (key === "features") formData.append(key, form[key].split(",").map(f => f.trim()));
      else if (form[key] !== null) formData.append(key, form[key]);
    }

    try {
      if (editId) await axios.put(`${PRODUCT_API}/${editId}`, formData);
      else await axios.post(PRODUCT_API, formData);

      fetchProducts();
      closeModal();
      toast.success(editId ? "Product updated!" : "Product added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product!");
    }
  };

  const handleEdit = async (p) => {
    setForm({
      ...p,
      features: Array.isArray(p.features) ? p.features.join(",") : p.features,
      preview: p.image ? `http://localhost:5000/uploads/${p.image}` : "",
    });
    setEditId(p._id);

    const categoryObj = categories.find((c) => c.name === p.category);
    if (categoryObj) {
      try {
        const res = await axios.get(`${SUBCATEGORY_API}?category=${categoryObj._id}`);
        setSubcategories(res.data);
      } catch (err) {
        setSubcategories([]);
      }
    }

    setShowModal(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await axios.delete(`${PRODUCT_API}/${id}`);
        fetchProducts();
        toast.success("Product deleted!");
      } catch (err) {
        toast.error("Failed to delete product!");
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
    <div className="p-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
            <Package className="text-indigo-500" />
            Product Control
          </h1>
          <p className="text-gray-400 text-sm">Manage your products easily</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-left text-white">
          <thead className="bg-white/20 text-gray-300 text-sm">
            <tr>
              <th className="p-4">S.No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>SubCategory</th>
              <th>Quantity</th>
              <th>Price</th>
              <th className="text-center p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-10 text-gray-400">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((p, i) => (
                <tr key={p._id} className="border-b border-gray-700 hover:bg-white/10 transition">
                  <td className="p-4 font-semibold">{i + 1}</td>
                  <td className="p-4">
                    {p.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${p.image}`}
                        className="h-12 w-12 rounded-xl object-cover border border-white/20"
                        alt={p.name}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-white/10 rounded flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-medium">
                    <span className="block truncate w-40" title={p.name}>
                      {p.name.length > 20 ? p.name.slice(0, 20) + "..." : p.name}
                    </span>
                  </td>                  <td>
                    {p.category ? (
                      <span className="bg-green-100/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {p.category}
                      </span>
                    ) : (
                      <span className="text-red-400 text-xs">Not Saved</span>
                    )}
                  </td>
                  <td>
                    {p.subcategory ? (
                      <span className="bg-green-100/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                        {p.subcategory}
                      </span>
                    ) : (
                      <span className="text-red-400 text-xs">Not Saved</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${p.quantity > 0
                          ? "bg-blue-100/20 text-blue-400"
                          : "bg-red-100/20 text-red-400"
                        }`}
                    >
                      {p.quantity > 0 ? `${p.quantity} in stock` : "Out of Stock"}
                    </span>
                  </td>
                  <td>
                    <div className="font-bold text-indigo-400">₹{p.price}</div>
                    <div className="text-xs line-through text-gray-500">₹{p.originalPrice}</div>
                  </td>
                  <td className="text-center space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-2 bg-blue-100/20 hover:bg-blue-200 rounded-lg transition"
                    >
                      <Edit2 size={16} className="text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id, p.name)}
                      className="p-2 bg-red-100/20 hover:bg-red-200 rounded-lg transition"
                    >
                      <Trash2 size={16} className="text-red-400" />
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-start pt-10 pb-10 z-50 overflow-y-auto">
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-full max-w-2xl border border-white/20 shadow-2xl mx-4">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-white">
                {editId ? "Edit Product" : "Add New Product"}
              </h2>
              <p className="text-gray-300 mt-2">Fill in the details to update your inventory</p>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(initialForm).map((key) => {
                if (key === "image") {
                  return (
                    <div key={key} className="md:col-span-2">
                      <label className="text-xs font-bold text-gray-300 uppercase ml-1">Product Image</label>
                      <input type="file" onChange={handleImage} className={inputClass} />
                      {form.preview && (
                        <img
                          src={form.preview}
                          alt="Preview"
                          className="mt-2 h-28 w-28 object-cover rounded-xl border border-white/20 mx-auto shadow-md"
                        />
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div key={key}>
                      <label className="text-xs font-bold text-gray-300 uppercase ml-1">
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
                          onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                          disabled={!form.category}
                        >
                          <option value="">Select Subcategory</option>
                          {subcategories.map((s) => (
                            <option key={s._id} value={s.name}>{s.name}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          key={key}
                          type={["price", "originalPrice", "rating", "reviews", "quantity"].includes(key) ? "number" : "text"}
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
            <div className="flex items-center justify-end gap-3 mt-10 pt-6 border-t border-white/20">
              <button
                onClick={closeModal}
                className="px-8 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleSubmit}
                className="px-10 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-xl hover:bg-indigo-700 active:scale-95 transition-all"
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