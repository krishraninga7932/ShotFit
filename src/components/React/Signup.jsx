import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import logo from "../../assets/images/logo/logo.png";
import auth from "../../auth";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    auth
      .signupUser(dispatch, email, password, name)
      .then(() => {
        toast.success(`Welcome to Sports Buddy ${name}🎉`);
        if (email === "admin@gmail.com" && password === "adminSF") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/user", { replace: true });
        }
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => toast.info(error.message));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto p-6 sm:p-10 bg-gradient-to-br from-[#080707] via-[#1e1e1e] to-[#450506] shadow-[0px_0px_15px_#DD4F52] relative">
        {/* App Branding */}
        <div className=" w-[45%] mx-auto mb-2">
          <img src={logo} alt="logo" className="w-[100%]" />
        </div>
        <p className="text-gray-300 text-sm tracking-wider text-center mb-6 sm:mb-8">
          Become a ShotFit member — where every rep counts!
        </p>

        {/* Form Header */}
        <h2 className="text-xl text-[#DD4F52] font-bold mb-4 text-center flex justify-center items-center gap-2">
          <FiUserPlus className="text-[#DD4F52]" /> Sign Up
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full text-[14px] rounded-xl border-1 border-gray-300 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#DD4F52] focus:ring-1 focus:ring-[#DD4F52]"
          />
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
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-[14px] rounded-xl border-1 border-gray-300 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#DD4F52] focus:ring-1 focus:ring-[#DD4F52]"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-[#DD4F52] to-[#a93a3c] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.03] active:scale-95 transition-all duration-300"
          >
            <FiUserPlus /> Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-400 mt-5 sm:mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#DD4F52] font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

        {/* Admin Credentials Info */}
        <div className="text-center text-xs text-gray-400 mt-4">
          <p className="font-semibold text-[#DD4F52]">Admin Credentials</p>
          <p className="mt-1">Email: admin@gmail.com | Password: adminSF</p>
        </div>

        <ToastContainer autoClose={3000} />
      </div>
    </div>
  );
};

export default Signup;
