import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Plus,
    Edit2,
    Trash2,
    Package,
    X,
    Upload,
} from "lucide-react";

const PRODUCT_API = "http://localhost:5000/api/products";
const CATEGORY_API = "http://localhost:5000/api/categories";

const ProductControl = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
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

    // Fetch
    const fetchProducts = async () => {
        const res = await axios.get(PRODUCT_API);
        setProducts(res.data);
    };

    const fetchCategories = async () => {
        const res = await axios.get(CATEGORY_API);
        setCategories(res.data);
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Image
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({
                ...form,
                image: file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    // Submit
    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("category", form.category);
        formData.append("subcategory", form.subcategory);
        formData.append("price", form.price);
        formData.append("originalPrice", form.originalPrice);
        formData.append("features", form.features);
        formData.append("label", form.label);
        formData.append("highlight", form.highlight);
        formData.append("subHighlight", form.subHighlight);
        formData.append("volume", form.volume);
        formData.append("rating", form.rating);
        formData.append("reviews", form.reviews);

        if (form.image) formData.append("image", form.image);

        if (editId) {
            await axios.put(`${PRODUCT_API}/${editId}`, formData);
        } else {
            await axios.post(PRODUCT_API, formData);
        }

        fetchProducts();
        closeModal();
    };

    // Edit
    const handleEdit = (p) => {
        setForm({
            ...p,
            features: Array.isArray(p.features)
                ? p.features.join(",")
                : p.features,
            preview: p.image
                ? `http://localhost:5000/uploads/${p.image}`
                : "",
        });

        setEditId(p._id);
        setShowModal(true);
    };

    // Delete
    const handleDelete = async (id) => {
        if (window.confirm("Delete this product?")) {
            await axios.delete(`${PRODUCT_API}/${id}`);
            fetchProducts();
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditId(null);
        setForm(initialForm);
    };

    const inputClass =
        "w-full px-3 py-2 border border-gray-300 rounded-lg mt-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none";

    return (
        <div className="p-8 bg-gray-100 min-h-screen">

            {/* Header */}
            <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Package className="text-indigo-600" />
                        Product Control
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Manage your products easily
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition"
                >
                    <Plus size={18} /> Add Product
                </button>
            </div>

            {/* Table */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="p-4">S.No</th>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-10 text-gray-400">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            products.map((p, i) => (
                                <tr
                                    key={p._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    {/* S.No */}
                                    <td className="p-4 font-semibold">{i + 1}</td>

                                    {/* Product */}
                                    <td className="flex items-center gap-3 p-4">
                                        <img
                                            src={`http://localhost:5000/uploads/${p.image}`}
                                            className="h-12 w-12 rounded-lg object-cover border"
                                            alt=""
                                        />

                                    </td>
                                    <td className="p-4">

                                        <span className="font-medium text-gray-800">
                                            {p.name}
                                        </span>
                                    </td>

                                    {/* Category */}
                                    <td>
                                        {p.category ? (
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                {p.category}
                                            </span>
                                        ) : (
                                            <span className="text-red-400 text-xs">
                                                Not Saved
                                            </span>
                                        )}
                                    </td>

                                    {/* Price */}
                                    <td>
                                        <div className="font-bold text-indigo-600">
                                            ₹{p.price}
                                        </div>
                                        <div className="text-xs line-through text-gray-400">
                                            ₹{p.originalPrice}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="text-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(p)}
                                            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg"
                                        >
                                            <Edit2 size={16} className="text-blue-600" />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(p._id)}
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

                        {/* Header */}
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                {editId ? "Edit Product" : "Add New Product"}
                            </h2>
                            <p className="text-gray-500 mt-2">Fill in the details to update your inventory</p>
                        </div>

                        <div className="space-y-6">
                            {/* Section 1: Visuals */}
                            <div className="bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-300">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Product Image</label>
                                <div className="flex items-center gap-6">
                                    <div className="relative group">
                                        {form.preview ? (
                                            <img
                                                src={form.preview}
                                                className="h-24 w-24 object-cover rounded-2xl shadow-md border-2 border-white"
                                                alt="Preview"
                                            />
                                        ) : (
                                            <div className="h-24 w-24 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                                                <span className="text-xs text-center px-2">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        onChange={handleImage}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-all cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Section 2: Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Product Name</label>
                                    <input
                                        placeholder="e.g. Vitamin C Serum"
                                        className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Category</label>
                                    <select
                                        className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all appearance-none bg-white"
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((c) => (
                                            <option key={c._id} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Subcategory</label>
                                    <input
                                        placeholder="e.g. Face Care"
                                        className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all"
                                        value={form.subcategory}
                                        onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Section 3: Pricing & Inventory */}
                            <div className="grid grid-cols-3 gap-4 p-4 bg-green-50/50 rounded-2xl border border-green-100">
                                <div>
                                    <label className="text-xs font-bold text-green-700 uppercase ml-1">Price</label>
                                    <input
                                        type="number"
                                        className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-green-700 uppercase ml-1">MRP</label>
                                    <input
                                        type="number"
                                        className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all"
                                        value={form.originalPrice}
                                        onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-green-700 uppercase ml-1">Volume</label>
                                    <input
                                        placeholder="150ml"
                                        className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all"
                                        value={form.volume}
                                        onChange={(e) => setForm({ ...form, volume: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Section 4: Marketing & Social Proof */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    placeholder="Features (comma separated)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all"
                                    value={form.features}
                                    onChange={(e) => setForm({ ...form, features: e.target.value })}
                                />
                                <input
                                    placeholder="Label (e.g. BESTSELLER)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all text-orange-600 font-medium"
                                    value={form.label || ""}
                                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                                />
                                <div className="flex gap-2">
                                    <input
                                        placeholder="Rating (0-5)"
                                        type="number" step="0.1"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all"
                                        value={form.rating || ""}
                                        onChange={(e) => setForm({ ...form, rating: e.target.value })}
                                    />
                                    <input
                                        placeholder="Reviews"
                                        type="number"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all"
                                        value={form.reviews || ""}
                                        onChange={(e) => setForm({ ...form, reviews: e.target.value })}
                                    />
                                </div>
                                <input
                                    placeholder="Highlight (e.g. Natural Glow)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none transition-all"
                                    value={form.highlight || ""}
                                    onChange={(e) => setForm({ ...form, highlight: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Footer Action Buttons */}
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