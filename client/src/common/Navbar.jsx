import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { SlPaperPlane } from "react-icons/sl";
import { CiTwitter } from "react-icons/ci";
import { PiInstagramLogoLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { PiBagSimpleThin } from "react-icons/pi";
import { MdOutlineShoppingBag } from "react-icons/md";

import { BsBag } from "react-icons/bs";
import { TbMenu2 } from "react-icons/tb";
import logo from "../assets/logo/logo.png";
import { Link } from "react-router-dom";
import useAuthUser from "../components/auth/useAuthUser";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
const Navbar = () => {
  const { data: authUser, isLoading } = useAuthUser();
  const queryClient = useQueryClient();
  const {
    mutate: logout,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Logout successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogout = () => {
    logout();
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev); // Chuyển đổi trạng thái
  };
  return (
    <section className="bg-white flex w-full flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-[80px] w-full flex py-25 space-y-3 ">
        <div className="flex w-full justify-between items-center ">
          <div className="flex space-x-2 items-center ">
            <Link to="/contact">
              <SlPaperPlane className="w-5 h-4 cursor-pointer text-black hover:text-[#41759B]" />
            </Link>
            <Link to="https://www.facebook.com/ryenyn.13">
              <CiFacebook className="w-5 h-6 cursor-pointer text-black hover:text-[#41759B]" />
            </Link>
            <Link to="https://www.instagram.com/rye.bz135_/">
              <PiInstagramLogoLight className="w-5 h-6 cursor-pointer text-black hover:text-[#41759B]" />
            </Link>
            <CiTwitter className="w-7 h-6 cursor-pointer text-black hover:text-[#41759B]" />
          </div>
          <div className="justify-center items-center ml-4 flex">
            <Link to={"/"}>
              <img
                src={logo}
                className="flex items-center w-[180px] h-[140px] object-cover"
              ></img>
            </Link>
          </div>
          <div className="flex space-x-2 items-center">
            <Link to="/adminpage">
              <CiSearch className="w-5 h-6 cursor-pointer text-black hover:text-[#41759B]" />
            </Link>
            <Link to="/cart">
              <PiBagSimpleThin className="w-10 h-6 cursor-pointer text-black hover:text-[#41759B]" />
            </Link>
            {authUser ? (
              <div className="relative">
                <CiUser
                  className="w-5 h-6 cursor-pointer text-black hover:text-[#41759B]"
                  onClick={toggleDropdown}
                />
                {showDropdown && (
                  <div className="absolute flex w-[90px] -right-5 mt-2 items-center justify-center bg-white border shadow-md rounded-md ">
                    <ul>
                      <li>
                        <a
                          href="/forgotpass"
                          className="cursor-pointer text-black hover:text-[#41759B] text-[10px]"
                        >
                          Reset Password
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className=" flex justify-center items-center border border-black bg-white text-xs py-1 px-4 w-auto rounded-2xl cursor-pointer text-black hover:text-[#41759B] transition">
                  Log In
                </button>
              </Link>
            )}

            {authUser ? (
              <CiLogout
                className=" w-5 h-6 mt-0.5 mx-3 rotate-180 cursor-pointer text-black hover:text-[#41759B]"
                onClick={handleLogout}
              />
            ) : (
              <Link to="/adminpage">
                <TbMenu2 className="w-5 h-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex space-x-5 w-full items-center justify-center mt-4 text-black text-[13px]">
        <Link to="/about" className="li">
          About
        </Link>
        <Link to="/products" className="li">
          Product
        </Link>
        <Link to="/" className="li">
          Home
        </Link>
        <Link to="/contact" className="li">
          Contact
        </Link>
        {authUser?.isAdmin && (
          // onClick={<Link to="/adminpage"></Link>}
          <Link to="/adminpage" className="li cursor-pointer">
            Admin
          </Link>
        )}
      </div>
    </section>
  );
};

export default Navbar;
