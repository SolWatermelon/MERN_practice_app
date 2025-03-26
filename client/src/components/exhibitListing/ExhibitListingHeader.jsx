import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const ExhibitListingHeader = ({ unverifiedPerListingData }) => {
  // const { data, isSuccess } = getUnverifiedPerListQueryingMutation;
  // const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  // SwiperCore.use([Navigation]);

  // 開啟輪播
  const openFullscreen = (index) => {
    setActiveIndex(index);
    setIsFullscreen(true);
  };

  // 關閉輪播
  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 一張縮圖 */}
      {unverifiedPerListingData?.imageUrls.length && (
        <div className="grid grid-cols-1 gap-4 ">
          {
            <div
              className="bg-gray-200 cursor-pointer hover:scale-[1.05] transition-transform duration-3000"
              onClick={() => openFullscreen(0)}
            >
              <img
                src={unverifiedPerListingData?.imageUrls[0].url}
                alt={`Gallery thumbnail 0`}
                // h-[300px]
                className="w-full h-[ˇ00px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          }
        </div>
      )}



      {/* 全屏輪播 */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-white z-50 ">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={closeFullscreen}
              className="p-2 bg-white text-md text-gray-400 w-[40px] h-[40px] rounded-full hover:text-gray-60 shadow-md"
            >
              x
            </button>
          </div>

          <Swiper
            spaceBetween={30}
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            className="h-screen bg-gray-300"
          >
            {unverifiedPerListingData?.imageUrls.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.url}
                  alt={`Gallery image ${index + 1}`}
                  className="max-h-full max-w-full mx-auto object-contain"
                />
              </SwiperSlide>
            ))}

            <div className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer z-10"></div>
            <div className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer z-10"></div>
          </Swiper>
        </div>
      )}
    </div>
  );
};
// };

export default ExhibitListingHeader;
