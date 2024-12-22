import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import cart_background from "../../assets/background/cart_background.png";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import QuantityCounter from "@/utils/QuantityCounter";
// import { toast, Toaster } from "react-hot-toast";
const Cart = () => {
  // const queryClient = useQueryClient();

  // const [deletingItems, setDeletingItems] = useState({

  // })({});

  // const [cartInfo, setCartInfo] = useState({ items: [], total: 0 });

  // const { data: cart, isLoading, refetch, isRefetching, } = useQuery({
  // 	queryKey: ["cart"],
  // 	queryFn: async () => {
  // 		try {
  // 			const response = await fetch("/api/user/cart");
  // 			const data = await response.json();

  // 			if (!response.ok) {
  // 				throw new Error(data.error || "Something went wrong!");
  // 			}

  // 			return data;
  // 		} catch (error) {
  // 			throw new Error(error);
  // 		}
  // 	},
  // });

  // const { mutate: deleteItem, isPending: isDeleting } = useMutation({
  // 	mutationFn: async ({ item_id }) => {
  // 		try {
  // 			const res = await fetch(`/api/user/delete/cart/${item_id}`, {
  // 				method: "DELETE",
  // 				headers: {
  // 					"Content-Type": "application/json",
  // 				},
  // 			});
  // 			const data = await res.json();

  // 			if (!res.ok) {
  // 				throw new Error(data.error || "Something went wrong");
  // 			}

  // 			return data;
  // 		} catch (error) {
  // 			throw new Error(error);
  // 		}
  // 	},
  // 	onSuccess: (data, variables) => {
  // 		toast.success("Car removed successfully");
  // 		// invalidate the query to refetch the data
  // 		setDeletingItems((prev) => ({
  // 			...prev,
  // 			[variables.item_id]: false,
  // 		}));
  // 		queryClient.invalidateQueries({ queryKey: ["cart"] });
  // 	},
  // 	onError: (error, variables) => {
  // 		setDeletingItems((prev) => ({
  // 			...prev,
  // 			[variables.item_id]: false,
  // 		}));
  // 		toast.error("Failed to remove item");
  // 	},
  // });
  // const handleDelete = async (itemId) => {
  // 	setDeletingItems((prev) => ({ ...prev, [itemId]: true }));
  // 	deleteItem({ item_id: itemId });
  // };
  // const [checkedItems, setCheckedItems] = useState({});

  // const handleClick = (itemId) => {
  // 	setCheckedItems((prevCheckedItems) => ({
  // 		...prevCheckedItems,
  // 		[itemId]: !prevCheckedItems[itemId], // Đảo ngược trạng thái của từng item
  // 	}));
  // };

  // const calculateTotalPrice = () => {
  // 	if (!cart) return 0;
  // 	return cart
  // 		.reduce((total, item) => {
  // 			const itemTotal =
  // 				Number(item.price.replace(/,/g, "")) *
  // 				(quantities[item._id] || 1);
  // 			return total + itemTotal;
  // 		}, 0)
  // 		.toLocaleString();
  // };

  // const [quantities, setQuantities] = useState({});

  // const increaseQuantity = (item) => {
  // 	setQuantities((prevQuantities) => ({
  // 		...prevQuantities,
  // 		[item._id]: (prevQuantities[item._id] || 1) + 1,
  // 	}));
  // };

  // const decreaseQuantity = (item) => {
  // 	setQuantities((prevQuantities) => ({
  // 		...prevQuantities,
  // 		[item._id]: Math.max((prevQuantities[item._id] || 1) - 1, 1),
  // 	}));
  // };

  const [isOpenPay, setIsOpenPay] = useState(false);
  const handleOpenPay = () => {
    setIsOpenPay(true);
  };
  const handleClosePay = () => setIsOpenPay(false);

  const [isOpenGmailCode, setIsOpenGmailCode] = useState(false);
  const handleOpenGmailCode = () => {
    setIsOpenGmailCode(true);
  };
  const handleClosenGmailCode = () => setIsOpenGmailCode(false);
  return (
    <section className="w-full h-full">
      <div
        className="w-full bg-cover bg-center h-screen flex justify-center items-center bg-opacity-65 backdrop-blur-md"
        style={{ backgroundImage: `url(${cart_background})` }}
      >
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
        <div className="bg-white w-[900px] h-auto flex rounded-[13px] my-10 shadow-md">
          <div className=" w-[600px] h-auto rounded-s-[13px] shadow-md items-start">
            <p className="mt-5 ml-6 text-[20px] font-bold text-black">
              Shopping Cart
            </p>
            <div className="flex justify-center items-center py-5">
              <div className="w-[80%] border-t border-black"></div>
            </div>
            <div className="space-y-10 mb-10">
              <div className="flex w-full justify-between items-center  text-gray-600">
                <div className="flex items-start px-10">
                  <p>PRODUCT DETAILS</p>
                </div>

                <div className="px-10 flex space-x-10 items-center">
                  <p>QUANTITY</p>
                  <p>PRICE</p>
                  <p>TOTAL</p>
                </div>
              </div>
              <div className="flex flex-col w-full space-y-10">
                <div className=" w-[250px] h-auto flex items-center space-x-[165px]">
                  <div className="flex justify-between px-10 space-x-5">
                    <img
                      src="https://placehold.co/60x60"
                      className=" flex items-start "
                    ></img>

                    <div className="flex flex-col items-start space-y-2">
                      <p>Tiramisu</p>
                      <div>
                        <p className="flex items-center text-[10px] text-gray-500">
                          Remove
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" flex justify-between items-center space-x-10">
                    <div className="flex w-full space-x-2">
                      <CiSquarePlus className="w-4 h-4" />
                      <p className="text-[11px]  ">01</p>
                      <CiSquareMinus className="w-4 h-4" />
                    </div>
                    <div className=" flex justify-between  space-x-[30px]">
                      <p className=" text-[10px] font-bold">30.000VND</p>
                      <p className=" text-[10px] font-bold ">30.000VND</p>
                    </div>
                  </div>
                </div>
                <div className=" w-[250px] h-auto flex items-center space-x-[165px]">
                  <div className="flex justify-between px-10 space-x-5">
                    <img
                      src="https://placehold.co/60x60"
                      className=" flex items-start "
                    ></img>

                    <div className="flex flex-col items-start space-y-2">
                      <p>Straberry Cake</p>
                      <p className="flex items-center text-[10px] text-gray-500">
                        Remove
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-between items-center space-x-10">
                    <div className="flex w-full  space-x-2">
                      <CiSquarePlus className="w-4 h-4" />
                      <p className="text-[11px]  ">01</p>
                      <CiSquareMinus className="w-4 h-4" />
                    </div>
                    <div className=" flex justify-between  space-x-[30px]">
                      <p className=" text-[10px] font-bold">20.000VND</p>
                      <p className=" text-[10px] font-bold ">20.000VND</p>
                    </div>
                  </div>
                </div>
                <div className=" w-[250px] h-auto flex autoflex items-center space-x-[165px]">
                  <div className="flex justify-between px-10 space-x-5">
                    <img
                      src="https://placehold.co/60x60"
                      className=" flex items-start "
                    ></img>

                    <div className="flex flex-col items-start space-y-2">
                      <p>Matcha cake</p>
                      <p className="flex items-center text-[10px] text-gray-500">
                        Remove
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-between items-center space-x-10">
                    <div className="flex w-full  space-x-2">
                      <CiSquarePlus className="w-4 h-4" />
                      <p className="text-[11px]  ">01</p>
                      <CiSquareMinus className="w-4 h-4" />
                    </div>
                    <div className=" flex justify-between  space-x-[30px]">
                      <p className=" text-[10px] font-bold">30.000VND</p>
                      <p className=" text-[10px] font-bold ">30.000VND</p>
                    </div>
                  </div>
                </div>
                <Link to="/products">
                  <div className="flex justify-start items-center px-5 text-[15px] text-blue-600">
                    <IoIosArrowRoundBack className="w-7 h-7 " />

                    <p>Continute Shopping</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 w-[300px] h-auto  rounded-e-[13px] shadow-md items-start">
            <p className="mt-5 ml-6 text-[20px] font-bold text-black">
              Order Sumary
            </p>
            <div className="flex justify-center items-center py-6">
              <div className="w-[80%] border-t border-black"></div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-5 ">
              <div className="flex mt-3 text-sm font-medium text-gray-700 mb-1 space-x-[70px]">
                <p className="-ml-8 text-[15px] ">Subtotal</p>
                <p>900.000VND</p>
              </div>
              <div className="font-semibold -mt-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Shipping
                </label>
                <input
                  type="text"
                  id="shipping"
                  name="shipping"
                  placeholder="Free Shipping"
                  className="w-80% px-4 py-1 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0.5 focus:ring-[#41759B] focus:border-[#6aacdc]"
                  required
                />
                <p className="text-[10px] text-gray-500">
                  Congrat you're eligible for free shipping
                </p>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Coupon code
                </label>
                <input
                  type="text"
                  id="coupon"
                  name="coupon"
                  placeholder="Enter your coupon code"
                  className="w-80% px-4 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0.5 focus:ring-[#41759B] focus:border-[#6aacdc]"
                  required
                />
                <div className="flex justify-end items-end space-x-3 py-2">
                  <button className="flex justify-center items-center border border-gray-300 py-1 px-3">
                    Apply
                  </button>
                </div>
              </div>
              <div className="w-[80%] border-t border-black"></div>
              <div className="flex text-lg font-medium text-gray-700 py-3 space-x-[70px]">
                <p className=" -ml-6 ">Total</p>
                <p>90.000VND</p>
              </div>

              <button
                onClick={handleOpenPay}
                className=" flex justify-center items-center bg-black text-white py-3 px-10"
              >
                CHECKOUT
              </button>
              {isOpenPay && (
                <div className="fixed -inset-11 bg-white bg-opacity-60 flex items-center justify-center z-50">
                  <div
                    className="w-[500px] bg-white border -mt-[250px] border-gray-300 rounded-xl shadow-lg p-8
                            max-h-[650px] overflow-y-auto [&::-webkit-scrollbar]:w-1 
                            [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
                            [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500
                           dark:[&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-thumb]:bg-neutral-100"
                  >
                    <div className="flex justify-end -mt-2 -mr-2">
                      <IoClose
                        onClick={handleClosePay}
                        className=" text-black hover:text-red-700 cursor-pointer"
                      ></IoClose>
                    </div>
                    <div className=" flex flex-col justify-center items-center text-[40px]  text-[#41759B] font-bold py-5">
                      <p className="">Billing Information</p>
                      <p
                        onClick={handleOpenGmailCode}
                        className=" mt-5 text-[15px]"
                      >
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
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
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
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Enter your fullname"
                          // onChange={handleInputChange}
                          // value={formData.fullName}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#41759B] focus:border-[#6aacdc]"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          placeholder="Enter your phone number"
                          // onChange={handleInputChange}
                          // value={formData.password}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#41759B] focus:border-[#6aacdc]"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="Address"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          placeholder="Enter your address"
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
                    {/* <Link to="/products">
                                    <div className="flex justify-start items-center px-3 py-5 text-[15px] text-blue-600">
                                      <IoIosArrowRoundBack className="w-7 h-7 " />
                    
                                      <p>Back to Product</p>
                                    </div>
                                  </Link> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
