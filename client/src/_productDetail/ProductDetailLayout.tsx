import React from 'react'
import ProductDetail from './element/ProductDetail'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'

const ProductDetailLayout = () => {
  return (
    <section className="bg-white">
        <div className="px-24">
            <Navbar />
        </div>
        <div className="mt-[30px]">
            <ProductDetail />
        </div>
        <div className="">
            <Footer/>
        </div>

    </section>
  )
}

export default ProductDetailLayout
