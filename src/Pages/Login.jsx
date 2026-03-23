import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            alert("Login Successful");
        } catch(err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border p-2 rounded"/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="border p-2 rounded"/>
                <button type="submit" className="bg-green-600 text-white p-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;