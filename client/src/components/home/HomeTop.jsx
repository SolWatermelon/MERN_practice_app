import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeTop = () => {
  return (
    <>
      <div className="md:p-14 p-8 flex flex-col">
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
          <Link to={"/search/"} className="underline underline-offset-4 text-md mt-3 font-extrabold dark:text-orange text-green-600 hover:text-green-500 dark:hover:text-darkorange">
          現在就來探索，開啟美好生活新篇章 Let's go
          </Link>

        </span>
      </div>
      {/* https://v3.tailwindcss.com/docs/hover-focus-and-other-states */}
      {/* <Button>click me</Button> */}
    </>
  );
};

export default HomeTop;
