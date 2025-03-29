import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

import { Autoplay, Pagination, Navigation, EffectCards } from "swiper/modules";

const HomeSwiper = ({ swiperPics }) => {
  return (
    <>
      <div className="my-[8%]">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper w-full h-[450px]"
        >
          {!!swiperPics.length &&
            swiperPics.map((pic, index) => {
              return (
                <SwiperSlide key={pic.url}>
                  <img
                    className="w-full h-full mx-auto object-cover"
                    src={pic.url}
                    alt={`homepage_pic_${index}`}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
};

export default HomeSwiper;
