import React, { useEffect } from "react";
import HomeListing from "./HomeListing";
import HomeSwiper from "./HomeSwiper";
import HomeTop from "./homeTop";
import { useListingActions } from "@/hooks/useListingActions";
import { useDispatch } from "react-redux";
import { acquireAllListings } from "@/slices/listingSlice.js";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const { getAllListingsQuery } = useListingActions();
  const {
    data: allListingsData,
    isPending: isAllListingsPending,
    isSuccess: isAllListingsSuccess,
    isError: isAllListingsError,
    error: allListingsErrorMsg,
  } = getAllListingsQuery;


 
  useEffect(() => {
    if (isAllListingsSuccess) {
      console.log("allListingsData?.allListings", allListingsData?.allListings)
      dispatch(acquireAllListings(allListingsData?.allListings));
    }
  }, [isAllListingsSuccess]);
  return (
    <>
      {!isAllListingsPending && 
      <div className="home-page py-12">
        <HomeTop />
        {/* 隨機抓幾張 */}
        <HomeSwiper />
        {/* 附家具和停車位的 */}
        <HomeListing />
      </div>
      }
    </>
  );
};

export default HomeComponent;
