import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayouts = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  
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
