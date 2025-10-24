import React, { useState } from "react";

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const scheduleData = {
    Monday: [
      {
        workout: "Running",
        dayTime: "6:00 AM - 6:30 AM",
        nightTime: "5:00 PM - 5:30 PM",
        trainer: "Riya",
      },
      {
        workout: "Fitness",
        dayTime: "6:30 AM - 7:00 AM",
        nightTime: "5:30 PM - 6:00 PM",
        trainer: "Amit",
      },
      {
        workout: "Chest & Triceps",
        dayTime: "7:00 AM - 9:00 AM",
        nightTime: "6:00 PM - 8:00 PM",
        trainer: "Amit",
      },
      {
        workout: "Cardio",
        dayTime: "9:00 AM - 10:00 AM",
        nightTime: "8:00 PM - 9:00 PM",
        trainer: "Riya",
      },
    ],
    Tuesday: [
      {
        workout: "Running",
        dayTime: "6:00 AM - 6:30 AM",
        nightTime: "5:00 PM - 5:30 PM",
        trainer: "Riya",
      },
      {
        workout: "Fitness",
        dayTime: "6:30 AM - 7:00 AM",
        nightTime: "5:30 PM - 6:00 PM",
        trainer: "Amit",
      },
      {
        workout: "Back & Biceps",
        dayTime: "7:00 AM - 9:00 AM",
        nightTime: "6:00 PM - 8:00 PM",
        trainer: "Raj",
      },
    ],
    Wednesday: [
      {
        workout: "Running",
        dayTime: "6:00 AM - 6:30 AM",
        nightTime: "5:00 PM - 5:30 PM",
        trainer: "Riya",
      },
      {
        workout: "Fitness",
        dayTime: "6:30 AM - 7:00 AM",
        nightTime: "5:30 PM - 6:00 PM",
        trainer: "Amit",
      },
      {
        workout: "Legs",
        dayTime: "7:00 AM - 9:00 AM",
        nightTime: "6:00 PM - 8:00 PM",
        trainer: "Raj",
      },
      {
        workout: "Core",
        dayTime: "9:00 AM - 10:00 AM",
        nightTime: "8:00 PM - 9:00 PM",
        trainer: "Raj",
      },
    ],
    Thursday: [
      {
        workout: "Shoulders",
        dayTime: "7:00 AM - 9:00 AM",
        nightTime: "6:00 PM - 8:00 PM",
        trainer: "Deep",
      },
      {
        workout: "Fore Arms",
        dayTime: "9:00 AM - 9:30 AM",
        nightTime: "8:00 PM - 8:30 PM",
        trainer: "Sneha",
      },
    ],
    Friday: [
      {
        workout: "Running",
        dayTime: "6:00 AM - 6:30 AM",
        nightTime: "5:00 PM - 5:30 PM",
        trainer: "Riya",
      },
      {
        workout: "Fitness",
        dayTime: "6:30 AM - 7:00 AM",
        nightTime: "5:30 PM - 6:00 PM",
        trainer: "Amit",
      },
      {
        workout: "Full Body",
        dayTime: "7:00 AM - 9:00 AM",
        nightTime: "6:00 PM - 8:00 PM",
        trainer: "Sneha",
      },
    ],
    Saturday: [
      {
        workout: "HIIT & Abs",
        dayTime: "8:00 AM - 9:30 AM",
        nightTime: "7:00 PM - 8:30 PM",
        trainer: "Raj",
      },
    ],
    Sunday: [
      {
        workout: "Rest / Yoga",
        dayTime: "9:00 AM - 10:00 AM",
        nightTime: "-",
        trainer: "Deep",
      },
    ],
  };

  return (
    <div
      id="schedule"
      className="max-w-[1320px] mx-auto py-[50px] md:py-[80px] mt-[50px] md:mt-[100px] px-4 sm:px-6"
    >
      <h2 className="text-[35px] font-bold uppercase tracking-wider text-center mb-16">
        Our Workout Schedule
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 sm:gap-4 mb-6 sm:mb-10">
        {Object.keys(scheduleData).map((day) => (
          <div
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`cursor-pointer text-center py-2 sm:py-3 font-bold text-[14px] sm:text-[16px] md:text-[18px] duration-200 ${
              selectedDay === day
                ? "bg-[#DD4F52] text-white"
                : "bg-transparent border border-[#DD4F52] hover:bg-[#DD4F52]"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="overflow-x-auto shadow-[0_0px_55px_rgba(221,79,82,0.5)]">
        <table className="w-full border-collapse min-w-[600px] md:min-w-full">
          <thead>
            <tr className="bg-[#DD4F52] text-white text-left">
              <th className="py-4 sm:py-5 px-3 sm:px-6">WORKOUT</th>
              <th className="py-4 sm:py-5 px-3 sm:px-6">DAY TIMINGS</th>
              <th className="py-4 sm:py-5 px-3 sm:px-6">NIGHT TIMINGS</th>
              <th className="py-4 sm:py-5 px-3 sm:px-6">TRAINER</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData[selectedDay]?.map((item, index) => (
              <tr key={index} className="even:bg-[#1e1e1e] transition-all">
                <td className="py-4 sm:py-8 px-3 sm:px-6 font-semibold">
                  {item.workout}
                </td>
                <td className="py-4 sm:py-8 px-3 sm:px-6">{item.dayTime}</td>
                <td className="py-4 sm:py-8 px-3 sm:px-6">{item.nightTime}</td>
                <td className="py-4 sm:py-8 px-3 sm:px-6">{item.trainer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
