import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import React from "react";
import HomePageLayout from "./_homepage/HomePageLayout";
import ProductsLayout from "./_products/ProductsLayout";
import AboutLayout from "./_about/AboutLayout";
import EventLayout from "./_event/EventLayout";
import ContactLayout from "./_contact/ContactLayout";
import SignUpLayout from "./_auth/_signup/SignUpLayout";
import LoginLayout from "./_auth/_login/LoginLayout";

import CartLayout from "./_cart/CartLayout";
import ProductDetailLayout from "./_productDetail/ProductDetailLayout";
import { useQuery } from "@tanstack/react-query";
import useAuthUser from "./components/auth/useAuthUser";
import AddCake from "./_admin/element/AddCake";
import AdminLayout from "./_admin/AdminLayout";
import ForgotPass from "./_auth/ForgotPass";
import PaymentDetail from "./_cart/element/PaymentDetail";
import ForgotPassword from "./_auth/ForgotPassword";

const App = () => {
  const {data: authUser, isLoading} = useAuthUser();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageLayout />} />
        <Route path="/products" element={<ProductsLayout />} />
        <Route path="/about" element={<AboutLayout />} />
        <Route path="/event" element={<EventLayout />} />
        <Route path="/contact" element={<ContactLayout />} />
        <Route path="/signup" element= {!authUser ? <SignUpLayout /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginLayout/> : <Navigate to="/" />}/>
        <Route path="/cart" element={authUser ? <CartLayout isLogin={Number(true)} /> : <CartLayout isLogin={false} />} />
        <Route path="/productdetail/:id" element={<ProductDetailLayout />} />
        <Route path="/addcake" element={<AddCake />} />
        <Route path="/adminpage" element={<AdminLayout/>} />
        <Route path="/forgotpass" element={<ForgotPassword/>} />
        <Route path="/paymentdetail" element={<PaymentDetail/>} />
      </Routes>
    </>
  );
};

export default App;
