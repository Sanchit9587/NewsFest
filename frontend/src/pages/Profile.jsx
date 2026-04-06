import React, { useEffect, useState } from "react";

const Profile = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [summaries, setSummaries] = useState([]);

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) return;

    // Fetch bookmarks
    fetch(`http://127.0.0.1:8000/bookmarks?user_name=${user}`)
      .then((res) => res.json())
      .then((data) => setBookmarks(data));

    // Fetch summaries
    fetch(`http://127.0.0.1:8000/summaries?user_name=${user}`)
      .then((res) => res.json())
      .then((data) => setSummaries(data));
  }, [user]);

  return (
    <div className="px-6 py-6 text-white">
      
      {/* Username */}
      <h1 className="text-2xl font-bold mb-4">
        Profile: {user}
      </h1>

      {/* Bookmarks */}
      <div className="mb-6">
        <h2 className="text-xl mb-2">Bookmarks</h2>

        {bookmarks.length === 0 ? (
          <p className="text-gray-400">No bookmarks yet</p>
        ) : (
          <ul className="space-y-2">
            {bookmarks.map((item, index) => (
              <li key={index} className="bg-[#1a1f3c] p-3 rounded">
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Summaries */}
      <div>
        <h2 className="text-xl mb-2">Summaries</h2>

        {summaries.length === 0 ? (
          <p className="text-gray-400">No summaries yet</p>
        ) : (
          <ul className="space-y-2">
            {summaries.map((item, index) => (
              <li key={index} className="bg-[#1a1f3c] p-3 rounded">
                {item.summary}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;