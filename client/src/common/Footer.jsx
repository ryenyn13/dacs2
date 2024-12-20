import React from "react";
import { Link } from "react-router-dom";
import github from "../assets/icon/github.png";
import facebook from "../assets/icon/facebook.png";
import instagram from "../assets/icon/instagram.png";
import logo from "../assets/logo/logo.png";

const Footer = () => {
  return (
    <section className="bg-gray-300 flex flex-col justify-center items-center">
      <div className=" w-full h-auto flex flex-col py-25 space-y-3 ">
        <div className="flex flex-col items-center ">
          <img
            src={logo}
            className="mt-[20px] flex items-center w-[150px] h-[120px]"
          ></img>
        </div>

        <div className=" flex space-x-10 w-full items-center justify-center mt-3 mb-2 ">
          <Link to="https://github.com/ryenyn13">
            <img src={github} className=" flex h-[30px] w-[30px]"></img>{" "}
          </Link>
          <Link to="https://www.instagram.com/rye.bz135_/">
            <img src={instagram} className=" flex h-[30px] w-[30px]"></img>
          </Link>
          <Link to="https://www.facebook.com/ryenyn.13">
            <img src={facebook} className=" flex h-[30px] w-[30px]"></img>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[30%] border-t border-black"></div>
        </div>
        <div className="flex space-x-10 w-full items-center justify-center mt-3 mb-2 text-black text-[11px]">
          <ul className="li">Privacy</ul>
          <ul className="li">Tems of Use</ul>
          <ul className="li">Home</ul>
          <ul className="li">Event</ul>
          <ul className="li">Contact</ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
