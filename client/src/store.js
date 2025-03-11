import { configureStore } from "@reduxjs/toolkit";
import navToggleReducer from "./slices/navToggleSlice.js";
import { userReducer } from "./slices/userSlice.js";

export default configureStore({
  reducer: {
    navToggleReducer, // 這邊的 key 是 "navToggleReducer"
    userReducer
  },
  middleware: (getDefaultMiddleware) =>
    // 序列化檢查（serializable check）
    // 序列化（serialization）指的是將一個資料結構或物件轉換成一種可以儲存或傳輸的格式（通常是字串）的過程
    // 這樣做的目的是方便資料在網絡上傳遞、存檔，或者跨系統之間傳輸，
    // 之後再透過反序列化（deserialization）將它還原回原本的資料結構
    // 像是JSON.stringify()JSON.parse()
    // 預設情況下Redux Toolkit會自動檢查所有的action和state是否為可序列化的
    // 不可序列化的資料 => Date物件、函數或第三方庫的資料
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
