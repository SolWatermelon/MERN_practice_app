import React, { useEffect } from "react";
import { LuSofa } from "react-icons/lu";
import { IoIosTimer } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { FaRegMoneyBill1 } from "react-icons/fa6";
// import { IoCalendar } from "react-icons/io";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// import {ExhibitListingHeader} from "./ExhibitListingHeader"

import ContactLandlord from "./ContactLandlord";
import ExhibitListingHeader from "./ExhibitListingHeader";

// tag改成li和ul！！！！
// 住址和房間測所數還沒寫
const ExhibitListingBody = ({ unverifiedPerListingData }) => {
  const { currentUser } = useSelector((state) => state.userReducer);

  return (
<div className="container mx-auto px-4 py-8 bg-gray-50">
{/* <ExhibitListingHeader /> */}


  {/* 標題區域 */}
  <div className="mb-8">

    <div className="flex flex-wrap items-center gap-4">
      {unverifiedPerListingData?.type === "rent" ? (
        <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-medium">
          出租中
        </span>
      ) : (
        <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium">
          好屋出售
        </span>
      )}
      
      {!unverifiedPerListingData?.offer && (
        <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-medium">
          優惠中
        </span>
      )}
      
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        {unverifiedPerListingData?.name}
      </h1>
    </div>
  </div>

  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
    {/* 房屋圖片 */}
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[400px]">
      <div className="relative">
      <ExhibitListingHeader unverifiedPerListingData={unverifiedPerListingData}/>
      <div className="absolute bottom-28 right-4 bg-black/50 text-white px-3 py-1 rounded-full">
          {unverifiedPerListingData?.imageUrls?.length} 張照片
        </div>
      </div>
    </div>

    {/* 基本資訊 */}
    <div className="space-y-6">
      {/* 房屋特點 */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">房屋特點</h2>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {[
            { 
              icon: <LuSofa className="text-blue-500 text-2xl" />, 
              title: "家具",
              value: unverifiedPerListingData?.furnished ? "附家具" : "無"
            },
            { 
              icon: <FaCar className="text-green-500 text-2xl" />, 
              title: "停車位",
              value: unverifiedPerListingData?.parking ? "有附" : "無"
            },
            { 
              icon: <IoIosTimer className="text-purple-500 text-2xl" />, 
              title: "上傳時間",
              value: new Date(unverifiedPerListingData?.createdAt).toLocaleDateString()
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg hover:shadow-md transition-all"
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
      <div className="bg-white p-6 rounded-xl shadow-md">
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


  {/* 關於房屋 */}
  <div className="mt-8 p-6">
    <h2 className="text-3xl font-bold mb-4 border-b pb-2">
      關於房屋
    </h2>
    <blockquote className="italic font-semibold text-gray-700 p-4 rounded-lg">
      {unverifiedPerListingData?.description}
    </blockquote>
  </div>

  {/* 優選理由 */}
  <div className="mt-8 bg-indigo-100  p-6 rounded-xl shadow-md">
    <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">
      為什麼選擇這間房
    </h2>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          icon: <FaCheckCircle className="text-green-500 text-3xl" />,
          title: "產權保障",
          description: "合法經營，權利明確",
          color: "bg-indigo-200"
        },
        {
          icon: <FaHome className="text-blue-500 text-3xl" />,
          title: "拎包入住",
          description: "滿足70%日常所需設施",
          color: "bg-blue-200"
        },
        {
          icon: <IoIosTimer className="text-purple-500 text-3xl" />,
          title: "可視發布日期",
          description: "篩選新舊房源很重要",
          color: "bg-red-100"
        }
      ].map((item, index) => (
        <div 
          key={index} 
          className={`${item.color} p-6 rounded-xl shadow-md 
            transform transition-all hover:scale-105 hover:shadow-xl
          `}
        >
          <div className="flex items-center gap-4 mb-3">
            {item.icon}
            <h3 className="text-lg text-gray-700 font-bold">{item.title}</h3>
          </div>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  </div>

  {/* 聯絡房東 */}
  {currentUser && unverifiedPerListingData?.userRef !== currentUser._id && (
    <div className="mt-8">
      <ContactLandlord unverifiedPerListingData={unverifiedPerListingData} />
    </div>
  )}
</div>
  );
};

export default ExhibitListingBody;
