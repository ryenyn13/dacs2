import React from "react";
import cake_background from "../../assets/background/cake_background.png";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { toast, Toaster } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const AddCake = () => {
  const queryClient = useQueryClient();
  const [imgs, setImgs] = useState([]);
  const [formData, setFormData] = useState({
    cakeName: "",
    price: "",
    description: "",
    images: [],
  });

  const {
    mutate: addCake,
    isError,
    error,
    isAdding,
  } = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await fetch("/api/cake/addCake", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create car.");
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Add cake successfully");
      // reload
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImgs = [...imgs];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        updatedImgs.push(reader.result);
        setImgs((prevImgs) => [...prevImgs, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    formData.images = imgs;
    e.preventDefault();
    // console.log(formData)
    addCake(formData);
  };

  const removeImage = (index) => {
    setImgs(imgs.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="bg-cover bg-center w-auto h-auto flex items-center justify-center "
        style={{ backgroundImage: `url(${cake_background})` }}
      >
        <div className=" flex  w-[500px] h-auto items-center justify-center mt-[40px] space-x-[60px]">
          
            <div className="bg-white w-full p-8 shadow-md rounded-[20px] mb-20  ">
              <form>
                <div className="mt-5 mb-4 ">
                  <label
                    htmlFor="cakeName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CakeName
                  </label>
                  <input
                    type="text"
                    name="cakeName"
                    onChange={handleInputChange}
                    value={formData.cakeName}
                    placeholder=""
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#41759B] focus:border-[#6aacdc]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    placeholder=""
                    onChange={handleInputChange}
                    value={formData.price}
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#41759B] focus:border-[#6aacdc]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    onChange={handleInputChange}
                    value={formData.description}
                    placeholder=""
                    className="w-full px-4 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#41759B] focus:border-[#6aacdc]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Images
                  </label>
                  <label
                    htmlFor="imageUpload"
                    className="flex items-center justify-center w-full h-20 mt-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-gray-50"
                  >
                    <div className="text-center">
                      <p className="text-gray-600">
                        Click to upload or drag and drop images
                      </p>
                      <p className="text-sm text-gray-400">
                        (JPEG, PNG, up to 5MB each)
                      </p>
                    </div>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImgChange}
                    />
                  </label>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {imgs.map((src, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={src}
                          alt={`Uploaded ${index}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white text-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center  mt-5">
                  <button
                    type="submit"
                    className="w-full bg-[#D3B457] text-white font-bold py-2 px-5 mb-1 rounded-lg  hover:bg-[#8f6c00] transition duration-200"
                    onClick={handleSubmit}
                  >
                    {isAdding ? "Adding..." : "Add Cake"}
                  </button>

                  {/* <button
                      type="submit"
                      className="w-full bg-white border border-[#41759B] text-[#41759B] py-2 px-5 rounded-lg shadow-md hover:text-white hover:bg-[#1c4f73] transition duration-200"
                    >
                      Clear
                    </button> */}
                </div>
              </form>
              <Link to="/adminpage">
                <div className="flex justify-start items-center px-3 mt-5 text-[15px] text-[#8f6c00]">
                  <IoIosArrowRoundBack className="w-7 h-7 " />

                  <p>Back to Admin Page</p>
                </div>
              </Link>
            </div>
         
        </div>
      </div>
    </section>
  );
};

export default AddCake;
