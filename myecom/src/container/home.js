import React from "react";
import Header from "../components/Header";
import Dashboard from "./Dashboard";
import Product from "./Product";
import { Route, Routes, useLocation } from "react-router-dom";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Success from "./Success";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
import Adminlogin from "../components/Adminlogin";
import Admindashboard from "../components/Admindashboard";
import Retailerdashboard from "../components/Retailerdashboard";
import Adminsignup from "../components/Adminsignup";

import ManageProduct from "../components/ManageProduct";


export default function Home() {
  const path = useLocation();
  console.log(path.pathname === "/", path.pathname);
  console.log(path.pathname === "signup", path.pathname);
  console.log(path.pathname === "adminlogin", path.pathname);
  console.log(path.pathname === "success", path.pathname);
  console.log(path.pathname === "Adminsignup", path.pathname);

  return (
    <div>
      {path.pathname !== "/" &&
        path.pathname !== "/signup" &&
        path.pathname !== "/success" &&
        path.pathname !== "/Adminlogin" &&
        path.pathname !== "/craete-account" && 
        <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />{" "}
        {/* Checkout without id */}
        <Route path="/checkout/:id" element={<Checkout />} />{" "}
        {/* Checkout with id */}
        <Route path="/success" element={<Success />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/craete-account" element={<Adminsignup />} />
        <Route path="/retailerdashboard" element={<Retailerdashboard />} />
        <Route path="/retailerdashboard" element={<Retailerdashboard />} />
        
        <Route path="/manageproduct" element={<ManageProduct />} />
      </Routes>
    </div>
  );
}
