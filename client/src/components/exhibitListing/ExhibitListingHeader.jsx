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
  // const imageUrls = [
  //   {
  //     publicID: "listing-file-1742460247524-0",
  //     url: "https://res.cloudinary.com/dr6qrkwdk/image/upload/v1742460253/listing-file-1742460247524-0.jpg",
  //   },
  //   {
  //     publicID: "listing-file-1742460247524-0",
  //     url: "https://res.cloudinary.com/dr6qrkwdk/image/upload/v1742460253/listing-file-1742460247524-0.jpg",
  //   },
  //   {
  //     publicID: "listing-file-1742460247524-0",
  //     url: "https://res.cloudinary.com/dr6qrkwdk/image/upload/v1742460253/listing-file-1742460247524-0.jpg",
  //   },
  //   {
  //     publicID: "listing-file-1742460247524-0",
  //     url: "https://res.cloudinary.com/dr6qrkwdk/image/upload/v1742460253/listing-file-1742460247524-0.jpg",
  //   },
  //   {
  //     publicID: "listing-file-1742460247524-0",
  //     url: "https://res.cloudinary.com/dr6qrkwdk/image/upload/v1742460253/listing-file-1742460247524-0.jpg",
  //   },
  // ];

  // 開啟全屏輪播
  const openFullscreen = (index) => {
    setActiveIndex(index);
    setIsFullscreen(true);
  };

  // 關閉全屏輪播
  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // return <div>{isSuccess && <p>{data?.address}</p>}</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <div>{data?.imageUrls.length}</div> */}
      {/* 一張圖片 */}
      {unverifiedPerListingData?.imageUrls.length === 1 && (
        <div className="grid grid-cols-1 gap-4 h-auto">
          <div>
            <div className=" mx-auto w-[85%] h-full bg-gray-200">
              <img
                src={unverifiedPerListingData?.imageUrls[0].url}
                alt="Gallery thumbnail 1"
                className="w-full h-full object-cover mx-auto"
              />
            </div>
          </div>
        </div>
      )}

      {/* 兩張圖片 */}
      {unverifiedPerListingData?.imageUrls.length === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-1 row-span-1 hover:scale-[1.05] transition-transform duration-3000">
            <div
              className="bg-gray-200 cursor-pointer"
              onClick={() => openFullscreen(0)}
            >
              <img
                src={unverifiedPerListingData?.imageUrls[0].url}
                alt="Gallery thumbnail 1"
                // h-[300px]
                className="w-full h-[300px] object-cover mx-auto"
              />
            </div>
          </div>
          {unverifiedPerListingData?.imageUrls
            .slice(1, 5)
            .map((image, index) => (
              <div
                key={index + 1}
                className="bg-gray-200 cursor-pointer hover:scale-[1.05] transition-transform duration-3000"
                onClick={() => openFullscreen(index + 1)}
              >
                <img
                  src={image.url}
                  alt={`Gallery thumbnail ${index + 2}`}
                  // h-[300px]
                  className="w-full h-[300px] object-cover mx-auto"
                />
              </div>
            ))}
        </div>
      )}

      {/* 三張圖片 */}
      {unverifiedPerListingData?.imageUrls.length === 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-[auto,1fr] gap-4 h-auto">
          <div className="col-span-1 sm:col-span-2 row-span-1 sm:row-span-2 h-[150px] sm:h-auto hover:scale-[1.05] transition-transform duration-3000">
            <div
              className="bg-gray-200 cursor-pointer h-full "
              onClick={() => openFullscreen(0)}
            >
              <img
                src={unverifiedPerListingData?.imageUrls[0].url}
                alt="Gallery thumbnail 1"
                className="w-full h-full max-h-[150px] sm:max-h-none object-cover"
              />
            </div>
          </div>

          {unverifiedPerListingData?.imageUrls
            .slice(1, 3)
            .map((image, index) => (
              <div
                key={index + 1}
                className="col-span-1 row-span-1 bg-gray-200 cursor-pointer hover:scale-[1.05] transition-transform duration-3000"
                onClick={() => openFullscreen(index + 1)}
              >
                <img
                  src={image.url}
                  alt={`Gallery thumbnail ${index + 2}`}
                  className="w-full h-full max-h-[100px] sm:max-h-none object-cover"
                />
              </div>
            ))}
        </div>
      )}

      {/* 四張圖片 */}
      {unverifiedPerListingData?.imageUrls.length === 4 && (
        <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-3 gap-2 h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
          {/* 主圖片 */}
          <div className="col-span-1 row-span-1 md:col-span-2 md:row-span-3 hover:scale-[1.02] transition-transform duration-300">
            <div
              className="bg-gray-200 cursor-pointer h-full"
              onClick={() => openFullscreen(0)}
            >
              <img
                src={unverifiedPerListingData?.imageUrls[0].url}
                alt="Gallery thumbnail 1"
                className="w-full h-full object-cover mx-auto"
              />
            </div>
          </div>
          {/* 其他圖片 */}
          {unverifiedPerListingData?.imageUrls
            .slice(1, 5)
            .map((image, index) => (
              <div
                key={index + 1}
                className="col-span-1 row-span-1 md:col-span-2 md:row-span-1 bg-gray-200 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                onClick={() => openFullscreen(index + 1)}
              >
                <img
                  src={image.url}
                  alt={`Gallery thumbnail ${index + 2}`}
                  className="w-full h-full object-cover mx-auto"
                />
              </div>
            ))}
        </div>
      )}

      {/* 五張圖片 */}
      {unverifiedPerListingData?.imageUrls.length === 5 && (
        <div className="grid grid-cols-2 grid-rows-3 sm:grid-cols-5 sm:grid-rows-4 gap-4 h-auto xl:h-[300px]">
          <div className="col-span-2 row-span-1 sm:col-span-3 sm:row-span-4 hover:scale-[1.05] transition-transform duration-3000">
            <div
              className="bg-gray-200 cursor-pointer h-full"
              onClick={() => openFullscreen(0)}
            >
              <img
                src={unverifiedPerListingData?.imageUrls[0].url}
                alt="Gallery thumbnail 1"
                className="w-full h-full object-cover mx-auto"
              />
            </div>
          </div>
          {unverifiedPerListingData?.imageUrls
            .slice(1, 5)
            .map((image, index) => (
              <div
                key={index + 1}
                className="col-span-1 row-span-1 sm:col-span-1.5 sm:row-span-2 bg-gray-200 cursor-pointer hover:scale-[1.05] transition-transform duration-3000"
                onClick={() => openFullscreen(index + 1)}
              >
                <img
                  src={image.url}
                  alt={`Gallery thumbnail ${index + 2}`}
                  className="w-full h-full object-cover mx-auto"
                />
              </div>
            ))}
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
            initialSlide={activeIndex || 0}
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
