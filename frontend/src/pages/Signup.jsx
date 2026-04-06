import { useState } from "react";
import { signup } from "../api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    user_name: "",
    user_password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await signup(form);

    if (res.message) {
      alert("Account created successfully!");
      navigate("/login");
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#05081a] flex items-center justify-center px-4">
      
      <div className="bg-[#0b0f2a] p-8 rounded-2xl w-full max-w-md shadow-lg">
        
        {/* Title */}
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Create Account 🚀
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded-lg bg-[#1a1f3c] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) =>
            setForm({ ...form, user_name: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-[#1a1f3c] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) =>
            setForm({ ...form, user_password: e.target.value })
          }
        />

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-lg text-white font-medium hover:opacity-90 transition"
        >
          Sign Up
        </button>

        {/* Redirect to Login */}
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;