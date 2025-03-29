import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

import { Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import PerSearchResultCard from "../search/PerSearchResultCard";
import HomePercard from "./HomePercard";

const HomeListing = () => {
  const { allListings } = useSelector((state) => state.allListingsReducer);
  const [furnishedListings, setFurnishedListings] = useState([]);
  const [discountListings, setDiscountListings] = useState([]);

  useEffect(() => {
    console.log("allListings:", allListings);
    if (allListings && allListings.length > 0) {
      const filteredFurnished = allListings
        .filter((listing) => listing.furnished)
        .filter((_, index) => index < 6);
      setFurnishedListings(filteredFurnished);
      console.log("Filtered listings:", filteredFurnished);
      const filteredDiscount = allListings
        .filter((listing) => listing.discountPrice)
        .filter((_, index) => index < 6);
      setDiscountListings(filteredDiscount);
      console.log("filteredDiscount", filteredDiscount);
    }
  }, [allListings]);

  return (
    <div className="container mx-auto px-14">
      {/* 優惠折扣房 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">優惠折扣房</h2>
        {/* <div className="w-full"> */}
        <Link to="/search/?type=offer" className="dark:text-darkorange dark:hover:text-hoverlighttext text-red-600 hover:text-red-500 font-extrabold underline">查看更多</Link>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 35 },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper my-2"
        >
          <div className="h-[300px]bg-red-200">
            {discountListings &&
              discountListings.length > 0 &&
              discountListings.map((listing) => (
                <SwiperSlide
                  className="h-[300px] w-full mb-12"
                  key={listing._id}
                >
                  <HomePercard listing={listing} />
                </SwiperSlide>
              ))}
          </div>
        </Swiper>
        {/* </div> */}
      </div>

      {/* 精美傢俱房 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">精美傢俱房</h2>
        {/* <div className="w-full"> */}
        <Link to="/search/?type=all&furnished=true" className="dark:text-darkorange dark:hover:text-hoverlighttext text-red-600 hover:text-red-500 font-extrabold underline">查看更多</Link>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 35 },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper my-2"
        >
          <div className="h-[300px]bg-red-200">
            {furnishedListings &&
              furnishedListings.length > 0 &&
              furnishedListings.map((listing) => (
                <SwiperSlide
                  className="h-[300px] w-full mb-12"
                  key={listing._id}
                >
                  <HomePercard listing={listing} />
                </SwiperSlide>
              ))}
          </div>
        </Swiper>
        {/* </div> */}
      </div>
    </div>
  );
};

export default HomeListing;
