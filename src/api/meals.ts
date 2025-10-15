import axios from "axios";

export const apiMeals = axios.create({
  baseURL: "/api/json/v1/1",
  timeout: 5000,
});
