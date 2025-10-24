import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Bell,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import logo from "../../../assets/images/logo/white-logo.svg";

const Footer = () => {
  return (
    <div className="pt-[100px] md:pt-[180px]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-gradient-to-br from-[#080707] to-[#1e1e1e] px-6 sm:px-10 md:px-[100px] py-[50px] md:p-[70px]">
          <h1 className="text-[28px] sm:text-[34px] md:text-[40px] font-semibold pb-[20px] mb-[40px] border-b-1 border-[#DD4F52]">
            ShotFit Contact Info
          </h1>
          <div className="flex gap-3 mb-10 sm:mb-12 items-center">
            <div className="bg-[#DD4F52] inline-block px-[18px] py-[16px]">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="font-bold text-[18px] sm:text-[20px] mb-1">
                Address Now
              </h3>
              <p className="text-[13px] sm:text-[14px] tracking-wider text-gray-300">
                3891 Ranchview Dr. Richardson, California 62639
              </p>
            </div>
          </div>
          <div className="flex gap-3 mb-10 sm:mb-12 items-center">
            <div className="bg-[#DD4F52] inline-block px-[18px] py-[16px]">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="font-bold text-[18px] sm:text-[20px] mb-1">
                Email Now
              </h3>
              <p className="text-[13px] sm:text-[14px] tracking-wider text-gray-300">
                shotfit@gmail.com
              </p>
            </div>
          </div>
          <div className="flex gap-3 mb-10 sm:mb-12 items-center">
            <div className="bg-[#DD4F52] inline-block px-[18px] py-[16px]">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="font-bold text-[18px] sm:text-[20px] mb-1">
                Call Us
              </h3>
              <p className="text-[13px] sm:text-[14px] tracking-wider text-gray-300">
                +08 547 668 0088
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-[#DD4F52] inline-block px-[18px] py-[16px]">
              <Clock size={22} />
            </div>
            <div>
              <h3 className="font-bold text-[18px] sm:text-[20px] mb-1">
                Opening Hours
              </h3>
              <p className="text-[13px] sm:text-[14px] tracking-wider text-gray-300">
                Mon - Sat: 6am to 9pm
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-tl from-[#080707] to-[#1e1e1e] px-6 sm:px-10 md:px-[100px] py-[50px] md:p-[70px]">
          <div className="w-[60%] sm:w-[50%] md:w-[42%]">
            <img src={logo} alt="logo" className="w-full" />
          </div>
          <p className="text-[13px] sm:text-[14px] tracking-wider mt-8 sm:mt-12 text-gray-300 leading-7">
            Used for cardio workouts, treadmills, bikes, and ellipticals improve
            heart health, boost stamina, and help burn calories.
          </p>
          <ul className="flex items-center gap-6 mt-12 py-5 border-y-[1px] border-[#DD4F52] justify-center">
            {[
              { name: "Home", link: "#" },
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
          </ul>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-[40%_auto] items-center gap-6">
            <div>
              <h4 className="font-bold text-[17px] sm:text-[18px]">
                Our Newsletter
              </h4>
              <p className="text-gray-300 text-[13px] tracking-wider mt-2">
                Subscribe for More Update
              </p>
            </div>
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Your Email Address"
                required
                className="border-1 outline-0 focus:ring-1 focus:ring-[#DD4F52] w-full border-[#3c3b3b] py-3 sm:py-4 ps-3 text-[13px] sm:text-[14px]"
              />
              <button className="bg-[#DD4F52] hover:bg-[#a93a3c] duration-150 px-[18px] cursor-pointer outline-0 h-full absolute right-0 top-0">
                <Bell size={20} />
              </button>
            </div>
          </div>
          <div className="mt-10 sm:mt-14">
            <p>Social Icons :</p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
              <a
                href="#"
                className="p-2 bg-[#DD4F52] text-white hover:bg-[#a93a3c] duration-200"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#DD4F52] text-white hover:bg-[#a93a3c] duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#DD4F52] text-white hover:bg-[#a93a3c] duration-200"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#DD4F52] text-white hover:bg-[#a93a3c] duration-200"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
