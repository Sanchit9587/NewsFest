import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { getNews } from "../api/api";

const NewsFeed = ({ category }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (!category) return;

    const domain = category === "All" ? "Technology" : category;

    getNews(domain).then((data) => {
      if (!data) return;

      const filtered = data.filter(
        (item) =>
          item &&
          item.title &&
          (item.url_to_image || item.urlToImage)
      );

      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 6);

      setNews(selected);
    });

  }, [category]); // 🔥 IMPORTANT

  return (
    <div className="flex-1">
      <h2 className="text-white text-lg md:text-xl font-semibold mb-4">
        {category} News
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {news.map((item, index) => (
          <NewsCard
            key={index}
            image={item.url_to_image || item.urlToImage}
            title={item.title}
            news={item}
          />
        ))}
      </div>
    </div>
  );
};
export default NewsFeed;