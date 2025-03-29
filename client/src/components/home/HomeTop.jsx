import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeTop = ({ swiperPic }) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <main className="flex tablet:flex-row flex-col-reverse justify-center items-center gap-6">
        <div
          className="flex flex-col px-4"
          data-aos="fade-right"
          data-aos-duration="600"
          data-aos-delay="50"
        >
          <blockquote
            className={`text-3xl dark:text-orange text-gray-700 font-semibold italic`}
          >
            你在尋找心目中
            <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-hoverlighttext relative inline-block">
              <span className="relative text-white">最完美的</span>
            </span>
            房子嗎？
            <span>99房屋包您滿意</span>
          </blockquote>
          <span className="text-xs font-bold mt-10 flex flex-col gap-2">
            <p>
              無論您嚮往寧靜的郊區、繁華的都市，還是溫馨的家庭空間，我們為您精心挑選最優質的房源，讓您輕鬆找到心目中的完美居所
            </p>
            <p>
              我們不僅提供優越的地理位置、舒適的居住環境，更以實惠的價格與完善的服務，確保您的購屋或租屋體驗順暢無憂
            </p>
            <Link
              to={"/search/"}
              className="underline underline-offset-4 text-md mt-20 font-extrabold dark:text-orange text-green-600 hover:text-green-500 dark:hover:text-darkorange"
            >
              現在就來探索，開啟美好生活新篇章 Let's go
            </Link>
          </span>
        </div>
        <Link
          to={"/search/"}
          data-aos="fade-left"
          data-aos-delay="400"
          data-aos-duration="600"
        >
          <div className="border-4 m-5 hover:scale-[1.04] border-white hover:border-gray-500 transition-transform w-[300px] h-[300px] rounded-tr-3xl rounded-bl-3xl overflow-hidden relative bg-gray-300">
            <img
              className="w-full h-full object-cover cursor-pointer "
              src={swiperPic?.url}
              alt="header_pic"
            />
          </div>
        </Link>
      </main>
    </>
  );
};

export default HomeTop;
