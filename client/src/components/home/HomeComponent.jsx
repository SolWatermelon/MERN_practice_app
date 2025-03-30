import React, { useEffect, useState } from "react";
import HomeListing from "./HomeListing";
import HomeSwiper from "./HomeSwiper";
import HomeTop from "./homeTop";
import { useListingActions } from "@/hooks/useListingActions";
import { useDispatch } from "react-redux";
import { acquireAllListings } from "@/slices/listingSlice.js";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const { getAllListingsQuery } = useListingActions();
  const [swiperPics, setSwiperPics] = useState([]);
  const {
    data: allListingsData,
    isPending: isAllListingsPending,
    isSuccess: isAllListingsSuccess,
    isError: isAllListingsError,
  } = getAllListingsQuery;

  useEffect(() => {
    if (isAllListingsSuccess) {
      dispatch(acquireAllListings(allListingsData?.allListings));
      console.log("allListingsData?.allListings", allListingsData?.allListings)
      setSwiperPics(
        allListingsData?.allListings
          .map((listing) => listing?.imageUrls[0])
          .filter((_, index) => {
            return index < 6;
          })
      );
    }
  }, [isAllListingsSuccess]);
  return (
    <>
    {isAllListingsPending && <p>讀取中...</p>}
      {isAllListingsSuccess && (
        <div className="home-page">
          <HomeTop swiperPic={swiperPics[4]}/>
          <HomeSwiper swiperPics={swiperPics} />
          <HomeListing />
        </div>
      )}
      {isAllListingsError && <p>發生錯誤</p>}
    </>
  );
};

export default HomeComponent;
