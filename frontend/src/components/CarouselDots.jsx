import React from "react";

const CarouselDots = ({ total, currentIndex, setIndex }) => {
  return (
    <div className="flex justify-center gap-2 mt-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          onClick={() => setIndex(i)}
          className={`w-2 h-2 rounded-full cursor-pointer ${
            i === currentIndex ? "bg-white" : "bg-gray-400"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default CarouselDots;