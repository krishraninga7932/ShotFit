import React, { useState } from "react";
import logo from "../../../assets/images/logo/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { MdAppRegistration } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";
import adminhero from "../../../assets/images/hero/adminhero.png";
import auth from "../../../auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Adminheader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);


  function handleLogout(){
    auth.logOut(dispatch).then(()=>{
       navigate("/user", { replace: true });
    })
  }

  return (
    <div>
      {/* navbar */}
      <div className="relative z-50">
        <div className="max-w-[1320px] mx-auto px-[15px] flex items-center justify-between py-[20px]">
          <div className="w-[28%] sm:w-[18%] md:w-[12%]">
            <img src={logo} alt="logo" className="w-[100%]" />
          </div>

          {/* Desktop Buttons */}
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="flex items-center gap-2 shadow-red-300 shadow-2xl p-[5px_8px] md:px-5 md:py-2 border border-[#DD4F52] text-[#DD4F52] font-medium hover:bg-[#DD4F52] hover:text-[#FCFCFC] cursor-pointer transition-all duration-300">
              <FaUserCircle className="text-[18px]" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div
        className="h-[100vh] absolute top-0 w-full bg-cover bg-top bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url(${adminhero})`,
          boxShadow: "inset 0 0 0 1000px rgba(0,0,0,0.6)",
        }}
      >
        <div className="max-w-[1320px] mx-auto px-[15px]">
          <h1 className="text-4xl md:text-[85px] md:leading-30 font-bold uppercase text-center text-white">
            Track, Manage, and Grow Your Gym <br />{" "}
            <span className=" [text-shadow:0px_0px_15px_#DD4F52]">Admin</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Adminheader;
