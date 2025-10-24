import React, { useState, useEffect, useRef } from "react";
import logo from "../../../assets/images/logo/logo.png";
import { MdAppRegistration } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../../auth";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false);
  const [dropdownOpenDesktop, setDropdownOpenDesktop] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const mobileRef = useRef();
  const desktopRef = useRef();

  const handleLogout = () => {
    auth.logOut(dispatch).then(() => {
      navigate("/user", { replace: true });
    });
  };

  const avatarLetter = user
    ? /[a-zA-Z]/.test(user.name ? user.name[0] : user.email[0])
      ? (user.name ? user.name[0] : user.email[0]).toUpperCase()
      : "U"
    : null;

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setDropdownOpenMobile(false);
      }
      if (desktopRef.current && !desktopRef.current.contains(e.target)) {
        setDropdownOpenDesktop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50">
      <div className="max-w-[1320px] mx-auto px-[15px] flex items-center justify-between py-[20px]">
        {/* Logo */}
        <div className="w-[28%] sm:w-[18%] md:w-[12%]">
          <img src={logo} alt="logo" className="w-[100%]" />
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-[#DD4F52] text-[25px] cursor-pointer z-[60]"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <RiMenu3Fill />}
        </button>

        {/* Nav Section */}
        <nav
          className={`fixed top-0 right-0 h-full w-[80%] sm:w-[50%] md:w-auto transition-all duration-500 md:static md:translate-x-0 md:bg-transparent ${
            open
              ? "translate-x-0 bg-[#151515]"
              : "translate-x-full md:translate-x-0 md:bg-transparent"
          }`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-[15px] py-20 md:py-0 w-full md:w-auto">
            {[
              { name: "Home", link: "/" },
              { name: "Packages", link: "#packages" },
              { name: "Shop", link: "#shop" },
              { name: "Diet", link: "#diet" },
              { name: "Schedule", link: "#schedule" },
            ].map((item) => (
              <li
                key={item.name}
                className="relative group text-[14px] sm:text-[15px] tracking-wider"
              >
                <a href={item.link}>{item.name}</a>
                <span className="absolute left-0 bottom-[-4px] w-0 h-[1.2px] bg-[#DD4F52] transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
            {/* Mobile Avatar Dropdown */}
            <div
              className="flex md:hidden flex-col items-center gap-3 mt-6"
              ref={mobileRef}
            >
              {user ? (
                <div className="relative w-full">
                  <div
                    onClick={() => setDropdownOpenMobile(!dropdownOpenMobile)}
                    className="flex items-center cursor-pointer gap-2"
                  >
                    <button
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#DD4F52] text-black font-bold text-lg"
                      title={user.name || user.email}
                    >
                      {avatarLetter}
                    </button>
                    <div className="px-4 py-2">
                      <p className="text-white font-semibold truncate">
                        {user.name || "User"}
                      </p>
                      <p className="text-gray-400 text-sm truncate">
                        {user.email}
                      </p>
                    </div>
                    <FiChevronDown className="text-gray-400" />
                  </div>
                  {dropdownOpenMobile && (
                    <div className="absolute mt-6 top-12 left-0 w-[120px] bg-gradient-to-br from-[#080707] via-[#1e1e1e] to-[#450506] border border-gray-300 rounded-md shadow-lg py-2 z-50">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-[#DD4F52] hover:bg-[#DD4F52] hover:text-white transition-all duration-300"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center w-full gap-2 px-5 py-2 border border-[#DD4F52] text-[#DD4F52] font-medium hover:bg-[#DD4F52] hover:text-[#FCFCFC] transition-all duration-300"
                  >
                    <FaUserCircle className="text-[18px]" />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 w-full px-5 py-2 bg-[#DD4F52] text-[#FCFCFC] font-medium hover:bg-[#a93a3c] transition-all duration-300"
                  >
                    <MdAppRegistration className="text-[18px]" />
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </ul>
        </nav>

        {/* Desktop Avatar Dropdown */}
        <div
          className="hidden md:flex items-center gap-4 relative"
          ref={desktopRef}
        >
          {user ? (
            <div className="relative">
              <div
                onClick={() => setDropdownOpenDesktop(!dropdownOpenDesktop)}
                className="flex items-center cursor-pointer gap-2"
              >
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#DD4F52] text-black font-bold text-lg"
                  title={user.name || user.email}
                >
                  {avatarLetter}
                </button>
                <div className="px-4 py-2">
                  <p className="text-white font-semibold truncate">
                    {user.name || "User"}
                  </p>
                  <p className="text-gray-400 text-sm truncate">{user.email}</p>
                </div>
                <FiChevronDown className="text-gray-400" />
              </div>
              {dropdownOpenDesktop && (
                <div className="absolute right-0 mt-2 w-40 bg-gradient-to-br from-[#080707] via-[#1e1e1e] to-[#450506] border border-gray-300 rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 cursor-pointer hover:bg-[#DD4F52] hover:text-white transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 shadow-red-300 shadow-2xl px-5 py-2 border border-[#DD4F52] text-[#DD4F52] font-medium hover:bg-[#DD4F52] hover:text-[#FCFCFC] cursor-pointer transition-all duration-300"
              >
                <FaUserCircle className="text-[18px]" />
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-5 py-2 shadow-red-300 shadow-2xl bg-[#DD4F52] cursor-pointer font-medium hover:bg-[#a93a3c] transition-all duration-300"
              >
                <MdAppRegistration className="text-[18px]" />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
