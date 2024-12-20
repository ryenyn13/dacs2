import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";

const Chiu = () => {
  return (
    <section className="bg-white h-[80px] border border-t-green-600 flex px-24">
        <div className="flex w-full justify-between items-center">
            <div className="flex">
              <img src="https://placehold.co/120x70" className="flex my-auto" />
            </div>
            <div className="flex space-x-5">
                <ul className="li">
                    Trang chu
                </ul>
                <div className="li">
                    <select>
                        <option>
                            Kho sach 
                        </option>
                        <option>
                            HEHE
                        </option>
                    </select>
                </div>
                <ul className="li">
                    The loai 
                </ul>
                <ul className="li">
                    Tin tuc 
                </ul>
                <ul className="li">
                    Lien he
                </ul>
            </div>
            <div className="flex space-x-4 items-center">
                <CiSearch className="w-6 h-6"/>
                <FaShoppingCart className="w-6 h-6"/>
                <button className="bg-green-500 text-black text-[15px] p-2 rounded-md">
                    Dang nhap
                </button>
            </div>
        </div>
    </section>
  )
};

export default Chiu;
