import React from "react";
import Header from "../components/Header";
import Dashboard from "./Dashboard";
import Product from "./Product";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Success from "./Success";
import Login from "../components/Login";
import Signup from "../components/Signup"

export default function Home() {
  const  path  = useLocation();
  console.log(path.pathname === '/',path.pathname)
  console.log(path.pathname === 'signup',path.pathname)
  console.log(path.pathname === 'success',path.pathname)
  return (
    <div>
      {
path.pathname !== '/'&&
path.pathname !== '/signup'&&
path.pathname !== '/success'&&
      <Header />
      }
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} /> {/* Checkout without id */}
        <Route path="/checkout/:id" element={<Checkout />} /> {/* Checkout with id */}
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}
