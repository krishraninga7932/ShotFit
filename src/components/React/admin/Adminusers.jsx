import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBill } from "../../Redux/addBill";
import { db } from "../../../firebase";
import { ref, get, remove } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
import { FiX } from "react-icons/fi";

const Adminusers = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const [allUsers, setAllUsers] = useState([]);
  const [showBillForm, setShowBillForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getNameFromEmail = (email) => {
    if (!email) return "User";
    const username = email.split("@")[0];
    const alphabetsOnly = username.replace(/[^a-zA-Z]/g, "");
    if (!alphabetsOnly) return "User";
    return alphabetsOnly.charAt(0).toUpperCase() + alphabetsOnly.slice(1);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await get(ref(db, "users"));
      if (snapshot.exists()) {
        const users = Object.entries(snapshot.val()).map(([uid, userData]) => ({
          uid,
          ...userData,
        }));
        setAllUsers(users);
      } else {
        setAllUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const handleOpenBillForm = (user) => {
    setSelectedUser(user);
    setShowBillForm(true);
  };

  // bill create
  const handleSubmitBill = (e) => {
    e.preventDefault();
    const packagePrice = Number(e.target.packagePrice.value) || 0;
    const dietPrice = Number(e.target.dietPrice.value) || 0;
    const suppPrice = Number(e.target.suppPrice.value) || 0;
    const total = packagePrice + dietPrice + suppPrice;

    const billData = {
      userId: selectedUser.uid,
      email: selectedUser.email,
      packagePrice,
      dietPrice,
      suppPrice,
      total,
      createdAt: new Date().toISOString(),
    };

    dispatch(addBill(billData));
    toast.success("Bill Created & Saved Successfully");
    setShowBillForm(false);
  };

  const handleDeleteUser = async (uid) => {
    try {
      await remove(ref(db, "users/" + uid));
      // Update UI immediately
      setAllUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="max-w-[1320px] mx-auto px-[15px] py-[80px]">
      <h2 className="text-2xl font-semibold text-white mb-10 text-center">
        Registered Users
      </h2>
      {/* bill Form */}
      {showBillForm && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-[#121212] rounded-2xl shadow-2xl w-full max-w-lg p-8 relative text-white">
            <button
              onClick={() => setShowBillForm(false)}
              className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-[#DD4F52] transition"
            >
              <FiX size={22} />
            </button>

            <h2 className="text-3xl font-bold text-center mb-6 text-[#DD4F52]">
              Create Bill for {getNameFromEmail(selectedUser.email)}
            </h2>

            <form onSubmit={handleSubmitBill} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Package Price
                </label>
                <input
                  name="packagePrice"
                  type="number"
                  placeholder="Enter package price"
                  className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:border-[#DD4F52] text-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Diet Price
                </label>
                <input
                  name="dietPrice"
                  type="number"
                  placeholder="Enter diet price"
                  className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:border-[#DD4F52] text-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Supplement Price
                </label>
                <input
                  name="suppPrice"
                  type="number"
                  placeholder="Enter supplement price"
                  className="w-full px-4 py-2 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:border-[#DD4F52] text-gray-200"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-[#DD4F52] hover:bg-[#b63a3c] transition-all text-white py-3 font-semibold rounded-lg shadow-lg mt-4"
              >
                Create Bill
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="overflow-x-auto shadow-[0_0px_55px_rgba(221,79,82,0.5)] rounded-lg">
        <table className="w-full border-collapse min-w-[600px] md:min-w-full">
          <thead>
            <tr className="bg-[#DD4F52] text-white text-left">
              <th className="py-4 sm:py-5 px-3 sm:px-6">USER</th>
              <th className="py-4 sm:py-5 px-3 sm:px-6">PACKAGE</th>
              <th className="py-4 sm:py-5 px-3 sm:px-6">DIET</th>
              <th className="py-4 sm:py-5 px-3 sm:px-6">SUPPLEMENT</th>
              <th className="py-4 sm:py-5 px-3 sm:px-6">BILL</th>
              <th className="py-4 sm:py-5 px-3 sm:px-6">Delete User</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((u, index) => (
                <tr key={index} className="even:bg-[#1e1e1e] transition-all">
                  <td className="py-4 sm:py-8 px-3 sm:px-6 font-semibold">
                    <p>{getNameFromEmail(u.email)}</p>
                    <p className="text-gray-400 font-normal text-[14px]">
                      {u.email}
                    </p>
                  </td>
                  <td className="py-4 sm:py-8 px-3 sm:px-6">
                    {u.package
                      ? (Array.isArray(u.package)
                          ? u.package
                          : [u.package]
                        ).map((p, i) => <p key={i}>{p.name}</p>)
                      : "-"}
                  </td>

                  <td className="py-4 sm:py-8 px-3 sm:px-6">
                    {u.diet
                      ? (Array.isArray(u.diet) ? u.diet : [u.diet]).map(
                          (d, i) => <p key={i}>{d.name}</p>
                        )
                      : "-"}
                  </td>
                  <td className="py-4 sm:py-8 px-3 sm:px-6">
                    {u.supp
                      ? (Array.isArray(u.supp) ? u.supp : [u.supp]).map(
                          (s, i) => <p key={i}>{s.name}</p>
                        )
                      : "-"}
                  </td>
                  <td
                    onClick={() => handleOpenBillForm(u)}
                    className="py-4 sm:py-8 px-3 sm:px-6"
                  >
                    <button className="bg-[#DD4F52] cursor-pointer hover:bg-[#c94245] text-white px-4 py-2 rounded-md text-sm transition-all">
                      Create Bill
                    </button>
                  </td>
                  <td className="py-4 sm:py-8 px-3 sm:px-6">
                    <button
                      onClick={() => handleDeleteUser(u.uid)}
                      className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-400 py-8 text-lg"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adminusers;
