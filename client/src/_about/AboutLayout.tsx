import React from 'react'
import Navbar from "../common/Navbar"
import Footer from "../common/Footer"
import About from "./element/About"

const AboutLayout = () => {
  return (
    <section className="bg-white">
        <div className="px-24">
            <Navbar />
        </div>
        <div className="mt-[30px] mb-[30px]">
            <About/>
        </div>
        <div className="">
            <Footer/>
        </div>
    </section>
  )
}

export default AboutLayout
