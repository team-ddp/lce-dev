import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import electron from "vite-plugin-electron";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: ["process_main/electron.js", "process_main/preload.js"],
      onstart: (options) => {
        // Start Electron App
        options.startup([".", "--no-sandbox"]);
      },
    }),
  ],
});
