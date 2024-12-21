import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

import { Link } from "react-router-dom";
import admin_background from "../../assets/background/cart_background.png";
import { useState } from "react";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  // navigate
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: products,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/cake/getAll");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong!");
        }
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });
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

        if (!res.ok) throw new Error(data.error || "Failed to create cake.");

        console.log(data);

        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    onSuccess: () => {
      toast.success("Add cake successfully"); // reload

      queryClient.invalidateQueries(["products"]);
      handleCloseAdd();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  // get cake by id
  const { mutate: getCake } = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await fetch(`/api/cake/getCake/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to get cake.");
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      setFormData({
        cakeName: data.cakeName,
        price: data.price,
        description: data.description,
        images: data.images,
      });
      setImgs(data.images);
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

  const handleAddSubmit = (e) => {
    formData.images = imgs;

    e.preventDefault(); // console.log(formData)

    addCake(formData);
  };

  const removeImage = (index) => {
    setImgs(imgs.filter((_, i) => i !== index));
  };
  const eraseImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEditImg = (e) => {
    // const files = e.target.files;

    // if (files && files.length > 0) {
    //   const newImages = Array.from(files).map((file) =>
    //     URL.createObjectURL(file)
    //   ); // Tạo URL blob cho mỗi ảnh

    //   setFormData((prev) => ({
    //     ...prev,
    //     images: [...prev.images, ...newImages], // Thêm ảnh mới vào danh sách hiện tại
    //   }));
    // }
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

  // //add
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const handleOpenAdd = () => {
    setIsOpenAdd(true);
    setIsOpenEdit(false);
  };
  const handleCloseAdd = () => setIsOpenAdd(false);
  const [cakeData, setCakeData] = useState({});

  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const handleOpenEdit = (cakeID) => {
    getCake(cakeID, {
      onSuccess: (cake) => {
        setFormData({
          id: cake._id,
          cakeName: cake.cakeName,
          price: cake.price,
          description: cake.description,
          images: cake.images,
        });
        setIsOpenEdit(true);
      },
      onError: (error) => {
        console.error("Failed to fetch cake:", error);
        alert("Could not load cake details.");
      },
    });
  };

  const { mutate: updateCake, isPending: isUpdatingCake } = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await fetch(`/api/cake/update/${data.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.error || "Something went wrong");
        }
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Update cake successfully");
      // invalidate the query to refetch the data
      handleCloseEdit();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCloseEdit = () => setIsOpenEdit(false);
  const handleEditSubmit = (event) => {
    event.preventDefault();
    formData.images = imgs;
    updateCake(formData);
  };

  const [isUpdating, setIsUpdating] = useState(false);

  //delete cake
  const { mutate: deleteCake, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await fetch(`/api/cake/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Cake deleted successfully");
      // invalidate the query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <section
      className="w-auto h-auto bg-repeat bg-cover bg-center py-5 flex flex-col justify-center items-center space-y-8"
      style={{ backgroundImage: `url(${admin_background})` }}
    >
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className=" flex w-full justify-center  space-x-[100px]">
        <div className="flex items-center space-x-10">
          <p>Products</p>
          <p>Users</p>
        </div>
        <div className="flex items-center space-x-5">
          <div className="flex">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            ></label>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              // onChange={handleInputChange}
              // value={formData.cakeName}
              className="w-full px-5 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0.5 focus:ring-[#c4def0] focus:border-[#bcd2e2]"
              required
            />
          </div>

          <button
            onClick={handleOpenAdd}
            className="bg-[#41759B] text-white px-6 py-1.5 rounded-lg shadow hover:bg-[#6aacdc] transition"
          >
            Add Cake
          </button>

          {isOpenAdd && (
            <div className="fixed -inset-11 bg-white bg-opacity-50 flex items-center justify-center z-50">
              <div
                className="w-[500px] bg-white border border-gray-300 rounded-lg shadow-lg p-8
                max-h-[550px] overflow-y-auto [&::-webkit-scrollbar]:w-1 
                [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500
               dark:[&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-thumb]:bg-neutral-100"
              >
                <div className="flex justify-end -mt-2">
                  <IoClose
                    onClick={handleCloseAdd}
                    className=" text-black hover:text-red-700 cursor-pointer"
                  ></IoClose>
                </div>
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
                      {imgs &&
                        imgs.map((src, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={src}
                              alt={`Uploaded ${index}`}
                              className="w-full h-30 object-cover rounded-lg"
                            />
                            <IoClose
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-1.5 bg-red-500 text-white text-lf rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            ></IoClose>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center  mt-5">
                    <button
                      type="submit"
                      className="w-full bg-[#D3B457] text-white font-bold py-2 px-5 mb-1 rounded-lg  hover:bg-[#8f6c00] transition duration-200"
                      onClick={handleAddSubmit}
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
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white w-auto h-auto flex flex-col rounded-[13px] shadow-md items-start">
        <div className="flex w-full justify-start items-center ml-[85px] py-5 px-20 space-x-[270px] text-gray-600">
          <p>Products</p>

          <div className="flex space-x-[50px] items-center">
            <p>Quantity</p>
            <p>Price</p>
            <p>Edit</p>
            <p>Delete</p>
          </div>
        </div>

        <div className="flex flex-col w-full">
          {isLoading && (
            <div className="justify-center items-center flex w-full">
              <TailSpin
                visible={true}
                height="50"
                width="50"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className=" w-auto h-auto flex items-start px-20 py-5 space-x-[85px] border-t border-gray-300"
              >
                <div className="flex w-auto items-start space-x-4 ">
                  <img
                    src={
                      product.images[0]
                        ? product.images[0]
                        : "https://placehold.co/80x80"
                    }
                    className="flex h-[80px] w-[80px] -ml-3 object-cover"
                  ></img>

                  <div className="flex flex-col items-start space-y-2">
                    <p> {product.cakeName}</p>
                    <div>
                      <p className="w-[250px] text-[10px] text-gray-500 line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" flex justify-between items-center py-5  space-x-[40px]">
                  <div className="flex w-auto items-start space-x-2">
                    <CiSquarePlus className="w-4 h-4" />
                    <p className="text-[11px]  ">01</p>
                    <CiSquareMinus className="w-4 h-4" />
                  </div>
                  <div className="flex w-auto space-x-[58px] ">
                    <div className=" flex justify-between items-center space-x-[50px] ">
                      <p className=" flex -ml-1 text-[11px] font-bold">
                        {" "}
                        {product.price} VND
                      </p>

                      <CiEdit
                        onClick={() => handleOpenEdit(product._id)}
                        className=" text-blue-600  w-5 h-5"
                      ></CiEdit>
                      {isOpenEdit && (
                        <div className="fixed -inset-11 flex items-center justify-center z-50">
                          <div
                            className="w-[500px] bg-white border border-gray-300 rounded-lg shadow-lg p-8
                          max-h-[550px] overflow-y-auto
                          [&::-webkit-scrollbar]:w-1 
                          [&::-webkit-scrollbar-track]:rounded-full
                          [&::-webkit-scrollbar-track]:bg-gray-100
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-scrollbar-thumb]:bg-gray-500"
                          >
                            <div className="flex justify-end -mt-2">
                              <IoClose
                                onClick={handleCloseEdit}
                                className="text-black hover:text-red-700 cursor-pointer"
                              />
                            </div>
                            <form onSubmit={handleEditSubmit}>
                              <div className="mt-5 mb-4">
                                <label
                                  htmlFor="cakeName"
                                  className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                  Cake Name
                                </label>
                                <input
                                  type="text"
                                  name="cakeName"
                                  value={formData.cakeName}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      cakeName: e.target.value,
                                    })
                                  }
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
                                  type="number"
                                  name="price"
                                  value={formData.price}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      price: e.target.value,
                                    })
                                  }
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
                                <textarea
                                  name="description"
                                  value={formData.description}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      description: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#41759B] focus:border-[#6aacdc]"
                                  required
                                />
                              </div>

                              {/* Image Upload */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Uploaded Images
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
                                    onChange={handleEditImg}
                                  />
                                </label>

                                <div className="mt-4 grid grid-cols-4 gap-4">
                                  {imgs &&
                                    imgs.map((img, index) => (
                                      <div
                                        key={index}
                                        className="relative w-[100px] h-[100px] bg-black bg-opacity-20 rounded-xl"
                                      >
                                        <img
                                          src={img}
                                          alt={`Image ${index}`}
                                          className="flex w-[150px] h-[100px] object-cover bg-center rounded-xl"
                                        />
                                        <IoIosClose
                                          onClick={() => eraseImage(index)}
                                          className="absolute top-2 right-2 text-red-500 cursor-pointer"
                                        />
                                      </div>
                                    ))}
                                </div>
                              </div>

                              <div className="flex flex-col justify-center mt-5">
                                <button
                                  type="submit"
                                  className="w-full bg-[#D3B457] text-white font-bold py-2 px-5 mb-1 rounded-lg hover:bg-[#8f6c00] transition duration-200"
                                  //   disabled={isEditing}
                                  // >
                                  //   {isEditing ? "Saving..." : "Save Changes"}
                                  disabled={isUpdating}
                                >
                                  {isUpdating ? "Saving..." : "Save Changes"}
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        //<button
                        // type="submit"
                        // className="w-full bg-white border border-[#41759B] text-[#41759B] py-2 px-5 rounded-lg shadow-md hover:text-white hover:bg-[#1c4f73] transition duration-200">
                        // Clear
                        // </button>
                      )}
                   
                  </div>

                  {isDeleting ? (
                    <p>Loading...</p>
                  ) : (
                    <CiTrash
                      className=" cursor-pointer text-red-500 w-5 h-5"
                      onClick={() =>
                        // console.log(product._id)
                        deleteCake(product._id)
                      }
                    />
                  )}
                </div>
              </div>
              </div>
            ))}
        </div>

        <div className=" w-[900px] flex items-center  border-t border-gray-300">
          {" "}
        </div>

        <Link to="/products">
          <div className="flex justify-start items-center px-3 py-5 text-[15px] text-blue-600">
            <IoIosArrowRoundBack className="w-7 h-7 " />

            <p>Back to Product</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default AdminPage;