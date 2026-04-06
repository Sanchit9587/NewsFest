import React from "react";

const AIPanel = () => {
  return (
    <aside className="hidden lg:flex flex-col w-[280px] bg-[#0b0f2a] p-4 rounded-xl h-fit">
      
      {/* Title */}
      <h2 className="text-white text-lg font-semibold mb-4">
        AI Overview
      </h2>

      {/* Content */}
      <div className="text-sm text-gray-300 leading-relaxed space-y-3">
        <p>
          The global economy is witnessing rapid transformation due to
          advancements in artificial intelligence and automation.
        </p>

        <p>
          Key industries such as healthcare, finance, and manufacturing are
          leveraging AI to improve efficiency and decision-making.
        </p>

        <p>
          Experts suggest that while AI brings opportunities, it also raises
          concerns about job displacement and ethical challenges.
        </p>
      </div>

      {/* Optional CTA */}
      <button className="mt-4 bg-purple-600 px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition">
        Generate New Summary
      </button>
    </aside>
  );
};

export default AIPanel;