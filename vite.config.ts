import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.md"],
  server: {
    fs: {
      // Allow serving files from one level up the project directory
      allow: [".."],
    },
  },
});
