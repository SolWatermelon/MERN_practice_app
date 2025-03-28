import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {acquireAllListings} from "../slices/listingSlice.js"
// import { useListingActions } from "../hooks/useListingActions";
// import { toggleMenu } from "../slices/navToggleSlice.js";
import HomeComponent from "@/components/home/HomeComponent.jsx";
const Home = () => {
  // const dispatch = useDispatch();
  // const { getAllListingsQuery } = useListingActions();
  // const {
  //   data: allListingsData,
  //   isPending: isAllListingsPending,
  //   isSuccess: isAllListingsSuccess,
  //   isError: isAllListingsError,
  //   error: allListingsErrorMsg,
  // } = getAllListingsQuery;

  // useEffect(() => {
  //   if(isAllListingsSuccess){
  //     dispatch(acquireAllListings(allListingsData?.allListings))
  //   }
  // }, [isAllListingsSuccess]);

  return (
    <div>
      <HomeComponent />
    </div>
  );
};

export default Home;
