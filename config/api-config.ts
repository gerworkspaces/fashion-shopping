// src/config/apiConfig.ts
import axios from "axios";
import { useUserStore } from "@/stores/user-store";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 60000, // timeout 60 giây
});

// Interceptor cho request để thêm token
api.interceptors.request.use(
    (config) => {
        // Lấy instance của store
        const authStore = useUserStore();
        const token = authStore.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor cho response để xử lý lỗi
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const authStore = useUserStore(); // Lấy instance của store ở đây nếu cần logout

        if (error.response?.status === 401) {
            alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            authStore.logout(); // Gọi hàm logout từ store nếu có
        } else {
            // In ra chi tiết lỗi để dễ dàng gỡ lỗi
            console.error("Error response:", error.response);
            alert(`Đã xảy ra lỗi! ${error.response?.data?.message || error.message}`);
        }
        return Promise.reject(error);
    }
);

export default api;
