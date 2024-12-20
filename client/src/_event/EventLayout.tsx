import React from 'react'
import Navbar from "../common/Navbar"
import Footer from "../common/Footer"
import Event from "./element/Event"
const EventLayout = () => {
  return (
    <section className="bg-white">
    <div className="px-24">
        <Navbar />
    </div>
    <div className="mt-[30px] mb-[30px]">
        <Event/>
    </div>
    <div className="">
        <Footer/>
    </div>

</section>
  )
}

export default EventLayout
