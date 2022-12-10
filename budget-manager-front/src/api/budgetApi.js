import axios from "axios";

const budgetApi = axios.create({ baseURL: process.env.REACT_APP_API_URL });

budgetApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  return config;
});

export default budgetApi;
