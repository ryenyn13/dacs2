import React from "react";

import cake from "../../assets/background/cake.png";
import github from "../../assets/icon/github.png";
import facebook from "../../assets/icon/facebook.png";
import instagram from "../../assets/icon/instagram.png";
import manager from "../../assets/about/manager.png";
import owner from "../../assets/about/owner.png";
import bake from "../../assets/about/bake.png";
import deckem from "../../assets/about/deckem.png";
import { useState } from "react";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { TailSpin } from "react-loader-spinner";

const Contact = () => {
   const queryClient = useQueryClient();
  // get user by id
  const { mutate: getUser } = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await fetch(`/api/user/getUser/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to get user.");
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      setFormData({
        fullName: data.fullName,
        email: data.email,
        bio: data.bio,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [formData, setFormData] = useState({
    
    fullName: "",
    email: "",
    bio: "",
  });

    const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
      mutationFn: async (data) => {
        try {
          const res = await fetch(`/api/user/update/${data.id}`, {
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
        toast.success("Update user successfully");
        console.log("User data:", data);
        // invalidate the query to refetch the data
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  
    const handleUpdateSubmit = (event) => {
      event.preventDefault();
      formData.bio = bio;
      updateUser(formData);
    };
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

 

  return (
    <section>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="h-auto bg-[#F5F5F5] pt-5 px-24 mb-[100px]">
        <p className="flex justify-center text-[30px] text-[#41759B] py-5 font-bold ">
          Our Members
        </p>
        <div className=" flex flex-cols-4 justify-center w-full space-x-8 ">
          <div className="flex flex-col items-start mb-4">
            <img
              src={manager}
              className="mt-7 flex px-[2px] w-[300px] h-[240px]"
            ></img>
            <p className="w-full items-center mt-[10px] text-[15px] font-bold text-[#db545a] text-center">
              Manager
            </p>
          </div>

          <div className="flex flex-col items-start mb-4 ">
            <img
              src={owner}
              className="w-[300px] h-[240px] mt-7 flex px-[2px]"
            ></img>
            <p className="w-full items-center mt-[10px] text-[15px] font-bold text-[#db545a] text-center">
              Owner
            </p>
          </div>
          <div className="flex flex-col items-start mb-4">
            <img
              src={bake}
              className="w-[300px] h-[240px] mt-7 flex px-[2px]"
            ></img>
            <p className="w-full items-center mt-[10px] text-[15px] font-bold text-[#db545a] text-center">
              Baker
            </p>
          </div>
          <div className="flex flex-col items-start mb-4">
            <img
              src={deckem}
              className=" w-[300px] h-[240px] mt-7 flex px-[2px]"
            ></img>
            <p className="w-full items-center mt-[10px] text-[15px] font-bold text-[#db545a] text-center">
              Decorator
            </p>
          </div>
        </div>
        <div className=" flex items-center bg-[#F5F5F5] h-[700px] justify-center space-x-[60px]  ">
          <img src={cake} className=" w-[450px] h-[450px]  mt-10" />
          <div className="flex flex-col w-[500px] h-[450px] items-center justify-center space-y-5 mt-5">
            <div className="w-full bg-white p-8  shadow-md rounded-lg ">
              <div className=" flex flex-col justify-center items-center text-[40px] font-bold">
                <p className="">Contact </p>
                <p className="text-[20px] ml-[150px]">Our Bakery</p>
                <div className=" flex space-x-10 w-full items-center justify-center mt-3 mb-2 ">
                  <img src={github} className=" flex h-[20px] w-[20px]"></img>
                  <img
                    src={instagram}
                    className=" flex h-[20px] w-[20px]"
                  ></img>
                  <img src={facebook} className=" flex h-[20px] w-[20px]"></img>
                </div>
              </div>
              <form onSubmit={handleUpdateSubmit}>
               
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#41759B] focus:border-[#41759B]"
                    required
                    
                  />
                </div>

               
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#41759B] focus:border-[#41759B]"
                    required
                   
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="problem"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    How can I help?
                  </label>
                  <input
                    type="text"
                    id="problem"
                    name="problem"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Enter your problem"
                    className="w-full px-4 py-5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#41759B] focus:border-[#41759B]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#41759B] text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500 transition duration-200"
                  disabled={isUpdatingUser}
                >
                  {isUpdatingUser ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/*<div>
           <div className="flex justify-center items-center">
            <div className="absolute -mt-10 bg-[#8f6c00] text-white text-[20px] font-bold px-10 py-[1px] rounded-[20px] shadow-lg">
              Contact us
            </div>
            <img src={abvientren} className="[h-50px] object-cover" />
          </div>
        </div>
        <div className=" bg-[#f0ece3] flex justify-center  space-x-20 px-10 ">
          <div className="flex flex-col w-[500px] h-[300px] space-y-5">
            <div className=" text-[40px] text-[#8f6c00]  ">
              <p className="">Food you love,</p>
              <p className="">delivered to you</p>
            </div>
            <p>
              We use quality materials that we get directly from farmers. our
              backers are experienced people in the food sector. So that the
              products we produce are guaranteed quality and taste. It's so
              delicious, you have to try it!
            </p>
          </div>
          <img src={imgab} className=" w-[250px] h-[250px] rounded-3xl  " />
        </div>
        <img src={abvienduoi1} className="  h-[100px] w-full object-cover" /> */}
    </section>
  );
};

export default Contact;
