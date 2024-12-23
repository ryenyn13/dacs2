import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // Nếu dùng react-query
import { TailSpin } from "react-loader-spinner";
import { CiEdit, CiTrash, CiSquarePlus, CiSquareMinus } from "react-icons/ci";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("products"); // Tab mặc định là 'products'

  // Lấy dữ liệu products
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products/all");
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error loading products");
      return data;
    },
  });

  // Lấy dữ liệu users
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/user/all");
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error loading users");
      return data;
    },
  });

  return (
    <div className="bg-white w-auto h-auto flex flex-col rounded-[13px] shadow-md items-start">
      {/* Tab Switcher */}
      <div className="flex w-full justify-start items-center ml-[85px] py-5 px-20 space-x-[50px] text-gray-600">
        <p
          className={`cursor-pointer ${
            activeTab === "products" ? "text-blue-600 font-bold" : ""
          }`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </p>
        <p
          className={`cursor-pointer ${
            activeTab === "users" ? "text-blue-600 font-bold" : ""
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </p>
      </div>

      {/* Hiển thị bảng Products */}
      {activeTab === "products" && (
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-start items-center ml-[85px] py-5 px-20 space-x-[270px] text-gray-600">
            <p>Products</p>
            <div className="flex space-x-[50px] items-center">
              <p>Quantity</p>
              <p>Price</p>
              <p>Edit</p>
              <p>Delete</p>
            </div>
          </div>

          {isLoadingProducts && (
            <div className="flex justify-center items-center w-full">
              <TailSpin visible={true} height="50" width="50" color="#4fa94d" />
            </div>
          )}

          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className="w-auto h-auto flex items-start px-20 py-5 space-x-[85px] border-t border-gray-300"
              >
                <div className="flex w-auto items-start space-x-4">
                  <img
                    src={
                      product.images[0]
                        ? product.images[0]
                        : "https://placehold.co/80x80"
                    }
                    className="flex h-[80px] w-[80px] object-cover -ml-3"
                  />
                  <div className="flex flex-col items-start space-y-2">
                    <p>{product.cakeName}</p>
                    <div>
                      <p className="w-[250px] text-[10px] text-gray-500 line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 space-x-[40px]">
                  <div className="flex w-auto items-center space-x-2">
                    <CiSquarePlus className="w-4 h-4 cursor-pointer" />
                    <p className="text-[11px]">01</p>
                    <CiSquareMinus className="w-4 h-4 cursor-pointer" />
                  </div>
                  <div className="flex w-auto space-x-[58px]">
                    <p className="text-[11px] font-bold">{product.price} VND</p>
                    <CiEdit className="text-blue-600 w-5 h-5 cursor-pointer" />
                    <CiTrash className="text-red-500 w-5 h-5 cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Hiển thị bảng Users */}
      {activeTab === "users" && (
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-start items-center ml-[85px] py-5 px-20 space-x-[270px] text-gray-600">
            <p>Users</p>
            <div className="flex space-x-[50px] items-center">
              <p>Username</p>
              <p>Full Name</p>
              <p>Email</p>
              <p>Edit</p>
              <p>Delete</p>
            </div>
          </div>

          {isLoadingUsers && (
            <div className="flex justify-center items-center w-full">
              <TailSpin visible={true} height="50" width="50" color="#4fa94d" />
            </div>
          )}

          {users &&
            users.map((user) => (
              <div
                key={user._id}
                className="w-auto h-auto flex items-start px-20 py-5 space-x-[85px] border-t border-gray-300"
              >
                <div className="flex flex-col items-start space-y-2">
                  <p>{user.username}</p>
                  <p>{user.fullName}</p>
                  <p>{user.email}</p>
                </div>
                <div className="flex justify-between items-center py-5 space-x-[40px]">
                  <CiEdit className="text-blue-600 w-5 h-5 cursor-pointer" />
                  <CiTrash className="text-red-500 w-5 h-5 cursor-pointer" />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
