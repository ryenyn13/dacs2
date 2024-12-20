import React from 'react'
import Navbar from "../common/Navbar"
import Footer from "../common/Footer"
import Cart from "../_cart/element/Cart"

const CartLayout = () => {
  return (
    <section className="bg-white">
        <div className="px-24">
            <Navbar />
        </div>
        <div className="mt-[30px]">
            <Cart/>
        </div>
        <div className="">
            <Footer/>
        </div>
    </section>
  )
}

export default CartLayout
