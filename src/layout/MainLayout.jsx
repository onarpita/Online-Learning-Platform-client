import React, { use } from "react";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router";
import Footer from "../components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext.js";
import Loading from "../components/Loading.jsx";

const MainLayout = () => {
  const { loading } = use(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default MainLayout;