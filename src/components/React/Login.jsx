import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import logo from "../../assets/images/logo/logo.png";
import auth from "../../auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    auth
      .loginUser(dispatch, email, password)
      .then(() => {
        toast.success(`Welcome back to ShotFit 🏋️`);
        setTimeout(() => {
          if (email === "admin@gmail.com" && password === "adminSF") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/user", { replace: true });
          }
        }, 1500);
        setEmail("");
        setPassword("");
      })
      .catch((error) => toast.error(error.message));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto p-6 sm:p-10 bg-gradient-to-br from-[#080707] via-[#1e1e1e] to-[#450506] shadow-[0px_0px_15px_#DD4F52] relative">
        {/* Logo */}
        <div className="w-[45%] mx-auto mb-2">
          <img src={logo} alt="ShotFit Logo" className="w-[100%]" />
        </div>

        <p className="text-gray-300 text-sm tracking-wider text-center mb-6 sm:mb-8">
          Welcome back to{" "}
          <span className="text-[#DD4F52] font-semibold">ShotFit</span> — fuel
          your goals and keep the grind alive!
        </p>

        {/* Header */}
        <h2 className="text-xl text-[#DD4F52] font-bold mb-4 text-center flex justify-center items-center gap-2">
          <FiLogIn className="text-[#DD4F52]" /> Log In
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-[14px] rounded-xl border-1 border-gray-300 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#DD4F52] focus:ring-1 focus:ring-[#DD4F52]"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-[14px] rounded-xl border-1 border-gray-300 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#DD4F52] focus:ring-1 focus:ring-[#DD4F52]"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-[#DD4F52] to-[#a93a3c] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.03] active:scale-95 transition-all duration-300"
          >
            <FiLogIn /> Log In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-400 mt-5 sm:mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#DD4F52] font-medium cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>

        {/* Admin Info */}
        <div className="text-center text-xs text-gray-400 mt-4">
          <p className="font-semibold text-[#DD4F52]">Admin Credentials</p>
          <p className="mt-1">Email: admin@gmail.com | Password: adminSF</p>
        </div>

        <ToastContainer autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
