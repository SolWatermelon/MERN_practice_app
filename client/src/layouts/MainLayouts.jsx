import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNavigation } from "react-router";

const MainLayouts = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  // const navigation = useNavigation();

  
  // useEffect(() => {
  //   console.log("navigation.state:", navigation.state)
  // }, [navigation.state])

  return (

    <>
      <Navbar />
      {/* <div className= 'mt-[100px]'>
      {navigation.state === `loading` ? <div className="mt-[100px]">loading</div>:''}

      </div> */}
      <div className="px-4 mt-6 md:px-8 lg:px-32 2xl:px-60">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayouts;
