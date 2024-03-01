import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer";
const MainLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="container py-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
