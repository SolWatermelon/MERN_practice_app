import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayouts = () => {
  return (
    <>
      <Navbar />
      <div className="px-4 mt-6 md:px-8 lg:px-32 2xl:px-60">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayouts;
