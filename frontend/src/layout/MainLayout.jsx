import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import NewsFeed from "../components/NewsFeed";
import AIPanel from "../components/AIPanel";

const MainLayout = () => {
  const [category, setCategory] = useState("Technology");

  return (
    <div className="flex gap-4 px-4 md:px-6 mt-6">
      
      {/* Sidebar gets setter */}
      <Sidebar active={category} setActive={setCategory} />

      {/* NewsFeed gets category */}
      <NewsFeed category={category} />

      <AIPanel />
    </div>
  );
};

export default MainLayout;