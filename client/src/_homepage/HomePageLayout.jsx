import React from "react";
import {
  Navbar, 
  Hero,
  BestSellers,
  Footer
} from "./element";
import About from "../_about/element/About";


const HomePageLayout = () => {
  return (
    <section className="bg-white ">
      <div className="px-24">
        <Navbar />
      </div>
      <div className="">
        <Hero />
      </div>
      <div className=" px-24 pb-10">
        <BestSellers />
      </div>
      <div className=" mb-10">
        <About />
      </div>
      <div className="">
        <Footer />
      </div>
    </section>
  );
};

export default HomePageLayout;
