import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});
if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
    axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default axiosClient;
