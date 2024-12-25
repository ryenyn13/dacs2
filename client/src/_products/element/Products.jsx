import React from "react";
import { useEffect } from "react";
import vou1 from "../../assets/voucher/vou1.png";
import vou2 from "../../assets/voucher/vou2.png";
import vou3 from "../../assets/voucher/vou3.png";
import vou4 from "../../assets/voucher/vou4.png";
import vou5 from "../../assets/voucher/vou5.png";
import vou6 from "../../assets/voucher/vou6.png";

import { LiaCartPlusSolid } from "react-icons/lia";
import { MdArrowDropDown } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import product from "../../assets/background/product.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { TailSpin } from "react-loader-spinner";
import { FaSearch } from "react-icons/fa";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   const slides = document.querySelectorAll(".slide");
  //   let currentIndex = 0;

  //   function showNextSlide() {
  //     // Kiểm tra nếu slide tồn tại
  //     if (!slides || slides.length === 0) return;

  //     slides[currentIndex].classList.remove("opacity-100", "active");
  //     slides[currentIndex].classList.add("opacity-0");

  //     currentIndex = (currentIndex + 1) % slides.length;

  //     slides[currentIndex].classList.remove("opacity-0");
  //     slides[currentIndex].classList.add("opacity-100", "active");
  //   }

  //   // Tự động chuyển ảnh sau 10 giây
  //   const interval = setInterval(showNextSlide, 10000);

  //   return () => clearInterval(interval); // Dọn dẹp khi component unmount
  // }, []);
  //get all cake
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

  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: async (productId) => {
      try {
        const response = await fetch(`/api/user/add/cart/${productId}`, {
          method: "POST",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong!");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Product added to cart", {
        duration: 2000,
      });

      setTimeout(() => {
        setLoadingProductId(null);
      });
    },
    onError: (error) => {
      // TODO
      toast.error("Item already in cart", {
        duration: 2000,
      });

      setTimeout(() => {
        setLoadingProductId(null);
      });
    },
  });

  const [cakes, setCakes] = useState([]);
  const handleAddToCart = (productId) => {
    setLoadingProductId(productId);
    addToCart(productId);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredProducts = products?.filter((product) =>
    product.cakeName.toLowerCase().includes(searchTerm.toLowerCase()),
  );  

  return (
    <section className="w-full bg-white">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h1 className="flex justify-center py-[30px] text-2xl font-bold text-[#65594C]">
        Catalog
      </h1>
      <div className="w-full flex items-center space-x-[200px]">
        <div className=" ml-[200px] mt-1 flex text-gray-400 text-[15px] font-bold   space-x-[50px] items-center">
          <p className=" text-black">ALL</p>
          <p>CHILLED DESSERT</p>
          <p>SET</p>
          <p>PASTRY</p>
          <p>OTHER</p>
        </div>
        <div className=" mt-1 flex items-center space-x-2">
          <div className="relative -ml-10 flex justify-center items-center w-full">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            ></label>
            <input
              type="text"
              name="search"
              placeholder=" Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-3 py-1.5 ml-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0.5 focus:ring-[#c4def0] focus:border-[#bcd2e2]"
            />
             
          </div>
          {/* <p className="text-[15px] font-bold  text-[#65594C]">Filter</p>
          <MdArrowDropDown className="w-5 h-5" /> */}
         <FaSearch
              className=" w-5 h-5  text-gray-400 cursor-pointer"
              title="Search"
            />
        </div>
      </div>
      <div className="space-y-2">
        <div className="mt-5 flex px-[100px] justify-center w-full ">
          <div className="grid-cols-4 gap-x-6 mt-3 grid">
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
            {filteredProducts &&
              filteredProducts.map((product) => (
                <Link to={`/productdetail/${product._id}`}>
                  <div className=" w-[220px] h-auto">
                    <div className="w-full flex flex-col items-center mb-4">
                      <img
                        src={
                          product.images[0]
                            ? product.images[0]
                            : "https://placehold.co/200x220"
                        }
                        className="mt-7 flex px-[2px] w-[200px] h-[220px] object-cover"
                      ></img>
                      <p className="flex items mt-[10px] text-[15px] font-bold text-[#65594C]">
                        {product.cakeName}
                      </p>
                      <p className="flex text-[11px] text-[#65594C] font-thin mt-[5px] ">
                        {product.price} VND
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default Products;
