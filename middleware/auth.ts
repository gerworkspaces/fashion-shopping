import { useUserStore } from "@/stores/user-store";

export default defineNuxtRouteMiddleware((to) => {
    const { ssrContext } = useNuxtApp();
    const userStore = useUserStore();

    if (ssrContext) return;

    // const token = localStorage.getItem("token");
    // const userRole = localStorage.getItem("user_role"); // Lấy thông tin vai trò từ localStorage hoặc store
    // const isAuthenticated = !!token;
    // const isLoginPage = to.meta.isLoginPage || false;

    // // Kiểm tra yêu cầu quyền truy cập và trạng thái đăng nhập
    // if (to.meta.requiresAuth && !isAuthenticated) {
    //   if (!isLoginPage) {
    //     return navigateTo("/login"); // Nếu không đăng nhập, điều hướng về trang đăng nhập
    //   }
    // } else if (isAuthenticated && isLoginPage) {
    //   return navigateTo("/"); // Nếu đã đăng nhập và ở trang login, điều hướng về trang chủ
    // }

    // // Kiểm tra quyền truy cập trang admin
    // if (to.path.startsWith("/admin")) {
    //   if (userRole === "2") {
    //     // Nếu người dùng có role = 2, điều hướng về trang chủ
    //     return navigateTo("/");
    //   }
    //   if (userRole !== "1" && userRole !== "3") {
    //     // Nếu người dùng không có quyền admin, điều hướng về trang chủ
    //     return navigateTo("/");
    //   }
    // }

    // Xử lý đăng xuất
    if (to.path === "/logout") {
        localStorage.removeItem("token");
        localStorage.removeItem("user_role"); // Xóa thông tin vai trò người dùng khỏi localStorage
        userStore.clearUser(); // Xóa thông tin người dùng khỏi store
        return navigateTo("/"); // Chuyển hướng về trang home
    }
});
