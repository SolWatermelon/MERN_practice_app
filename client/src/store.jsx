import { configureStore } from "@reduxjs/toolkit";
import navToggleReducer from "./slices/navToggleSlice";
// import {} from "./slices/navToggleSlice"

export default configureStore({
  reducer: {
    navToggleReducer,  // 這邊的 key 是 "navToggleReducer"
  },
});
