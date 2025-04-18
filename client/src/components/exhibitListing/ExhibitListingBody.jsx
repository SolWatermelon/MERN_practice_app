import React, { useEffect } from "react";
import { LuSofa } from "react-icons/lu";
import { IoIosTimer } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { PiToiletPaper } from "react-icons/pi";
import { LuBedDouble } from "react-icons/lu";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactLandlord from "./ContactLandlord";
import ExhibitListingHeader from "./ExhibitListingHeader";

const ExhibitListingBody = ({ unverifiedPerListingData }) => {
  const { currentUser } = useSelector((state) => state.userReducer);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="p-10">
        {/* 標題區域 */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 ">
            {unverifiedPerListingData?.type === "rent" ? (
              <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-medium">
                出租中
              </span>
            ) : (
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium">
                好屋出售
              </span>
            )}

            {unverifiedPerListingData?.offer && (
              <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-medium">
                優惠中
              </span>
            )}

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              {unverifiedPerListingData?.name}
            </h1>
            <span className="dark:bg-white bg-gray-300 w-full h-[1.5px]"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2  gap-8">
          {/* 房屋圖片 */}
          <div className="overflow-hidden md:h-[400px]">
            <div className="relative">
              <ExhibitListingHeader
                unverifiedPerListingData={unverifiedPerListingData}
              />
              <div className="absolute top-0 right-4 bg-black/50 text-white px-3 py-1 rounded-full">
                {unverifiedPerListingData?.imageUrls?.length} 張照片
              </div>
            </div>
          </div>

          {/* 基本資訊 */}
          <div className="space-y-6">
            {/* 房屋特點 */}
            <div
              className="bg-white p-6 rounded-xl shadow-md"
              data-aos="fade-down"
              data-aos-duration="600"
              data-aos-delay="50"
            >
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                房屋特點
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {[
                  {
                    icon: <LuSofa className="text-blue-500 text-2xl" />,
                    title: "家具",
                    value: unverifiedPerListingData?.furnished
                      ? "附家具"
                      : "無",
                  },
                  {
                    icon: <FaCar className="text-green-500 text-2xl" />,
                    title: "停車位",
                    value: unverifiedPerListingData?.parking ? "有附" : "無",
                  },
                  {
                    icon: <IoIosTimer className="text-purple-500 text-2xl" />,
                    title: "上傳時間",
                    value: new Date(
                      unverifiedPerListingData?.createdAt
                    ).toLocaleDateString(),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg  transition-all"
                  >
                    {item.icon}
                    <div>
                      <p className="font-medium text-gray-600">{item.title}</p>
                      <p className="font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 房屋格局 */}
            <div
              className="bg-white p-6 rounded-xl shadow-md"
              data-aos="fade-down"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                房屋格局
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {[
                  {
                    icon: <LuBedDouble className="text-indigo-400 text-2xl" />,
                    title: "房間",
                    value: unverifiedPerListingData?.bedrooms,
                  },
                  {
                    icon: <PiToiletPaper className="text-red-400 text-2xl" />,
                    title: "浴室",
                    value: unverifiedPerListingData?.bathrooms,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg"
                  >
                    {item.icon}
                    <div>
                      <p className="font-medium text-gray-600">{item.title}</p>
                      <p className="font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 房屋報價 */}
            <div
              className="bg-white p-6 rounded-xl shadow-md"
              data-aos="fade-down"
              data-aos-duration="600"
              data-aos-delay="150"
            >
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                房屋報價
              </h2>
              <div className="flex justify-between items-center">
                <div>
                  {unverifiedPerListingData?.discountPrice ? (
                    <>
                      <div className="flex items-center gap-2">
                        <FaRegMoneyBill1 className="text-green-600 text-2xl" />
                        <span className="text-xl font-bold text-green-600">
                          驚爆價：{unverifiedPerListingData?.discountPrice}
                        </span>
                      </div>
                      <p className="text-gray-500 line-through ml-8">
                        原價：{unverifiedPerListingData?.regularPrice}
                      </p>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FaRegMoneyBill1 className="text-blue-600 text-2xl" />
                      <span className="text-xl font-bold text-blue-600">
                        原價：{unverifiedPerListingData?.regularPrice}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 關於房屋 */}
      <div className="mt-1 p-6">
        <h2 className="text-3xl font-bold dark:text-white mb-4 border-b-2 dark:border-white border-gray-300 pb-2">
          關於房屋
        </h2>
        <blockquote className="dark:text-white italic font-semibold text-gray-700 p-4 rounded-lg">
          {unverifiedPerListingData?.description}
        </blockquote>
      </div>

      {/* 優選理由 */}
      <div
        className="mt-8 mb-6 mx-4 bg-indigo-100 p-6 pb-12 rounded-xl shadow-md"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="100"
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">
          為什麼選擇99房屋？
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaCheckCircle className="text-green-500 text-3xl" />,
              title: "產權保障",
              description: "合法經營，權利明確",
              color: "bg-indigo-200",
            },
            {
              icon: <FaHome className="text-blue-500 text-3xl" />,
              title: "拎包入住",
              description: "滿足70%日常所需設施",
              color: "bg-blue-200",
            },
            {
              icon: <IoIosTimer className="text-purple-500 text-3xl" />,
              title: "可視發布日期",
              description: "隨時追蹤新物件",
              color: "bg-red-100",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.color} p-6 rounded-xl shadow-md 
            
          `}
            >
              <div className="flex items-center gap-4 mb-3">
                {item.icon}
                <h3 className="text-lg text-gray-700 font-bold">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 聯絡房東 */}
      {currentUser && unverifiedPerListingData?.userRef !== currentUser._id && (
        <div className="mt-8">
          <ContactLandlord
            unverifiedPerListingData={unverifiedPerListingData}
          />
        </div>
      )}
    </div>
  );
};

export default ExhibitListingBody;
