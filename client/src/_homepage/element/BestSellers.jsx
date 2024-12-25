import React from "react";
import vou1 from "../../assets/voucher/vou1.png";
import TiramisuNoBg from "../../assets/bestseller/TiramisuNoBg.png";
import MatchaCakeNoBg from "../../assets/bestseller/MatchaNoBg.png";
import RollNoBg from "../../assets/bestseller/RollNoBg.png";
import RedvelvetNoBg from "../../assets/bestseller/RedvelvetNoBg.png";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { useRef } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { useState } from "react";

const BestSellers = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Lưu index của ô đang được chọn

  const cakes = [
    {
      id: 1,
      name: "Tiramisu",
      description:
        "Tiramisu is a classic Italian dessert made with soft ladyfingers soaked in rich espresso, layered with creamy mascarpone cheese and topped with a dusting of cocoa powder. It offers a perfect balance of sweetness and bold coffee flavor.",
      image: TiramisuNoBg,
      width: "150px",
      height: "145px",
    },
    {
      id: 2,
      name: "Matcha Cake",
      description:
        "Matcha Cake features soft, fluffy layers infused with premium green tea powder, combined with sweet red bean paste and fresh cream. Topped with a fresh strawberry and chocolate decorations, it’s a refreshing treat for matcha lovers.",
      image: MatchaCakeNoBg,
      width: "150px",
      height: "140px",
    },
    {
      id: 3,
      name: "Americano Roll",
      description:
        "The Americano Roll is a soft and spongy cake roll filled with creamy caramel-flavored filling, inspired by the rich and bold taste of Americano coffee. It’s a delightful dessert for any occasion.",
      image: RollNoBg,
      width: "150px",
      height: "140px",
    },
    {
      id: 4,
      name: "Red Velvet",
      description:
        "Red Velvet is a visually stunning cake with vibrant red layers, velvety texture, and a hint of cocoa flavor. It’s paired with smooth cream cheese frosting, creating a perfect balance of sweetness and tanginess.",
      image: RedvelvetNoBg,
      width: "135px",
      height: "140px",
    },
  ];

  const scrollLeft = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
    else {
      setActiveIndex(4);
    }
  };

  const scrollRight = () => {
    if (activeIndex < cakes.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };
  return (
    <section className="bg-white flex w-ful flex-col mt-20">
      <div className="flex w-full justify-between text-black text-2xl font-semibold items-center">
        <p>
          Check Out Our
          <span className="ml-2 text-red-800">Best Sellers</span>
        </p>
        <div className="flex flex-col justify-center items-center text-2xl">
          <p className="text-[#65594C]">"What do you want?"</p>
          <p className="text-[#65594C]">
            "Just cake. Sweet and soft - like my soul."
          </p>
        </div>
      </div>
      <div className="mt-[120px] flex mx-auto w-full ml-[80px] space-x-4 relative">
        <button
          className="absolute mt-[130px] -left-[70px] z-10 w-[30px] scale-[2] text-black pl-3"
          onClick={scrollLeft}
        >
          <HiOutlineChevronLeft />
        </button>

        {cakes.map((cake, index) => (
          <div
            key={cake.id}
            className={`w-[205px] h-[260px] rounded-xl drop-shadow-md hover:drop-shadow-md  transition-all duration-300 ${
              activeIndex === index
                ? "bg-[#41759B]  text-white z-10"
                : "bg-[#D9D9D9] text-[#393129] z-0"
            }`}
            style={{
              transformOrigin: "center",
              transform: `
           scale(${activeIndex === index ? 1.25 : 1}) 
           translateX(${
             activeIndex > index ? "-25px" : activeIndex < index ? "25px" : "0"
           })`,
            }}
          >
            <div className="px-5 flex flex-col items-center">
              <img
                src={cake.image}
                alt={cake.name}
                style={{
                  width: cake.width,
                  height: cake.height,
                  objectFit: "cover",
                }}
                className="flex w-full -mt-[50px] mx-auto "
              />
              <p className="flex  mt-3 text-[18px] font-medium text-center">
                {cake.name}
              </p>
              <p className="text-[9px]  font-thin mt-2">{cake.description}</p>
              <p className="flex w-full justify-end mr-3 text-[9px]  font-semibold mt-2">
                See more
              </p>
            </div>
          </div>
        ))}

        <button
          className="absolute mt-[130px] right-[90px] z-10 w-[30px] scale-[2] text-black"
          onClick={scrollRight}
        >
          <HiOutlineChevronRight />
        </button>
      </div>

      <div class=" w-full h-[450px] mt-[130px] mb-20 items-center">
        <img src={vou1} className="w-full h-full" />
      </div>
      {/* <div className="flex w-full bg-[#F5F5F5]">
        <div className="flex w-full mt-16 flex-col">
          <p className="ml-20 text-black text-left text-2xl font-semibold">
            Feature Sales
          </p>
          <div className="flex justify-center space-x-10 ml-10 ">
            <div>
              <div className="bg-[#F3D5D0] w-[450px] h-[100px] flex py-25 space-y-3 space-x-1 mt-10 mb-2 rounded-[10px]">
                <div className="px-3 flex space-x-4">
                  <img
                    src="https://placehold.co/50x60"
                    className="mt-3 flex my-auto items-start "
                  ></img>
                  <div className="w-full flex  flex-col">
                    <p className="pt-3 mx-2 text-xs font-bold text-black">
                      vvvv
                    </p>
                    <p className=" text-[7px] w-full">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eligendi non eaque delectus, quaerat maxime reiciendis
                      voluptatum debitis nemo corporis nesciunt, sequi obcaecati
                      iusto aperiam illo deleniti laboriosam necessitatibus eos
                      et.
                    </p>
                    <div className="flex  mt-3 justify-between">
                      <p className="text-[11px] mt-2 mx-2">13.000VND</p>
                      <button className="flex mt-2 mx-4 border-[0.9px] border-white bg-red-500 text-white text-[8px] py-1 px-3 rounded-2xl">
                        Add to carts
                      </button>
                    </div>
                  </div>
                  s
                </div>
              </div>

              <div className="bg-[#F3D5D0] w-[450px] h-[100px] flex py-25 space-y-3 space-x-1 mt-5 mb-2 rounded-[10px]">
                <div className="px-3 flex space-x-3">
                  <img
                    src="https://placehold.co/50x60"
                    className="mt-3 flex my-auto items-start "
                  ></img>
                  <div className="w-full flex  flex-col">
                    <p className="pt-3 mx-2 text-xs font-bold text-black">
                      vvvv
                    </p>
                    <p className="text-[5px] ">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eligendi non eaque delectus, quaerat maxime reiciendis
                      voluptatum debitis nemo corporis nesciunt, sequi obcaecati
                      iusto aperiam illo deleniti laboriosam necessitatibus eos
                      et.
                    </p>
                    <div className="flex w-full justify-between">
                      <p className="text-[8px] mt-1 mx-2">13.000VND</p>
                      <button className="flex mt-1 mx-4 border-[0.9px] border-white bg-red-500 text-white text-[5px] py-0.5 px-2 rounded-2xl">
                        Add to carts
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className=" mr-4 mt-3 text-black text-right text-[10px] font-semibold">
                See all
              </p>
              <div className="bg-[#F3D5D0] w-[450px] h-[100px] flex py-25 space-y-3 space-x-1 mt-3 mb-2 rounded-[10px]">
                <div className="px-3 flex space-x-3">
                  <img
                    src="https://placehold.co/50x60"
                    className="mt-3 flex my-auto items-start "
                  ></img>
                  <div className="w-full flex  flex-col">
                    <p className="pt-3 mx-2 text-xs font-bold text-black">
                      vvvv
                    </p>
                    <p className="text-[5px] ">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eligendi non eaque delectus, quaerat maxime reiciendis
                      voluptatum debitis nemo corporis nesciunt, sequi obcaecati
                      iusto aperiam illo deleniti laboriosam necessitatibus eos
                      et.
                    </p>
                    <div className="flex w-full justify-between">
                      <p className="text-[8px] mt-1 mx-2">13.000VND</p>
                      <button className="flex mt-1 mx-4 border-[0.9px] border-white bg-red-500 text-white text-[5px] py-0.5 px-2 rounded-2xl">
                        Add to carts
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#F3D5D0] w-[450px] h-[100px] flex py-25 space-y-3 -space-x-1 mt-5 mb-2 rounded-[10px]">
                <div className="px-3 flex  space-x-3">
                  <img
                    src="https://placehold.co/50x60"
                    className="mt-3 flex my-auto items-start "
                  ></img>
                  <div className="w-full flex flex-col">
                    <p className="pt-3 mx-2 text-xs font-bold text-black">
                      vvvv
                    </p>
                    <p className="text-[5px] ">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eligendi non eaque delectus, quaerat maxime reiciendis
                      voluptatum debitis nemo corporis nesciunt, sequi obcaecati
                      iusto aperiam illo deleniti laboriosam necessitatibus eos
                      et.
                    </p>
                    <div className="flex w-full justify-between">
                      <p className="text-[8px] mt-1 mx-2">13.000VND</p>
                      <button className="flex mt-1 mx-4 border-[0.9px] border-white bg-red-500 text-white text-[5px] py-0.5 px-2 rounded-2xl">
                        Add to carts
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="mt-16 mr-10">
            <p className=" ml-5 text-black text-left text-xl font-semibold">
              Carts
            </p>
            <p className=" mr-4 pb-3 text-gray-500 text-right text-[10px] font-semibold">
              Details
            </p> */}

        {/* <div className=" w-[250px] h-[150px] flex ">
                <div className=" flex">
                  <img
                    src="https://placehold.co/50x50"
                    className="px-5 py-1 flex my-auto items-start "
                  ></img>
                  <div className="w-full flex  flex-col">
                    <p className="pt-3 pb-2 text-xs font-bold text-black">
                      Straberry cake
                    </p>
                    <div className="flex w-full">
                      <CiSquarePlus className="w-4 h-4" />
                      <p className="text-[11px] py-auto px-3 ">01</p>
                      <CiSquareMinus className="w-4 h-4" />
                    </div>
                    <p className="pt-2 text-[10px] font-bold">
                      10.000VND
                      </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-black"></div>

              <div className=" w-[250px] h-[150px] flex mr-10 pt-25 space-y-3 space-x-1">
                <div className=" flex space-x-3">
                  <img
                    src="https://placehold.co/50x50"
                    className="px-4 py-1 flex my-auto items-start "
                  ></img>
                  <div className="w-full flex  flex-col">
                    <p className="pt-3 pb-2 text-xs font-bold text-black">
                      Straberry cake
                    </p>
                    <div className="flex w-full">
                      <CiSquarePlus className="w-4 h-4" />
                      <p className="text-[11px] py-auto px-3 ">01</p>
                      <CiSquareMinus className="w-4 h-4" />
                    </div>
                    <p className=" pt-2 text-[10px] font-bold">10.000VND</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#EF5F78] w-[250px] h-[30px] flex py-25 space-y-3 space-x-1 mt-3 mb-2 rounded-xl">
              <div className="flex w-full justify-center">
                <p className=" pt-1.5 px-2 text-white text-xs font-bold">
                  20.000VND
                </p>
                <p className="flex  py-2.5 px-2 text-white text-[7px]">
                  Get pay
                </p>
             
          </div> */}
        {/* </div> */}
        {/* </div> */}
      {/* </div> */}
    </section>
  );
};

export default BestSellers;
