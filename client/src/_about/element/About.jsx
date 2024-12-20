import React from "react";
import abcontact from "../../assets/about/abcontact.png";
import imgab from "../../assets/about/imgab.png";
import abvienduoi1 from "../../assets/about/abvienduoi1.png";
import abvientren from "../../assets/about/abvientren.png";
import deckem from "../../assets/about/deckem.png";
import bake from "../../assets/about/bake.png";
import {Link} from "react-router-dom"
const About = () => {
  return (
    <section className="">
      <div className="h-[600px]">
        <div>
          <div className="flex justify-center items-center">
            <div className="absolute -mt-10 bg-[#8f6c00] text-white text-[20px] font-bold px-10 py-[1px] rounded-[20px] shadow-lg">
              About us
            </div>
            <img src={abvientren} className="[h-50px] object-cover" />
          </div>
        </div>
        <div className=" bg-[#f0ece3] flex justify-center  space-x-20 px-10 ">
          <div className="flex flex-col w-[500px] h-auto space-y-5">
            <div className=" text-[40px] font-bold text-[#8f6c00] mt-[20px] ">
              <p className="">Food you love,</p>
              <p className="">delivered to you</p>
            </div>
            <p className="">
              We use quality materials that we get directly from farmers. our
              backers are experienced people in the food sector. So that the
              products we produce are guaranteed quality and taste. It's so
              delicious, you have to try it!
            </p>

            <button className=" bg-opacity-65 backdrop-blur-md bg-[#8f6c00] w-[150px] text-[15px] text-white font-serif px-3 py-2 rounded-3xl shadow hover:bg-[#D3B457] transition">
             Explore Menu
            </button>
          </div>
          <img
            src={imgab}
            className=" w-[250px] h-[400px] rounded-3xl -mt-[60px]"
          />
        </div>
        <img src={abvienduoi1} className="  h-[100px] w-full object-cover" />
      </div>
      <div className="bg-white ">
        <div className="flex  justify-center space-x-20 px-10">
          <img src={bake} className=" w-[400px] h-[300px] rounded-3xl mt-20" />
          <div className="flex flex-col w-[500px] h-[400px] space-y-5 mt-[100px]">
            <div className=" text-[40px] font-bold">
              <p className=""> We Bake with Love </p>
              <p className="text-[35px] px-2">Fresh from the oven</p>
            </div>
            <p>
              Every pastry is made with care, using only the freshest
              ingredients to bring you the perfect balance of taste and quality.
              Our bakers combine skill and passion to create treats that look as
              good as they taste. Discover the joy of freshly baked delights
              today!
            </p>
          </div>
        </div>
        <div className="flex  justify-center space-x-20 px-10 -mt-10">
          <div className="flex flex-col w-[500px] h-[500px] space-y-5">
            <div className=" text-[40px] font-bold mt-20">
              <p className=""> We Craft for You </p>
              <p className="text-[35px]">Delicious Handmade Treats</p>
            </div>
            <p>
              We put our heart into every detail, using the freshest ingredients
              to create pastries that delight your taste buds. Our skilled
              bakers bring passion and precision to every creation, ensuring
              every bite is as beautiful as it is flavorful. Experience the joy
              of artisan baking today!
            </p>
          </div>
          <img
            src={deckem}
            className=" w-[400px] h-[300px] rounded-3xl mt-[50px]"
          />
        </div>
      </div>

      <div className="relative h-[450px] flex items-center justify-center ">
        <img src={abcontact} className="h-[450px] w-full object-cover" />
        <div className="flex flex-col absolute space-y-10">
          <div className=" text-[#8f6c00] font-bold text-[25px] ">
            Want To Know More About Us?
          </div>
          <Link to="/contact">
          <button className=" bg-[#D3B457] text-white text-[25px] font-bold px-10 py-5 ml-[80px] rounded-[100px] shadow-lg">
            Contact us
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
