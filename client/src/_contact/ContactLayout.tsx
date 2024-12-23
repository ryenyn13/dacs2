import React from 'react'
import Navbar from "../common/Navbar"
import Contact from "./element/Contact"
import Footer from "../common/Footer"
const ContactLayout = () => {
  return (
    <section className="bg-white">
    <div className="px-24">
        <Navbar />
    </div>
    <div className="mt-[30px] mb-[30px]">
        <Contact/>
    </div>
    <div className="-mt-[65px]">
        <Footer/>
    </div>
    /</section>
  )
}

export default ContactLayout
