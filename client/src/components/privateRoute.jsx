import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const privateRoute = () => {
    const {currentUser} = useSelector((state) => state.userReducer);
    return currentUser?<Outlet />:<Navigate to="/sign-in" replace />; 
}

export default privateRoute