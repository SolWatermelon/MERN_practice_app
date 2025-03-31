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
