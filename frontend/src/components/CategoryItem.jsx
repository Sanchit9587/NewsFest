import React from "react";

const CategoryItem = ({ label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 rounded-lg cursor-pointer transition text-sm 
      ${
        active
          ? "bg-purple-600 text-white"
          : "text-gray-300 hover:bg-[#1a1f3c]"
      }`}
    >
      {label}
    </div>
  );
};

export default CategoryItem;