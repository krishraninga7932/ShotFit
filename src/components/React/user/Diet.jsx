import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { fetchDiet } from "../../Redux/adddietSlice";
import { ref, update, get } from "firebase/database";
import { db } from "../../../firebase";
import { toast, ToastContainer } from "react-toastify";

const Supplement = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.addDiet);
  const currentUser = useSelector((state) => state.auth.user);

  // fetch packages
  useEffect(() => {
    dispatch(fetchDiet());
  }, [dispatch]);

  if (!list || list.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-400 text-lg text-center">
          No Diet available right now. Please check back later!
        </p>
      </div>
    );
  }

  // buy
  const buyDiet = async (diet) => {
    if (!currentUser) {
      return toast.error("Please login first!");
    }
    try {
      const userRef = ref(db, "users/" + currentUser.uid);
      const snapshot = await get(userRef);
      let existingDiet = [];
      if (snapshot.exists() && snapshot.val().diet) {
        existingDiet = snapshot.val().diet;
        if (!Array.isArray(existingDiet)) {
          existingDiet = [existingDiet];
        }
      }
      const updatedDiets = [
        ...existingDiet,
        { name: diet.name, price: diet.price },
      ];
      await update(userRef, { diet: updatedDiets });

      toast.success("Diet purchased successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div id="diet" className="max-w-[1320px] mx-auto px-4 py-[80px] mt-[100px]">
      <h2 className="text-[35px] font-bold uppercase tracking-wider text-center mb-16">
        Our Meals Matter
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {list.map((sup, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#080707] via-[#1e1e1e] to-[#450506] p-6 shadow-xl hover:scale-105 transition-transform duration-300 relative overflow-hidden"
          >
            {/* Top Ribbon */}
            <div className="absolute top-0 left-0 bg-[#DD4F52] px-4 py-1 text-white font-semibold">
              Most Loved
            </div>

            <h3 className="text-2xl font-bold [text-shadow:0px_0px_15px_#DD4F52] text-white mt-8 mb-4">
              {sup.name}
            </h3>

            <img
              src={sup.image}
              alt="supplements"
              className="h-[300px] object-cover w-full"
            />

            <div className="flex justify-between items-center mt-6">
              <span className="text-xl font-bold text-[#DD4F52]">
                ₹{sup.price}
              </span>
              <button  onClick={() => buyDiet(sup)} className="bg-[#DD4F52] hover:bg-[#a93a3c] text-white px-4 py-2 cursor-pointer font-semibold transition">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Supplement;
