import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

// Thêm token khi chạy ở client
// if (typeof window !== "undefined") {
//   const token = localStorage.getItem("token");

//   if (token) {
//     axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
//   }
// }

// Bắt lỗi 401
// axiosClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       console.warn("Unauthorized - 401");
//       // Xử lý: ví dụ xóa token, điều hướng về trang đăng nhập
//       try {
//         // Gọi API get token từ next server
//         const res = await axios.get("/api/get-cookie", {
//           withCredentials: true,
//         });
//         const token = res.data.token;
//         if (typeof window !== "undefined") {
//           localStorage.setItem("token", token);
//         }

//         // Lưu token mới vào Redux
//         // store.dispatch(setAccessToken(newToken));

//         // Gọi lại request ban đầu
//         error.config.headers["Authorization"] = `Bearer ${token}`;
//         return axios(error.config);
//       } catch (refreshErr) {
//         console.error("Refresh token thất bại:", refreshErr);
//         // store.dispatch(clearAccessToken());
//         if (typeof window !== "undefined") {
//           window.location.href = "/login";
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );
axiosClient.defaults.withCredentials = true;
axiosClient.defaults.withXSRFToken = true;
export default axiosClient;
