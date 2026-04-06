import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0b0f2a] text-gray-300 mt-10 px-4 md:px-6 py-8">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 🔷 Logo + About */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-2">
            NewsFest
          </h2>
          <p className="text-sm">
            Your daily source of reliable news, powered by AI insights and
            real-time updates from around the world.
          </p>
        </div>

        {/* 🔷 Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Categories</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* 🔷 Social / Contact */}
        <div>
          <h3 className="text-white font-semibold mb-2">Connect</h3>
          <p className="text-sm mb-2">Email: support@newsfest.com</p>
          <div className="flex gap-3">
            <span className="hover:text-white cursor-pointer">Twitter</span>
            <span className="hover:text-white cursor-pointer">LinkedIn</span>
            <span className="hover:text-white cursor-pointer">Instagram</span>
          </div>
        </div>
      </div>

      {/* 🔻 Bottom Bar */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
        © {new Date().getFullYear()} NewsFest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;