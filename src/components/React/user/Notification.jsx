import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import logo from "../../../assets/images/logo/black-logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { fetchBills } from "../../Redux/addBill";
import { fetchPackage } from "../../Redux/addpackageSlice";
import { fetchDiet } from "../../Redux/adddietSlice";
import { fetchSupplement } from "../../Redux/addsupplementSlice";

const Notification = () => {
  const [showBill, setShowBill] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const { list, status, error } = useSelector((state) => state.bill);
  const { list: packages } = useSelector((state) => state.addPackage);
  const { list: diets } = useSelector((state) => state.addDiet);
  const { list: supplements } = useSelector((state) => state.addSupplement);

  useEffect(() => {
    dispatch(fetchBills());
    dispatch(fetchPackage());
    dispatch(fetchDiet());
    dispatch(fetchSupplement());
  }, [dispatch]);

  const userBills = user
    ? list.filter(
        (bill) => bill.userId === user.uid || bill.email === user.email
      )
    : [];

  // search for visitor screen of package,supplement,diet
  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredDiets = diets.filter((diet) =>
    diet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredSupplements = supplements.filter((sup) =>
    sup.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasResults =
    filteredPackages.length > 0 ||
    filteredDiets.length > 0 ||
    filteredSupplements.length > 0;

  return (
    <div>
      {user ? (
        <div className="mt-[100vh] py-[10vw] px-4 md:px-6 lg:px-0 max-w-[1320px] mx-auto">
          <h2 className="text-[6vw] md:text-[35px] font-bold uppercase tracking-wider text-center mb-[5vw] md:mb-16">
            Notifications
          </h2>
          <div className="bg-gradient-to-br from-[#080707] p-[5vw] md:p-[40px] via-[#1e1e1e] to-[#450506] w-full rounded-lg">
            {userBills.length > 0 ? (
              userBills.map((bill, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-lg p-[3vw] md:p-6 mb-[3vw] md:mb-6 border border-red-700 hover:bg-white/20 duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <h3 className="text-[4vw] sm:text-lg font-semibold text-white">
                        💰 Your new bill of ₹$
                        {Number(bill.packagePrice || 0) +
                          Number(bill.dietPrice || 0) +
                          Number(bill.suppPrice || 0)}{" "}
                        has been generated.
                      </h3>
                      <span className="text-[2.5vw] sm:text-xs text-gray-400">
                        {new Date(bill.createdAt).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-400 italic text-[4vw] sm:text-base">
                No notifications yet.
              </p>
            )}
            {userBills.length > 0 && (
              <div className="text-center mt-[3vw] md:mt-6">
                <button
                  onClick={() => setShowBill(!showBill)}
                  className="bg-[#DD4F52] px-[5vw] md:px-[25px] py-[2vw] md:py-2 font-bold hover:bg-[#a93a3c] cursor-pointer duration-150 text-[4vw] sm:text-base"
                >
                  {showBill ? "Hide Bill" : "View Bill"}
                </button>
              </div>
            )}
            {showBill && (
              <div className="bg-white/80 rounded-lg p-[4vw] md:p-8 max-w-full sm:max-w-[550px] mx-auto mt-[4vw] md:mt-16">
                <div>
                  <img src={logo} alt="logo" className="mx-auto mb-[4vw] md:mb-[20px] w-[30vw] sm:w-[150px] object-contain" />
                </div>
                <div className="space-y-[3vw] md:space-y-4 text-black">
                  {userBills.map((bill, index) => (
                    <div key={index}>
                      <div className="flex flex-col sm:flex-row justify-between pb-2 gap-1">
                        <span className="font-semibold">Package:</span>
                        <span>₹{bill.packagePrice || 0}</span>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between pb-2 gap-1">
                        <span className="font-semibold">Diet:</span>
                        <span>₹{bill.dietPrice || 0}</span>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between pb-2 gap-1">
                        <span className="font-semibold">Supplement:</span>
                        <span>{bill.suppPrice || 0}</span>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between font-bold text-[4vw] sm:text-lg mt-6 border-t pt-3 border-gray-600 gap-1">
                        <span>Total:</span>
                        <span>
                          ₹
                          {Number(bill.packagePrice || 0) +
                            Number(bill.dietPrice || 0) +
                            Number(bill.suppPrice || 0)}
                        </span>
                      </div>
                      <div className="text-[2.5vw] sm:text-[10px] text-gray-600 text-center mt-4">
                        Created on:{" "}
                        {new Date(bill.createdAt).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // searching functionality
        <div className="mt-[90vh] py-[10vw] px-4 md:px-6 lg:px-0 max-w-[1320px] mx-auto">
          <h2 className="text-[6vw] md:text-[35px] font-bold uppercase tracking-wider text-center mb-[5vw] md:mb-16 text-white">
            Explore Our Offerings
          </h2>
          <div className="flex justify-center mb-[5vw] md:mb-10 relative w-full max-w-[90vw] sm:max-w-[500px] mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[5vw] sm:text-lg" />
            <input
              type="text"
              placeholder="Search package, diet, or supplement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-white placeholder-gray-400 border border-[#a93a3c] pl-[12vw] sm:pl-12 pr-4 py-[3vw] sm:py-3 bg-transparent focus:outline-none focus:ring-1 text-[4vw] sm:text-[14px] focus:ring-[#a93a3c] transition duration-200"
            />
          </div>
          {searchTerm && (
            <div className="max-w-[90vw] sm:max-w-[500px] mx-auto mb-[5vw] md:mb-10 bg-white/10 rounded-md border border-[#DD4F52]/40 text-white text-[3.5vw] sm:text-sm divide-y divide-gray-700">
              {hasResults ? (
                <>
                  {filteredPackages.map((pkg, index) => (
                    <div
                      key={`pkg-${index}`}
                      className="p-[3vw] sm:p-3 hover:bg-white/20 cursor-pointer transition"
                    >
                      <div className="font-semibold text-[#DD4F52]">
                        Package: {pkg.name}
                      </div>
                      <div>Price: ₹{pkg.price}</div>
                    </div>
                  ))}
                  {filteredDiets.map((diet, index) => (
                    <div
                      key={`diet-${index}`}
                      className="p-[3vw] sm:p-3 hover:bg-white/20 cursor-pointer transition"
                    >
                      <div className="font-semibold text-[#DD4F52]">
                        Diet: {diet.name}
                      </div>
                      <div>Price: ₹{diet.price}</div>
                    </div>
                  ))}
                  {filteredSupplements.map((sup, index) => (
                    <div
                      key={`sup-${index}`}
                      className="p-[3vw] sm:p-3 hover:bg-white/20 cursor-pointer transition"
                    >
                      <div className="font-semibold text-[#DD4F52]">
                        Supplement: {sup.name}
                      </div>
                      <div>Price: ₹{sup.price}</div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="p-[3vw] sm:p-3 text-gray-400 text-center">
                  No matching results found.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
