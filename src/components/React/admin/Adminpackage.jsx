import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPackage,
  addPackage,
  deletePackage,
  updatePackage,
} from "../../Redux/addpackageSlice";
import { toast, ToastContainer } from "react-toastify";

const Adminpackage = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.addPackage);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [diet, setDiet] = useState("");
  const [suppliment, setSuppliment] = useState("");
  const [editId, setEditId] = useState(null);

  // fetch
  useEffect(() => {
    dispatch(fetchPackage());
  }, [dispatch]);

  function handleaddPackage(e) {
    e.preventDefault();

    if (!name || !duration || !price || !description) {
      return alert("Please fill every fields");
    }

    const newaddPackage = {
      name,
      duration,
      price,
      description,
      diet,
      suppliment,
    };

    if (editId) {
      dispatch(updatePackage({ id: editId, updated: newaddPackage })).then(
        () => {
          toast.success("Package updated successfully!");
          setEditId(null);
        }
      );
    } else {
      dispatch(addPackage(newaddPackage)).then(() => {
        toast.success("Package added successfully!");
      });
    }

    setName("");
    setDuration("");
    setPrice("");
    setDescription("");
    setDiet(false);
    setSuppliment(false);
    setShowForm(false);
  }

  function handleEdit(pkg) {
    setName(pkg.name);
    setDuration(pkg.duration);
    setPrice(pkg.price);
    setDescription(pkg.description);
    setDiet(pkg.diet);
    setSuppliment(pkg.suppliment);
    setEditId(pkg.id);
    setShowForm(true);
  }

  return (
    <div className="max-w-[1320px] mx-auto px-[15px] py-[80px] mt-[100vh]">
      {/* <ToastContainer autoClose={3000} /> */}
      {/* button */} {/* Package Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#151515] p-6 rounded-xl shadow-lg w-[100%] max-w-xl mx-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute cursor-pointer top-3 right-3 text-white text-xl font-bold hover:text-[#DD4F52]"
            >
              <FiX />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">
              Create New Package
            </h2>

            <form className="space-y-4" onSubmit={handleaddPackage}>
              <div>
                <label className="block text-white mb-1">Package Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Monthly Plan, Premium Plan"
                  className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-[#0A0A0A] text-white focus:outline-none focus:border-[#DD4F52]"
                />
              </div>

              <div>
                <label className="block text-white mb-1">Duration</label>
                <select
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-[#0A0A0A] text-white focus:outline-none focus:border-[#DD4F52]"
                >
                  <option value="">Select Duration</option>
                  <option value="1-month">1 Month</option>
                  <option value="6-months">6 Months</option>
                  <option value="1-year">1 Year</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-1">Price</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-[#0A0A0A] text-white focus:outline-none focus:border-[#DD4F52]"
                />
              </div>

              <div>
                <label className="block text-white mb-1">Description</label>
                <textarea
                  rows="3"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Additional details..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-[#0A0A0A] text-white focus:outline-none focus:border-[#DD4F52]"
                ></textarea>
              </div>
              <div className="flex gap-8 items-center">
                <div className="flex items-center gap-2">
                  <input
                    checked={diet}
                    onChange={(e) => setDiet(e.target.checked)}
                    type="checkbox"
                    className="accent-[#DD4F52]"
                  />
                  <label className="text-white">Diet Included</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    checked={suppliment}
                    onChange={(e) => setSuppliment(e.target.checked)}
                    type="checkbox"
                    className="accent-[#DD4F52]"
                  />
                  <label className="text-white">Supplement Included</label>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#DD4F52] text-white px-5 py-2 cursor-pointer hover:bg-[#a93a3c] transition duration-300"
              >
                {editId ? "Upadate Package" : "Create Package"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* view form */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-10 text-center">
          Available Packages
        </h2>
        <div className="flex justify-end items-center">
          {" "}
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#DD4F52] p-[12px_30px] my-[50px] text-[18px] cursor-pointer hover:bg-[#a93a3c] duration-300"
          >
            {" "}
            Add Package{" "}
          </button>{" "}
        </div>

        {list && list.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((pkg, index) => (
              <div
                key={index}
                className="bg-[#151515] border border-[#2b2b2b] p-6 shadow-lg hover:shadow-[#DD4F52]/40 transition duration-300"
              >
                <h3 className="text-2xl uppercase font-bold text-[#DD4F52] mb-4">
                  {pkg.name}
                </h3>

                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-white">Duration:</span>{" "}
                  {pkg.duration}
                </p>

                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-white">Price:</span> ₹
                  {pkg.price}
                </p>

                <p className="text-gray-300 text-[14px] mb-2">
                  <span className="font-semibold text-[16px] text-white">
                    Description:
                  </span>{" "}
                  {pkg.description}
                </p>

                <div className="flex flex-col gap-1 mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      pkg.diet
                        ? "bg-green-600/30 text-green-400"
                        : "bg-red-600/30 text-red-400"
                    }`}
                  >
                    {pkg.diet ? "Diet Included " : "No Diet "}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      pkg.suppliment
                        ? "bg-green-600/30 text-green-400"
                        : "bg-red-600/30 text-red-400"
                    }`}
                  >
                    {pkg.suppliment ? "Supplement Included " : "No Supplement "}
                  </span>
                </div>

                <div className="flex justify-end mt-5 gap-3">
                  <button
                    onClick={() =>
                      dispatch(deletePackage(pkg.id)).then(() => {
                        toast.success("Package deleted successfull");
                      })
                    }
                    className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleEdit(pkg)}
                    className="bg-[#DD4F52] cursor-pointer hover:bg-[#a93a3c] text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No packages added yet. Click “Add Package” to create one.
          </p>
        )}
      </div>
    </div>
  );
};

export default Adminpackage;
