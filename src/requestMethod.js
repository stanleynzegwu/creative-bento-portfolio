import axios from "axios";

export const BASE_URL = "https://mk-portfolio-management-api.vercel.app/";

export const request = axios.create({
  baseURL: BASE_URL,
});