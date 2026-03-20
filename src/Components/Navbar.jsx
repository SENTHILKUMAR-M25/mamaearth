import React from "react";
import { Search, ShoppingCart, User } from "lucide-react";


const Navbar = () => {
    const items = ["HOME", "FACE", "HAIR", "MAKEUP", "BODY", "BABY", "COMBOS", "NEW LAUNCHES", "INGREDIENT", "ALL PRODUCTS", "BLOG", "PLANT GOODNESS", "STORE LOCATOR"];

    return (
        <div>
            <div className="bg-red-600 text-white text-sm px-4 py-1 text-center">
                Asia's 1st Brand with MADE SAFE Certified Products | Get Upto 35% Off On Orders Above Rs. 999 | Use Code: REDEEM35
            </div>
            <div>
                <header className="flex items-center justify-between px-6 py-4 shadow-md">
                    <div className="text-2xl font-bold text-green-600">mamaearth</div>
                    <div className="flex-1 mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for Face Wash"
                                className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ShoppingCart size={24} />
                        <User size={24} />
                    </div>
                </header>
            </div>
            <nav className="bg-white shadow-sm">
                <ul className="flex flex-wrap justify-center gap-4 py-2 text-gray-700 font-medium text-sm">
                    {items.map(item => (
                        <li key={item} className="hover:text-green-600 cursor-pointer">{item}</li>
                    ))}
                </ul>
            </nav>

        </div>
    );
};




export default Navbar