const BASE_URL = "http://127.0.0.1:8000";

export const getNews = async (domain) => {
  try {
    const res = await fetch(`${BASE_URL}/news?domain=${domain}`);
    
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json(); // ✅ now clean JSON (after your backend fix)
    return data;

  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export const generateSummary = async (news) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(news),
    });

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Summary error:", error);
    return null;
  }
};

export const signup = async (data) => {
  const res = await fetch("http://127.0.0.1:8000/sign_up", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  return res.json();
};

export const addBookmark = async (data) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  } catch (err) {
    console.error("Bookmark error:", err);
  }
};