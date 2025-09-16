import { Config } from "@src/entities/vite-env.d";

export const CONFIG: Config = {
  API_URL: import.meta.env.VITE_API_URL || "YOUR API URL",
};
