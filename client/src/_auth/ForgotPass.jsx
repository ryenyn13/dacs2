import React from "react";
import b2 from "../assets/background/b7.png";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  return (
    <section>
      <div className="bg-[#f0ece3] w-full h-full">
        <div className=" flex items-center justify-center space-x-[60px] ">
          <div className="flex flex-col w-[500px] h-[450px] items-center justify-center mb-32 mt-[100px]">
            <div
              className="bg-cover bg-center w-full p-8 shadow-md rounded-[50px] bg-opacity-65 backdrop-blur-md"
              style={{ backgroundImage: `url(${b2})` }}
            >
              <div className=" flex flex-col justify-center items-center text-[40px]  text-[#41759B] font-bold py-5">
                <p className="">Reset Password</p>
                <p className=" mt-5 text-[15px]">
                  Click to receive the code from your email
                </p>
              </div>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Please enter the code here:
                  </label>
                  <input
                    type="text"
                    name="code"
                    placeholder="Enter your code"
                    // onChange={handleInputChange}
                    // value={formData.username}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#41759B] focus:border-[#6aacdc]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your new password"
                    // onChange={handleInputChange}
                    // value={formData.password}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#41759B] focus:border-[#6aacdc]"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Type your password again:
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your new password again"
                    // onChange={handleInputChange}
                    // value={formData.password}
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
              <Link to="/">
                <div className="flex justify-start items-center px-3 py-5 text-[15px] text-blue-600">
                  <IoIosArrowRoundBack className="w-7 h-7 " />

                  <p>Back to Homepage</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ForgotPass;
