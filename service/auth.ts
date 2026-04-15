import type { UserRequest } from "~/types/user";
import { postData } from "./api-service";

export class AuthService {
    login(username: string, password: string) {
        return postData("/auth", { action: "login", username, password });
    }
    register(data: UserRequest) {
        return postData("/auth", {
            action: "register",
            username: data.username,
            password: data.password_hash,
            email: data.email,
            role: data.role_id,
            image: data.image,
        });
    }
}
