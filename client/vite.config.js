import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT || 3000, // 讓Render使用環境變數PORT
    // host: '0.0.0.0', // 允許外部存取
    // 解決cors問題
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // secure: false, //部署時再改
        secure: true,
      },
    },
  },
  build: {
    outDir: 'dist', // 確保Vite輸出到 dist
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
