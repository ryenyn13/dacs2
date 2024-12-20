import React from 'react'
import Products from "./element/Products"
import Navbar from "../common/Navbar"
import Footer from "../common/Footer"

const ProductsLayout = () => {
  return (
    <section className="bg-white">
        <div className="px-24">
            <Navbar />
        </div>
        <div className="mt-[30px] mb-[30px]">
            <Products />
        </div>
        <div className="">
            <Footer/>
        </div>

    </section>
  )
}

export default ProductsLayout
