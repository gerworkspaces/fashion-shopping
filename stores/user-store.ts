import { defineStore } from "pinia";
import type { UserRequest, UserResponse, UserState } from "~/types/user";
import { AuthService } from "~/service/auth";
import { UsersService } from "~/service/users";
import { RolesService } from "~/service/roles";
import type { RoleRequest } from "~/types/roles";
import { UploadService } from "~/service/upload-service";

const authService = new AuthService();
const usersService = new UsersService();
const roleService = new RolesService();
const uploadService = new UploadService();

export const useUserStore = defineStore("user", {
    state: (): UserState => ({
        userInfo:
            typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("userInfo") || "null")
                : null,
        token: null,
        users: [],
        roles: []
    }),
    actions: {
        async login(username: string, password: string) {
            const res = await authService.login(username, password);
            this.setUser(res.user);
            this.token = res.token;
            if (typeof window !== "undefined") {
                localStorage.setItem("userInfo", JSON.stringify(res.user));
            }
        },
        async register(data: UserRequest) {
            return await authService.register(data);
        },
        async fetchAllUsers() {
            this.users = await usersService.getUsers();
        },
        async addUser(data: UserRequest) {
            const res = await usersService.addUser(data);
            return res.message;
        },
        async updateUser(data: UserRequest, id: number) {
            const res = await usersService.updateUser(data, id);
            return res.message;
        },
        async deleteUser(id: number) {
            const res = await usersService.deleteUser(id);
            return res.message;
        },
        async fetchAllRoles() {
            this.roles = await roleService.getRoles();
        },
        async addRole(data: RoleRequest) {
            const res = await roleService.addRole(data);
            return res.message;
        },
        async updateRole(data: RoleRequest, id: number) {
            const res = await roleService.updateRole(data, id);
            return res.message;
        },
        async deleteRole(id: number) {
            const res = await roleService.deleteRole(id);
            return res.message;
        },
        async uploadFile(data: any) {
            return await uploadService.uploadFile(data);
        },
        logout() {
            this.clearUser();
            this.token = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("userInfo");
            }
        },
        setUser(user: UserResponse) {
            this.userInfo = user;
            const storedUser =
                typeof window !== "undefined" ? localStorage.getItem("userInfo") : null;
            if (storedUser) {
                this.userInfo = JSON.parse(storedUser);
            }
        },
        clearUser() {
            this.userInfo = null;
        },
    },
});
