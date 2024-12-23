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
import { toast, Toaster } from "react-hot-toast";

const Cart = () => {
    const queryClient = useQueryClient()
    const [isOpenPay, setIsOpenPay] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [shippingOption, setShippingOption] = useState("1");
    const {data: getAllCart, isLoading: isLoadingCart} = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            try {
                const response = await fetch("/api/user/cart");
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Something went wrong!");
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
    });

    const {mutate: deleteCart} = useMutation({
        mutationFn: async (_id) => {
            try {
                const response = await fetch(`/api/user/delete/cart/${_id}`, {
                    method: "DELETE",
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Something went wrong!");
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Delete item successfully");
            queryClient.invalidateQueries({queryKey: ["cart"]});
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleDelete = (_id) => {
        deleteCart(_id);
    };

    const handleQuantityChange = (_id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [_id]: value,
        }));
    };

    const incrementQuantity = (_id) => {
        setQuantities((prev) => ({
            ...prev,
            [_id]: (prev[_id] || 1) + 1,
        }));
    };

    const decrementQuantity = (_id) => {
        setQuantities((prev) => ({
            ...prev,
            [_id]: Math.max((prev[_id] || 1) - 1, 1), // Prevent negative quantities
        }));
    };

    const calculateSubtotal = () => {
        return getAllCart?.reduce((acc, item) => {
            return acc + (quantities[item._id] || 1) * item.price;
        }, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        return subtotal + (shippingOption === "1" ? 15000 : 0);
    };

    const handleShippingChange = (e) => {
        setShippingOption(e.target.value);
    };


    useEffect(() => {
        if (getAllCart) {
            const initialQuantities = getAllCart.reduce((acc, item) => {
                acc[item._id] = 1; 
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [getAllCart]);

    const [items , setItems] = useState([]);

    const handleOpenPay = () => {
        setIsOpenPay(true);
        const formData = new FormData();

        // Add payment information to FormData
        formData.append('subtotal', calculateSubtotal());
        formData.append('shippingOption', shippingOption);
        formData.append('total', calculateTotal());
        // formData.append('items', JSON.stringify(getAllCart.map(item => ({
        //     name: item.cakeName,
        //     price: item.price,
        //     quantity: quantities[item._id] || 1,
        //     total: item.price * (quantities[item._id] || 1),
        // }))));

        // get all the item and quantity into items
        getAllCart.forEach(item => {
            items.push({
                name: item.cakeName,
                price: item.price,
                quantity: quantities[item._id] || 1,
                total: item.price * (quantities[item._id] || 1),
            })           
        })

        // Submit the FormData to the server or handle it locally
        console.log(items);
    };
    const handleClosePay = () => setIsOpenPay(false);

    const [isOpenGmailCode, setIsOpenGmailCode] = useState(false);
    const handleOpenGmailCode = () => {
        setIsOpenGmailCode(true);
    };
    const handleClosenGmailCode = () => setIsOpenGmailCode(false);
    return (
        <section className="w-full h-full">
            <Toaster position="top-center" reverseOrder={false} />
            <div
                className="w-full bg-cover bg-center h-screen flex justify-center items-center bg-opacity-65 backdrop-blur-md"
                style={{ backgroundImage: `url(${cart_background})` }}
            >
                <div className="bg-white w-[900px] h-[700px] flex rounded-[13px] my-10 shadow-md ">
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
                                    <p>Details</p>
                                </div>

                                <div className="px-10 flex space-x-10 items-center">
                                    <p>Quantity</p>
                                    <p>Price</p>
                                    <p>Total</p>
                                </div>
                            </div>
                            <div className="flex flex-col w-full space-y-10">
                                <div className="w-[250px] h-auto items-center space-y-20">
                                    {getAllCart?.map((item) => (
                                        <>
                                            <div className="flex w-full justify-between px-10 space-x-5">
                                                <img
                                                    src={item.images[0]}
                                                    className=" flex items-start "
                                                ></img>

                                                <div className="flex flex-col items-start space-y-2">
                                                    <p>
                                                        {item.cakeName}
                                                    </p>
                                                    <p className="flex items-center text-[9px] text-gray-500 hover:text-red-500 cursor-pointer" 
                                                        onClick={() => handleDelete(item._id)} 
                                                    >
                                                        Remove
                                                    </p>
                                                </div>

                                                <div className="w-full flex">
                                                    <div className="w-full flex">
                                                        {item.price} VND
                                                    </div>
                                                    <div>
                                                        <button
                                                            onClick={() => decrementQuantity(item._id)}
                                                            className="quantity-btn"
                                                        >
                                                            -
                                                        </button>
                                                        <span>{quantities[item._id] || 1}</span>
                                                        <button
                                                            onClick={() => incrementQuantity(item._id)}
                                                            className="quantity-btn"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div>
                                                        {item.price * (quantities[item._id] || 1)}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}

                                </div>
                                <Link to="/products">
                                    <div className="flex justify-end items-center px-5 text-[12px] text-blue-600">
                                        <IoIosArrowRoundBack className="w-7 h-7 " />
                                        <p>Continute Shopping</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-100 w-[300px] h-auto  rounded-e-[13px] shadow-md items-start">
                        <p className="mt-5 ml-6 text-[20px] font-bold text-black">
                            Summary
                        </p>
                        <div className="flex justify-center items-center py-6">
                            <div className="w-[80%] border-t border-black"></div>
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-5 ">
                            <div className="flex mt-3 text-sm font-medium text-gray-700 mb-1 space-x-[70px]">
                                <p className="-ml-8 text-[15px] ">
                                    Subtotal
                                </p>
                                <p>
                                    {calculateSubtotal()} VND
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                                <label
                                    htmlFor="name"
                                    className="block text-sm text-gray-700"
                                >
                                    Shipping:
                                </label>
                                <select
                                    id="shipping"
                                    name="shipping"
                                    value={shippingOption}
                                    onChange={handleShippingChange}
                                    className="w-[80%] h-auto p-4 bg-transparent text-sm"
                                >
                                    <option value="1">Ship in 1 Hour (15,000 VND)</option>
                                    <option value="2">Ship in 1 Day (FREE)</option>
                                </select>
                            </div>
                            <div className="w-[85%] border-t border-black"></div>
                            <div className="flex text-md font-medium text-gray-700 py-3 w-full justify-between px-12 space-x-10">
                                <p> Total </p>
                                {calculateTotal()} VND
                            </div>

                            <button
                                className="flex w-full justify-center items-center bg-black text-white py-3 px-10 h-[50px] rounded-lg shadow hover:bg-[#6aacdc] transition"
                                onClick={handleOpenPay}
                            >
                                Payment
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
