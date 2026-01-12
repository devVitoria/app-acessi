import { ENV } from "@/constants/config";
import axios from "axios";

export const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
