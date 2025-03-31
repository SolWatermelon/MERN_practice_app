## 專案背景

此房屋管理系統為使用前端Vite+React、後端Node.js+Express與資料庫MongoDB進行開發與串接的MERN專案，旨在模擬提供房東與房客一個簡單與直覺的房屋資訊管理平台。專案的主要功能包括房源管理（CRUD）、使用者帳戶管理（CRUD）、身分驗證（JWT）、多條件篩選房屋、Google OAuth、dark模式切換與聯絡屋主。此專案也是我練習RESTful API設計、資料庫操作、雲端部署的實戰結果，幫助我建立從開發到實際部屬的完整流程經驗。

## 專案展示

### 重要說明
Render免費版會讓Server定時進入休眠狀態，因此有時載入會特別慢，請見諒！ 
     
     https://render.com/docs/free?_gl=1*1xvo6ra*_gcl_au*MTc3MjQ1NjgyNi4xNzQzMzQxODEy*_ga*NDk2ODc2NDUuMTc0MzM0MDIyMw..*_ga_QK9L9QJC5N*MTc0MzQzNDk4My4xMS4xLjE3NDM0MzUwNTcuNjAuMC4w#free-web-services


### 網頁連結
https://mern-practice-app.onrender.com


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

![登入頁1](/client/public/readme/1.jpg)

> 切換成light或dark模式

![登入頁2](/client/public/readme/2.jpg)

> 本地登入

![登入頁3](/client/public/readme/8.jpg)

> Google登入（此處以手機板+編輯頁的截圖展示Google登入）

![登入頁4](/client/public/readme/25.jpg)

> 登出時再次確認

![登出頁5](/client/public/readme/7.jpg)


### 首頁

> 登入成功後，會有提示並跳轉至首頁。每頁上方都有搜尋列可以對已發布的房源進行關鍵字篩選，也能按下畫面右側圖片或左側連結進入房源列表進行多重條件篩選

![首頁1](/client/public/readme/3.jpg)

![首頁2](/client/public/readme/11.jpg)

> 按下圖片小卡連結到相對應的房源介紹，或按下「查看更多」將跳轉到所有搜尋結果

![首頁3](/client/public/readme/9.jpg)

![首頁4](/client/public/readme/12.jpg)

![首頁5](/client/public/readme/10.jpg)


### 編輯資料頁

> 1. 此頁能更換大頭貼及更新基本資料，成功更新或失敗都會被攔截，畫面右側將有提示；此外，表單欄位空白時也會進行攔截提示。
> 2. 按下「取消」後資訊會回復成更改前

![編輯資料頁1](/client/public/readme/26.jpg)
![編輯資料頁2](/client/public/readme/27.jpg)


### 帳戶與文章管理頁

![帳戶與文章管理頁1](/client/public/readme/6.jpg)

> 表格未填妥會進行攔截

![帳戶與文章管理頁2](/client/public/readme/28.jpg)

> 圖片上傳後也能進行增加或刪除

![帳戶與文章管理頁3](/client/public/readme/19.jpg)

> 發布成功後可以即時看到文章，點選圖片後將看到此篇發文更多圖片

![帳戶與文章管理頁4](/client/public/readme/12.jpg)

> 到帳戶與文章管理頁查看更多自己發布的文章

![帳戶與文章管理頁5](/client/public/readme/20.jpg)

> 按下刪除時會再次確認

![帳戶與文章管理頁6](/client/public/readme/21.jpg)

> 按下編輯後會導航至編輯頁，可對文章資訊或圖片做更新

![帳戶與文章管理頁7](/client/public/readme/22.jpg)

### 所有房屋篩選頁

![所有房屋篩選頁1](/client/public/readme/10.jpg)

>畫面左側可進行多重篩選

![所有房屋篩選頁2](/client/public/readme/11.jpg)


>[補充] 如果非自己帳號發布的房源文章，文章下方將看到「連絡房東」，完成訊息並發送後會導航至gmail

![連絡房東1](/client/public/readme/14.jpg)
![連絡房東2](/client/public/readme/15.jpg)


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
- 新增Listing image
- 刪除Listing
- 更新Listing
- 得到單筆Listing
- 得到所有Listing

### Auth相關API
- Google登入
- 本地登入
- 註冊
- 登出


### 測試帳號
    email: user1234@example.com
    password: user1234
(也可自行建立帳戶)

