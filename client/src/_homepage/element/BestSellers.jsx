import React from "react";
import vou1 from "../../assets/voucher/vou1.png";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

const BestSellers = () => {
 
  return (
    <section className="bg-white flex w-ful flex-col mt-10">
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
      <div className="mt-16 flex mx-auto w-full space-x-10">
        <div className="bg-[#41759B] w-[250px] h-[300px] rounded-xl">
          <div className="px-5 flex flex-col items-start">
            <img
              src="https://placehold.co/150x60"
              className="mt-5 flex my-auto px-5"
            ></img>
            <p className="mt-5 text-2xl font-bold text-white">Tiramisu</p>
            <p className="text-[13px] text-gray-300 font-thin mt-2">
              Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem
              ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum
            </p>
            <div className="flex w-full justify-between text-white text-[14px] mt-1">
              <p className="font-thin">20 ML</p>
              <p className="font-bold mt-1">IDK 25k</p>
            </div>
          </div>
        </div>

        <div className="bg-[#D9D9D9] w-[200px] h-[250px] rounded-xl mt-8">
          <div className="px-5 flex flex-col items-start">
            <p className="mt-7 text-2xl font-bold text-[#65594C]">Tiramisu</p>
            <p className="text-[13px] text-[#65594C] font-thin mt-2">
              Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem
              ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum
            </p>
            <div className="flex w-full justify-between text-white text-[14px] mt-5">
              <p className="font-thin">20 ML</p>
              <p className="font-bold mt-7">IDK 25k</p>
            </div>
          </div>
        </div>

        <div className="bg-[#D9D9D9] w-[200px] h-[250px] rounded-xl mt-8">
          <div className="px-5 flex flex-col items-start">
            <p className="mt-7 text-2xl font-bold text-[#65594C]">Tiramisu</p>
            <p className="text-[13px] text-[#65594C] font-thin mt-2">
              Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem
              ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum
            </p>
            <div className="flex w-full justify-between text-white text-[14px] mt-5">
              <p className="font-thin">20 ML</p>
              <p className="font-bold mt-10">IDK 25k</p>
            </div>
          </div>
        </div>
      </div>

      <div class=" w-full h-[450px] mt-20  items-center">
        <img src={vou1} className="w-full h-full" />
      </div>

      <div className="flex w-full bg-[#F5F5F5]">
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
            <div></div>
          </div>
        </div>

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
      </div>
    </section>
  );
};

export default BestSellers;
