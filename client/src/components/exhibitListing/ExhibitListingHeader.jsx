import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const ExhibitListingHeader = ({ unverifiedPerListingData }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <div className="container mx-auto px-4 py-8 ">
      {/* 一張縮圖 */}
      {unverifiedPerListingData?.imageUrls.length && (
        <div className="grid grid-cols-1 gap-4 ">
          {
            <div
              className="bg-gray-200 cursor-pointer rounded-lg border-4 dark:border-white border-gray-200 hover:scale-[1.05] transition-transform duration-3000"
              onClick={() => openFullscreen(0)}
            >
              <img
                src={unverifiedPerListingData?.imageUrls[0].url}
                alt={`Gallery thumbnail 0`}
                className="w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105 "
                loading="lazy"
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
              <SwiperSlide key={index} className="bg-gray-300 relative">
                <div className="bg-gray-300 absolute top-[10vh] left-0 right-0">
                  <img
                    src={image.url}
                    alt={`Gallery image ${index + 1}`}
                    className="max-h-full max-w-[70%] mx-auto object-contain"
                    loading="lazy"
                  />
                </div>
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
