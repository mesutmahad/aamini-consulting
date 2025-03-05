// utils/axios.js
import axios from "axios";

export const useAxios = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};
