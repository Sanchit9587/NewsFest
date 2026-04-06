import React, { useState } from "react";
import { generateSummary } from "../api/api";
import { addBookmark } from "../api/api"

const NewsCard = ({ image, title, news }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSummary = async () => {
    if (!news?.content) {
      alert("No content available for summary");
      return;
    }

    setLoading(true);

    const res = await generateSummary({
      content: news.content,   // ✅ ONLY content
    });

    setLoading(false);

    if (res?.summary) {
      setSummary(res.summary);
    }
  };

  const handleBookmark = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first");
      return;
    }

    const payload = {
      user_name: user,
      news: news,   // 🔥 send full object
    };

    console.log(payload); // DEBUG

    const res = await addBookmark(payload);

    if (res) {
      alert("Bookmarked!");
    }
  };
  
  return (
    <div className="relative w-full h-[180px] md:h-[220px] rounded-xl overflow-hidden group">
      
      <img
        src={image}
        alt="news"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 flex flex-col justify-between p-3">
        
        <h2 className="text-white text-sm md:text-lg font-semibold">
          {title}
        </h2>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-300">
            Click to read full article
          </span>

        <div className="flex gap-2">
          <button
            onClick={handleBookmark}
            className="bg-blue-600 px-3 py-1 rounded-full text-xs"
          >
            Bookmark
          </button>
        </div>

          <button
            onClick={handleSummary}
            className="bg-purple-600 px-3 py-1 rounded-full text-xs"
          >
            {loading ? "Loading..." : "Summary"}
          </button>
        </div>
      </div>

    

      {/* 🧠 Summary Modal */}
      {summary && (
        <div className="absolute inset-0 bg-black/90 p-4 text-white overflow-y-auto">
          <p className="text-sm">{summary}</p>

          <button
            onClick={() => setSummary(null)}
            className="mt-4 bg-purple-600 px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsCard;