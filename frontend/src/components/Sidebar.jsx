import React, { useState } from "react";
import CategoryItem from "./CategoryItem";

const Sidebar = ({ active, setActive }) => {
  const categories = [
    "All",
    "India",
    "World",
    "Business",
    "Technology",
    "Sports",
    "Entertainment",
    "Health",
    "Science"
  ];

  return (
    <aside className="hidden md:flex flex-col w-[220px] bg-[#0b0f2a] p-4 rounded-xl h-fit">
      
      <h2 className="text-white text-lg font-semibold mb-4">
        Categories
      </h2>

      <div className="flex flex-col gap-2">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-lg cursor-pointer transition text-sm 
            ${
              active === cat
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-[#1a1f3c]"
            }`}
          >
            {cat}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;