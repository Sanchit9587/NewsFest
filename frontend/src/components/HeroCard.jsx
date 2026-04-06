import React from "react";

const HeroCard = ({ image, title }) => {
  return (
    <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden">
      
      {/* Background Image */}
      <img
        src={image}
        alt="news"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
        
        {/* Title */}
        <h2 className="text-white text-lg md:text-3xl font-bold max-w-[70%]">
          {title}
        </h2>

        {/* Bottom Right Button */}
        <div className="flex justify-end">
          <button className="bg-purple-600 px-4 py-1 rounded-full text-sm hover:bg-purple-700">
            Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;