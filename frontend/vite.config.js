import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  VITE_APP_BASE_URL: "http://localhost:5000",
  plugins: [react()],
});
