import axios from "axios";
// import { API_URL } from "@env";
import { getTokenFromStorage } from "../auth/auth.helper";
export const URL = process.env.NEXT_PUBLIC_API_URL;
export const getContentType = () => ({
  "Content-Type": "application/json",
});

const api = axios.create({
  baseURL: URL,
  headers: getContentType(),
});

api.interceptors.request.use(async (config) => {
  const accessToken = await getTokenFromStorage();
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default api;
