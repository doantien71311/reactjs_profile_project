import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  //Tiến thêm vào để giảu quyết quill
  build: {
    //outDir: "dist_portal",
    // outDir: "dist_profile",

    commonjsOptions: {
      transformMixedEsModules: true,
    },

    rollupOptions: {
      // input: "src/index.html",
      input: {
        index: "./index.html",
        app_profile: resolve(__dirname, "src/mainProfile.jsx"), // Example entry for app1
      },
      output: {
        // Output configuration for app1
        dir: resolve(__dirname, "dist/app_profile"),
        // entryFileNames: "[name]/[name].js",
        // chunkFileNames: "[name].js",
        // assetFileNames: "[name]/assets/[name].[ext]",
      },
    },
  },
});
