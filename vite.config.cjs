// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      proxy: {
        "/api/json/v1/1": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src"),
        "@tests": path.resolve(__dirname, "./tests"),
      },
    },
  };
});
