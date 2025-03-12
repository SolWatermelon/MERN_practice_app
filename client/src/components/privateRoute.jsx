import React from 'react'
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
// import { Outlet } from "react-router-dom";

const privateRoute = () => {
    const {currentUser} = useSelector((state) => state.userReducer);
    console.log("currentUser:", currentUser);

    return currentUser?<Outlet />:<Navigate to="/sign-in" replace />; 
//     if (!currentUser) {
//     return <Navigate to="/" replace />; 
//   }
//   return <Outlet />
}

export default privateRoute