import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //
  //Tiến thêm vào để giảu quyết quill
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },

    rollupOptions: {
      // input: [
      //   resolve(__dirname, "src/app_profile/main.jsx"),
      //   "./index_profile.html",
      // ],
      input: {
        index: "./index.html",
        src: resolve(__dirname, "src/mainProfile.tsx"),
        main: resolve(__dirname, "src/mainProfile.tsx"),
        module: resolve(__dirname, "src/mainProfile.tsx"),
        
      },
      output: {
        // Output configuration for app1
        dir: resolve(__dirname, "dist_app_profile"),
        // entryFileNames: "[name]/[name].js",
        // chunkFileNames: "[name].js",
        // assetFileNames: "[name]/assets/[name].[ext]",
      },
    },
  },
});
