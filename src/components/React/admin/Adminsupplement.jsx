import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSupplement,
  addSupplement,
  deleteSupplement,
  updateSupplement,
} from "../../Redux/addsupplementSlice";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Adminsupplement = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.addSupplement);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchSupplement());
  }, [dispatch]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!image) return null;
    const form = new FormData();
    form.append("file", image);
    form.append("upload_preset", "ShotFit");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dsjddkyyg/image/upload`,
        form
      );
      return res.data.secure_url;
    } catch (err) {
      console.error(err);
      alert("Image upload failed...");
      return null;
    }
  };

  const handleaddSupplement = async (e) => {
    e.preventDefault();

    if (!name || !price || (!image && !editId)) {
      return alert("Please fill all fields");
    }

    let imageUrl = imagePreview;
    if (image && (!editId || image !== imagePreview)) {
      imageUrl = await uploadImage();
      if (!imageUrl) return;
    }

    const newSupplement = {
      name,
      price,
      image: imageUrl,
    };

    if (editId) {
      dispatch(updateSupplement({ id: editId, updated: newSupplement })).then(
        () => {
          toast.success("Supplement updated successfully!");
          setEditId(null);
        }
      );
    } else {
      dispatch(addSupplement(newSupplement)).then(() => {
        toast.success("Supplement added successfully!");
      });
    }

    setName("");
    setPrice("");
    setImage(null);
    setImagePreview("");
    setShowForm(false);
  };

  const handleEdit = (sup) => {
    setName(sup.name);
    setPrice(sup.price);
    setImagePreview(sup.image);
    setEditId(sup.id);
    setShowForm(true);
  };

  return (
    <div className="max-w-[1320px] mx-auto px-[15px] py-[80px]">
      <ToastContainer autoClose={3000} />
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
              {editId ? "Edit Supplement" : "Create New Supplement"}
            </h2>

            <form className="space-y-4" onSubmit={handleaddSupplement}>
              <div>
                <label className="block text-white mb-1">Supplement Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Supplement name"
                  className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-[#0A0A0A] text-white focus:outline-none focus:border-[#DD4F52]"
                />
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

              {/* Image Upload */}
              <div>
                <label className="block text-white mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-[#0A0A0A] text-white focus:outline-none focus:border-[#DD4F52] cursor-pointer"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="preview supplement"
                    className="mt-2 w-full max-h-48 object-contain rounded-lg border border-gray-700"
                  />
                )}
              </div>

              <button
                type="submit"
                className="bg-[#DD4F52] text-white px-5 py-2 cursor-pointer hover:bg-[#a93a3c] transition duration-300"
              >
                {editId ? "Update Supplement" : "Create Supplement"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* view form */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-10 text-center">
          Available Supplements
        </h2>
        <div className="flex justify-end items-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#DD4F52] p-[12px_30px] my-[50px] text-[18px] cursor-pointer hover:bg-[#a93a3c] duration-300"
          >
            Add Supplement
          </button>
        </div>

        {list && list.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((sup, index) => (
              <div
                key={index}
                className="bg-[#151515] border border-[#2b2b2b] p-6 shadow-lg hover:shadow-[#DD4F52]/40 transition duration-300"
              >
                {sup.image && (
                  <img
                    src={sup.image}
                    alt={sup.name}
                    className="w-full h-48 object-cover mb-8 rounded-lg"
                  />
                )}
                <h3 className="text-2xl uppercase font-bold text-[#DD4F52] mb-2">
                  {sup.name}
                </h3>
                <p className="text-gray-300 mb-3">
                  <span className="font-semibold text-white">Price:</span> ₹
                  {sup.price}
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() =>
                      dispatch(deleteSupplement(sup.id)).then(() => {
                        toast.success("Supplement deleted successfully!");
                      })
                    }
                    className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleEdit(sup)}
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
            No Supplement added yet. Click “Add Supplement” to create one.
          </p>
        )}
      </div>
    </div>
  );
};

export default Adminsupplement;
