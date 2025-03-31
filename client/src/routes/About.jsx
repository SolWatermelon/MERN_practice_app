import React from "react";

const About = () => {
  const skills = [
    "React",
    "Vite",
    "React Router",
    "Redux",
    "Tanstack",
    "React Hook Form",
    "Redux",
    "Tailwind CSS",
    "Shadcn",
    "RWD",
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "JWT",
    "Google OAuth",
    "Postman"
  ];

  return (
    <main className="p-[30px] sm:px-[100px] md:py-[60px] font-bold">
      <div>
        <p className="text-xl font-extrabold w-full border-b-2 dark:border-white border-gray-300 mb-4">
          專案背景
        </p>
        <p>
          這個房屋管理系統是我在學習與練習網頁開發時的Side
          Project，旨在模擬提供房東與房客一個簡單、直覺的房屋資訊管理平台。專案的主要功能包括
          <span className="text-hoverlighttext dark:text-orange">
            房源管理（CRUD）、使用者帳戶管理（CRUD+
            Auth）、多條件篩選房屋、Google登入等等，
          </span>
          目標是讓使用者能輕鬆發布、編輯與查找租屋資訊。此外，這個專案也是我熟悉
          RESTful API設計、資料庫操作、雲端部署
          的實戰練習，幫助我建立從開發到上線的完整流程經驗
        </p>
      </div>
      <div>
        <p className="text-xl font-extrabold w-full border-b-2 dark:border-white mt-8 mb-4 border-gray-300 ">
          核心功能及技術
        </p>
        <div className="flex gap-10 lg:flex-nowrap flex-wrap">
          <ul className="text-hoverlighttext dark:text-orange">
            {skills.map(
              (skill, index) =>
                index < 8 && (
                  <li key={index}>
                    {index + 1}、{skill}
                  </li>
                )
            )}
          </ul>
          <ul className="text-hoverlighttext dark:text-orange">
            {skills.map(
              (skill, index) =>
                index >= 8 && (
                  <li key={index}>
                    {index + 1}、{skill}
                  </li>
                )
            )}
          </ul>
          <div className="max-w-[500px] flex flex-col gap-3">
            <p>
              <span className="text-xl underline text-hoverlighttext">前端</span>採用React+Vite開發，並使用React
              Router處理頁面導航，搭配Tailwind
              CSS+Shadcn提供現代化UI，並透過Redux進行狀態管理，以及利用React
              Hook Form建立表單，API方面則使用Tanstack。
            </p>
            <p>
            <span className="text-xl underline text-hoverlighttext">後端</span>採用Node.js+Express，並透過MongoDB+Mongoose
              儲存與管理房屋及使用者資料。系統內建JWT驗證機制
              確保資料安全，並整合Google登入與本地登入 提升使用者體驗。
            </p>
            <p>
              在開發過程中，我使用Postman測試API，並透過
              Render部署後端，使前後端可獨立運行。
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xl font-extrabold w-full border-b-2 dark:border-white border-gray-300 mt-8 mb-4">
          其他
        </p>
        <div>
          <ul>
            <li>
              1、Free SVG Background by{" "}
              <a target="_blank" href="https://bgjar.com">
                BGJar
              </a>
            </li>
            <li>2、Images From Pixabay</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default About;
