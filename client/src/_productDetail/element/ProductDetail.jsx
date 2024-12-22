import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { PiMinusSquareLight } from "react-icons/pi";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { useQuery, useMutation } from "@tanstack/react-query"; 
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {TailSpin} from 'react-loader-spinner'
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { GoChevronRight } from "react-icons/go";


const ProductDetail = () => {
    const ID = useParams();
    const cakeId = ID.id;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const thumbnailRef = useRef(null);

    const { data: cake, isLoading, refetch, isRefetching, } = useQuery({
      queryKey: ["cake", cakeId],
      queryFn: async () => {
        try {
          const response = await fetch(`/api/cake/getCake/${cakeId}`);
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

    const { mutate: addToCart, isPending: isAddingToCart } = useMutation({
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
        // setTimeout(() => { setLoadingProductId (null) });
      },
      onError: (error) => {
        // TODO
        toast.error("Item already in cart", {
          duration: 2000,
        });
        // setTimeout(() => { setLoadingProductId (null) });
      },
    });

    const handleAddToCart = () => {
      addToCart(cakeId);
    };

    const handleThumbnailClick = (image) => {
      setSelectedImage(image);
    };

    const handleImageClick = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const scrollLeft = () => {
      if (thumbnailRef.current) {
        thumbnailRef.current.scrollBy({
          top: 0,
          left: -300,
          behavior: "smooth",
        });
        console.log("ok");
      }
    };

    const scrollRight = () => {
      if (thumbnailRef.current) {
        thumbnailRef.current.scrollBy({
          top: 0,
          left: 300,
          behavior: "smooth",
        });
        console.log("ok");
      }
    };

    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
      setQuantity((prev) => Math.max(1, prev - 1));
    };

    const increaseQuantity = () => {
      setQuantity((prev) => (prev + 1));
    };

    const [selectedImage, setSelectedImage] = useState(cake?.images[0]);

    useEffect(() => {
      if (cake && cake.images && cake.images.length > 0) {
        setSelectedImage(cake.images[0]);
      }
    }, [cake]);

    return (
      <section className="bg-gray-100 flex flex-col h-auto px-20 py-30 w-full mb-10">
        {isLoading && (
          <div className="w-full justify-center items-center flex">
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
        {cake && (
          <div key={cake._id} className="bg-white w-full h-auto flex  ">
            <div className="bg-white w-[520px] h-[520px] flex flex-col mt-10 mb-20">
              <div className="w-full h-[80%] ml-10 p-2 flex justify-center items-center my-auto">
                <div
                  className="bg-cover bg-center w-[470px] h-[470px] mt-[70px] object-cover cursor-pointer "
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                  }}
                  onClick={handleImageClick}
                ></div>
              </div>
              <div className="w-[540px] h-auto ml-1 p-4 flex items-center justify-center relative px-5 pb-6">
                <button
                  className="absolute mt-[60px] left-10 z-10 w-[30px] scale-[2] text-black pl-3"
                  onClick={scrollLeft}
                >
                  <HiOutlineChevronLeft />
                </button>
                <div
                  className="flex overflow-hidden mt-[60px] ml-[60px] space-x-3"
                  ref={thumbnailRef}
                >
                  {cake.images.map((image, index) => (
                    <div
                      key={index}
                      className="flex w-[100px] h-[100px]  md:w-[100px] md:h-[100px] object-cover cursor-pointer flex-shrink-0"
                      onClick={() => handleThumbnailClick(image)}
                    >
                      <figure className="hover01">
                        <img
                          src={image}
                          alt=""
                          className="w-[100px] h-[100px]  object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </figure>
                    </div>
                  ))}
                </div>
                <button
                  className="absolute mt-[60px] -right-[20px] z-10 w-[30px] scale-[2] text-black"
                  onClick={scrollRight}
                >
                  <HiOutlineChevronRight />
                </button>
              </div>
              {/* Modal phóng to ảnh */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                  <div className="relative">
                    <button
                      className="absolute top-0 right-0 m-4 text-white shadow-xl text-3xl font-bold"
                      onClick={closeModal}
                    >
                      &times;
                    </button>
                    <img
                      src={selectedImage}
                      alt=""
                      className="w-[700px] h-[570px] object-cover bg-center rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className=" mt-[90px] ml-10 px-20 flex flex-col items-start space-y-10">
              <p className="text-[15px] text-[#65594C] -mb-7  font-thin">
                Mousse
              </p>
              <p className=" text-[20px] font-bold text-black">
                {cake.cakeName}
              </p>
              <p className="text-[15px] text-[#65594C] font-thin mt-3">
                {cake.description}
              </p>

              <p className="flex text-[20px]  font-bold">{cake.price} VND</p>
              <p className="flex text-[15px]  font-semibold">
                Availability: {cake.quantity} In Stock
              </p>

              <div className=" flex items-center  space-x-[70px]">
                <div className="flex text-gray-500 space-x-4 items-center">
                  <AiOutlineMinusSquare
                    className="w-6 h-6 text-black cursor-pointer"
                    onClick={decreaseQuantity}
                  />
                  <p className="text-md">{quantity}</p>
                  <AiOutlinePlusSquare
                    className="w-6 h-6 text-black cursor-pointer"
                    onClick={increaseQuantity}
                  />
                </div>
                
                <button
                  className="flex bg-gray-500 text-white px-3 py-2 rounded-sm shadow hover:bg-gray-600 transition"
                  onClick={() => handleAddToCart}
                >
                  Add to Cart
                </button>
                
              </div>
            </div>
          </div>
        )}
        {/* <p className=" mt-10 px-10 flex justify-center text-[15px] font-semibold text-gray-800 text-center ">
          Also you may like
        </p>
        <div className="mt-1 flex justify-center  w-full space-x-5">
          <Link to="/productdetail">
            <div className=" w-[220px] h-auto">
              <div className="w-full flex flex-col items-center mb-4">
                <img
                  src="https://placehold.co/200x220"
                  className="mt-7 flex px-[2px]"
                ></img>
                <p className="flex items mt-[10px] text-[15px] font-bold text-[#65594C]">
                  TIRAMISU
                </p>
                <p className="flex text-[11px] text-[#65594C] font-thin mt-[5px] ">
                  20.000 VND
                </p>
              </div>
            </div>
          </Link>
        </div> */}
      </section>
    );
};

export default ProductDetail;
