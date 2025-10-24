import React from "react";
import hero from "../../../assets/images/hero/hero.png";

const Banner = () => {
  return (
    <div
      className="h-[100vh] absolute top-0 w-full bg-cover bg-top bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${hero})`,
        boxShadow: "inset 0 0 0 1000px rgba(0,0,0,0.2)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-[15px]">
        <h1 className="text-4xl md:text-[85px] md:leading-30 font-bold uppercase text-center text-white">
          NO EXCUSES. JUST REPS, SWEAT, AND RESULT
        </h1>
      </div>
    </div>
  );
};

export default Banner;
