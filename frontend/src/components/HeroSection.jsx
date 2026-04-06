import React, { useState } from "react";
import HeroCard from "./HeroCard";
import CarouselDots from "./CarouselDots";

const HeroSection = () => {
  const newsData = [
    {
      id: 1,
      title: "Dhurandar cross 1200 cr box office collection",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
    },
    {
      id: 2,
      title: "AI is transforming global industries rapidly",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      id: 3,
      title: "Stock markets hit record highs worldwide",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="px-4 md:px-6 mt-4">
      
      {/* Hero Card */}
      <HeroCard
        image={newsData[currentIndex].image}
        title={newsData[currentIndex].title}
      />

      {/* Dots */}
      <CarouselDots
        total={newsData.length}
        currentIndex={currentIndex}
        setIndex={setCurrentIndex}
      />
    </div>
  );
};

export default HeroSection;