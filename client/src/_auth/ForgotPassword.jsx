import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { TailSpin } from "react-loader-spinner";
import { IoClose } from "react-icons/io5";


const ForgotPassword = () => {
  const [isOpenGmailCode, setIsOpenGmailCode] = useState(false);
  const handleOpenGmailCode = () => {
    setIsOpenGmailCode(true);
  };
  const handleClosenGmailCode = () => setIsOpenGmailCode(false);
  return (
    <section>
      <div className="flex justify-center items-center h-screen  bg-[#f0ece3]">
        
          <div
            className="w-[500px] bg-white border  border-gray-300 rounded-xl shadow-lg p-8
                                        max-h-[650px] overflow-y-auto [&::-webkit-scrollbar]:w-1 
                                        [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
                                        [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500
                                        dark:[&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-thumb]:bg-neutral-100"
          >
            <div className="flex justify-end -mt-2 -mr-2">
              <Link to="/login">
                <IoClose className=" text-black hover:text-red-700 cursor-pointer"></IoClose>
              </Link>
            </div>
            <div className=" flex flex-col justify-center items-center text-[40px]  text-[#41759B] font-bold py-5">
              <p className="">Reset Password</p>
              <p onClick={handleOpenGmailCode} className=" mt-5 text-[15px]">
                Click to receive the code from your email
              </p>
              {isOpenGmailCode && (
                <div className="fixed -inset-[98px] bg-white bg-opacity-70 flex items-center justify-center z-50">
                  <div className="w-[500px] h-auto bg-white border -mt-[250px] border-gray-300 rounded-xl shadow-lg p-8">
                    <div className="flex justify-end -mt-2 -mr-2">
                      <IoClose
                        onClick={handleClosenGmailCode}
                        className=" text-black text-[20px] hover:text-red-700 cursor-pointer"
                      ></IoClose>
                    </div>
                    <div className=" flex flex-col mb-4 justify-center items-center text-[40px]  text-[#41759B] font-bold py-5">
                      <p className=" mt-3 text-[15px] font-semibold">
                        Please enter the 6-digit code sent to your email
                      </p>
                      <div className="flex items-center mt-5 space-x-2">
                        {/* {code.map((digit, index) => ( */}
                        <input
                          // key={index}
                          type="text"
                          maxLength="1"
                          // value={digit}
                          // ref={(el) => (inputsRef.current[index] = el)}
                          // onChange={(e) => handleChange(e.target.value, index)}
                          // onKeyDown={(e) => handleKeyDown(e, index)}
                          className="w-10 h-10 text-center border border-gray-500 rounded-md bg-transparent text-white text-xl focus:outline-none focus:ring-1 focus:ring-[#83cbfe]"
                        />
                        {/* ))} */}
                        <input
                          type="text"
                          maxLength="1"
                          // value={digit}
                          className="w-10 h-10 text-center border border-gray-500 rounded-md bg-transparent text-white text-xl focus:outline-none focus:ring-1 focus:ring-[#83cbfe]"
                        />
                        <input
                          type="text"
                          maxLength="1"
                          // value={digit}
                          className="w-10 h-10 text-center border border-gray-500 rounded-md bg-transparent text-white text-xl focus:outline-none focus:ring-1 focus:ring-[#83cbfe]"
                        />
                        <input
                          type="text"
                          maxLength="1"
                          // value={digit}
                          className="w-10 h-10 text-center border border-gray-500 rounded-md bg-transparent text-white text-xl focus:outline-none focus:ring-1 focus:ring-[#83cbfe]"
                        />
                        <input
                          type="text"
                          maxLength="1"
                          // value={digit}
                          className="w-10 h-10 text-center border border-gray-500 rounded-md bg-transparent text-white text-xl focus:outline-none focus:ring-1 focus:ring-[#83cbfe]"
                        />
                        <input
                          type="text"
                          maxLength="1"
                          // value={digit}
                          className="w-10 h-10 text-center border border-gray-500 rounded-md bg-transparent text-white text-xl focus:outline-none focus:ring-1 focus:ring-[#83cbfe]"
                        />
                      </div>
                      <div className="flex w-full  justify-center items-center space-x-4 mt-8">
                        <button
                          // onClick={handleSendEmail}
                          className=" bg-[#41759B] text-sm text-white py-1 px-2  rounded-xl  hover:bg-[#1c4f73] transition duration-200"
                        >
                          Send again
                        </button>
                        <button
                          // onClick={handleConfirm}
                          className=" bg-[#41759B] text-sm text-white py-1 px-5  rounded-xl  hover:bg-[#1c4f73] transition duration-200"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your new password"
                  // onChange={handleInputChange}
                  // value={formData.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#41759B] focus:border-[#6aacdc]"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password Confirm
                </label>
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Enter your password again"
                  // onChange={handleInputChange}
                  // value={formData.fullName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#41759B] focus:border-[#6aacdc]"
                  required
                />
              </div>
              
              

              <div className="flex flex-col justify-center  mt-5">
                <button
                  type="submit"
                  className="w-full bg-[#41759B] text-white py-2 px-5 mb-1 rounded-lg  hover:bg-[#1c4f73] transition duration-200"
                  // onClick={() => login(formData)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        
      </div>
    </section>
  );
};

export default ForgotPassword;
