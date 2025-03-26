import React, { useEffect } from "react";
import { LuSofa } from "react-icons/lu";
import { IoIosTimer } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import ContactLandlord from "./ContactLandlord";

// tag改成li和ul！！！！
// 住址和房間測所數還沒寫
const ExhibitListingBody = ({ unverifiedPerListingData }) => {
  const { currentUser } = useSelector((state) => state.userReducer);


  return (
    <div>
      {/* 標題 */}
      <div className="flex justify-start item-center gap-2">
        {unverifiedPerListingData?.type === "rent" ? (
          <span className="text-xs text-white bg-red-600 rounded-xl p-2 px-3 text-md font-semibold">
            出租中
          </span>
        ) : (
          <span className="text-xs text-white bg-blue-600 rounded-xl p-2 px-3 text-md font-semibold">
            好屋出售
          </span>
        )}
        {!unverifiedPerListingData?.offer && (
          <span className="text-xs text-white bg-green-600 rounded-xl p-2 px-3 text-md font-semibold">
            優惠中
          </span>
        )}
        <h1 className="text-[20px] font-bold mt-1">
          {unverifiedPerListingData?.name}
        </h1>
      </div>
      <div className="h-[2px] w-full dark:bg-gray-600 bg-gray-500 my-7"></div>

      <div>
        {/* 資訊大區塊 */}
        <div
          className={`mb-[200px] flex flex-col md:flex-row-reverse ${
            unverifiedPerListingData?.userRef !== currentUser._id
              ? "md:justify-between"
              : "md:justify-end"
          } w-full`}
        >
          {/* 連絡房東=> 自己的發文無法看到連絡房東 */}
          {currentUser &&
            unverifiedPerListingData?.userRef !== currentUser._id && (
              <div className="sidebar w-1/4 max-w-[250px]">
                <ContactLandlord
                  unverifiedPerListingData={unverifiedPerListingData}
                />
              </div>
            )}

          <div>
            {/* 服務與資訊 */}
            <div>
              <div>
                <div className="text-[16px] font-bold underline decoration-2 mb-3">
                  服務與資訊
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[16px] font-semibold mb-1">
                    提供設備
                  </span>
                  <span>
                    <LuSofa className="inline-block" />
                    <p className="inline-block px-2">
                      {unverifiedPerListingData?.furnished ? "附家具" : "無"}
                    </p>
                  </span>
                  <span>
                    <FaCar className="inline-block" />
                    <p className="inline-block px-2">
                      {unverifiedPerListingData?.parking ? "附停車位" : "無"}
                    </p>
                  </span>
                  <span>
                    <span>
                      <IoIosTimer className="inline-block" />
                      <p className="inline-block px-2">上傳時間</p>
                    </span>
                    <span>{`${unverifiedPerListingData?.createdAt}`}</span>
                  </span>
                </div>
              </div>
            </div>
            <p className="h-[0.8px] w-[30%] dark:bg-gray-600 bg-gray-500 my-7"></p>
            {/* 價格 */}
            <div className="flex flex-col gap-2">
              <span className="text-[16px] font-bold underline decoration-2 mb-3">
                所需金額
              </span>
              {unverifiedPerListingData?.discountPrice ? (
                <>
                  <span className="text-[16px] font-semibold mb-1">驚爆價</span>
                  <span className="text-[16px] font-semibold mb-1">
                    <FaRegMoneyBill1 className="inline-block" />
                    <p className="inline-block px-2">
                      {unverifiedPerListingData?.discountPrice}
                    </p>
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[16px] font-semibold mb-1">原價</span>
                  <span>
                    <FaRegMoneyBill1 className="inline-block" />
                    <p className="inline-block px-2">
                      {unverifiedPerListingData?.regularPrice}
                    </p>
                  </span>
                </>
              )}
            </div>
            <p className="h-[0.8px] w-[30%] dark:bg-gray-600 bg-gray-500  my-7"></p>
            {/* 房屋描述 */}
            <div>
              <div className="text-[16px] font-bold underline decoration-2 mb-3">
                關於房屋
              </div>
              <blockquote className={`text-xl font-semibold italic`}>
                {unverifiedPerListingData?.description}
              </blockquote>
            </div>
            <p className="h-[0.8px] w-[30%] dark:bg-gray-600 bg-gray-500 my-7"></p>
            {/* 優選理由 */}
            <div className="inline-flex md:flex-row flex-col md:pl-6 pt-3 md:pt-0 gap-5 items-center bg-indigo-300 text-slate-700 shadow-md rounded-sm">
              <div className="text-[16px] font-semibold">優選理由</div>
              <div className="flex gap-1 xl:flex-row flex-col">
                <div className="h-[100px] bg-indigo-200 p-5">
                  <p className="text-[16px] font-semibold flex items-center gap-1">
                    <FaCheckCircle className="text-green-600" />
                    產權有保障
                  </p>
                  <p>合法經營</p>
                </div>
                <div className="h-[100px] bg-indigo-200 p-5 ">
                  <p className="text-[16px] font-semibold flex items-center gap-1">
                    <FaCheckCircle className="text-green-600" />
                    拎包入住
                  </p>
                  <p>滿足70%日常所需設施</p>
                </div>
                <div className="h-[100px] bg-indigo-200 p-5 ">
                  <p className="text-[16px] font-semibold flex items-center gap-1 ">
                    <FaCheckCircle className="text-green-600" />
                    可視發布日期
                  </p>
                  <p>篩選新舊發布很重要~~~~</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitListingBody;
