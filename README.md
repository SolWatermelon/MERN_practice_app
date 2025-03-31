## 專案背景

此房屋管理系統為使用前端Vite+React、後端Node.js+Express與資料庫MongoDB進行開發與串接的MERN專案，旨在模擬提供房東與房客一個簡單與直覺的房屋資訊管理平台。專案的主要功能包括房源管理（CRUD）、使用者帳戶管理（CRUD）、身分驗證（JWT）、多條件篩選房屋、Google OAuth、dark模式切換與聯絡屋主。此專案也是我練習RESTful API設計、資料庫操作、雲端部署的實戰結果，幫助我建立從開發到實際部屬的完整流程經驗。

## 專案展示

網頁連結：https://mern-practice-app.onrender.com

## 核心技術

### 前端
- Framework: React
- Build tool: Vite
- Styling: TailwindCSS, Shadcn
- State management: Redux
- Data fetching: TanStack
- Form handling: Reack Hook Form
- Client-side rounting: React Router
- RWD
- API testing: Postman

### 後端
- Runtime: Node.js
- Framework: Express
- Database: MongoDB
- Authorization: OAuth2.0
- Authentication: JWT
- Image Upload: Cloudinary
- Deployment: Render


## 核心功能

- 使用者身分驗證
- Google登入與本地登入
- 刪除帳戶
- 更改帳戶資訊
- 上傳大頭貼至Cloudinary
- 新增房源
- 修改房源
- 刪除房源
- 上傳房源圖片至Cloudinary
- 多條件篩選房源
- 跨頁篩選房源
- 篩選結果可透過URL保持狀態
- 傳送訊息至房東
- Infinite scroll
- pagination
- dark模式切換
- RWD響應式設計

## 圖片展示功能與介面（部分截圖只展現局部畫面元素）

### 登入頁與dark模式切換

> 登入頁具有表單驗證

<img src="../rent_app/client/public/readme/1.jpg" width="80%"/>

> 畫面可以切換成light與dark模式

<img src="../rent_app/client/public/readme/2.jpg" width="80%"/>

> 本地登入

<img src="../rent_app/client/public/readme/8.jpg" width="80%"/>

> Google登入（此處以手機板+編輯頁的圖片展示Google登入較為明顯）

<img src="../rent_app/client/public/readme/25.jpg" width="50%"/>

> 登出時再次確認

<img src="../rent_app/client/public/readme/7.jpg" width="80%"/>

### 首頁

> 登入成功後會有提示並跳轉至首頁。每頁上方都有搜尋列可以對已發布的房源進行關鍵字篩選，也能按下畫面右側圖片或左側連結進入房源列表進行多重條件篩選

<img src="../rent_app/client/public/readme/3.jpg" width="80%"/>

<img src="../rent_app/client/public/readme/11.jpg" width="80%"/>

> 按下圖片小卡連結到相對應得房源介紹，或按下"查看更多"將跳轉到所有搜尋結果

<img src="../rent_app/client/public/readme/9.jpg" width="80%"/>

<img src="../rent_app/client/public/readme/12.jpg" width="80%"/>

<img src="../rent_app/client/public/readme/10.jpg" width="80%"/>

### 編輯資料頁

> 可以更換大頭貼以及更新基本資料，成功更新或失敗都會攔截畫面右側提示，欄位空白也會進行提示。按下取消後文字資訊會回復成更改前

<img src="../rent_app/client/public/readme/26.jpg" width="80%"/>

<img src="../rent_app/client/public/readme/27.jpg" width="80%"/>

### 帳戶與文章管理頁

<img src="../rent_app/client/public/readme/6.jpg" width="80%"/>

> 表格未填妥會進行攔截

<img src="../rent_app/client/public/readme/28.jpg" width="80%"/>

> 圖片上傳後也可以進行增加或刪除
 
 <img src="../rent_app/client/public/readme/19.jpg" width="80%"/>

> 發布成功後可以看到文章，可以點選圖片看到此篇發文更多圖片

<img src="../rent_app/client/public/readme/12.jpg" width="80%"/>

> 也可以到帳戶與文章管理頁查看更多自己發布的文章

<img src="../rent_app/client/public/readme/20.jpg" width="80%"/>

> 按下刪除時會再次確認

<img src="../rent_app/client/public/readme/21.jpg" width="80%"/>

> 按下編輯後會導航至編輯頁，可對文章資訊或圖片做更新

<img src="../rent_app/client/public/readme/22.jpg" width="80%"/>

### 所有房屋篩選頁

<img src="../rent_app/client/public/readme/10.jpg" width="80%"/>

>可以再畫面左側進行多重篩選

<img src="../rent_app/client/public/readme/11.jpg" width="80%"/>

### [補充] 

如果非自己發布的房源文章，文章下方可以看到"連絡房東"，輸入完訊息並發送後會導航至gmail

<img src="../rent_app/client/public/readme/14.jpg" width="80%"/>

<img src="../rent_app/client/public/readme/15.jpg" width="80%"/>

## API設計

### JWT驗證
- User相關操作與部分Listings操作都需驗證JWT是否有效，以確保請求是來自於驗證的使用者

### User相關API
- 更新此User資料
- 刪除此User資料
- 得到此User所發布的所有文章
- 得到此User資料

### Listing相關API
- 新增Listing
- 新增Listing imaged
- 刪除Listing
- 更新Listing
- 得到單筆Listing
- 得到所有Listing

### Auth相關API
- Google登入
- 本地登入
- 註冊
- 登出
