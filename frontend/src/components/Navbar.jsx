import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user= localStorage.getItem("user")
  return (
    <nav className="relative z-50 w-full bg-[#0b0f2a] text-white px-4 md:px-6 py-3">
      
      {/* 🔷 Top Bar */}
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold">
            N
          </div>
          <h1 className="text-lg md:text-xl font-semibold">NewsFest</h1>
        </div>

        {/* 🔍 Search (Hidden on small screens) */}
        <div className="hidden md:flex items-center bg-[#1a1f3c] px-4 py-2 rounded-full w-[40%]">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-sm text-white placeholder-gray-400"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="hover:text-gray-300 text-sm">Home</a>
          <a href="#" className="hover:text-gray-300 text-sm">Categories</a>
          <a href="#" className="hover:text-gray-300 text-sm">About Us</a>

          {user ? (
            <button
              onClick={() => navigate("/profile")}
              className="bg-gray-200 text-black px-4 py-1 rounded-md text-sm hover:bg-gray-300"
            >
              Profile
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-200 text-black px-4 py-1 rounded-md text-sm hover:bg-gray-300"
            >
              Login
            </button>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-[#1a1f3c] rounded-lg p-4 flex flex-col gap-4">
          
          {/* Search inside mobile */}
          <div className="flex items-center bg-[#0b0f2a] px-3 py-2 rounded-full">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full text-sm text-white placeholder-gray-400"
            />
          </div>

          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">Categories</a>
          <a href="#" className="hover:text-gray-300">About Us</a>

          {user ? (
            <button
              onClick={() => navigate("/profile")}
              className="bg-gray-200 text-black px-4 py-1 rounded-md text-sm hover:bg-gray-300"
            >
              Profile
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-200 text-black px-4 py-1 rounded-md text-sm hover:bg-gray-300"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;