import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    // 解決cors問題
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // secure: false, //部屬時再改
        secure: true,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
