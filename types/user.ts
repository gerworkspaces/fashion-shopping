import type { RoleResponse } from './roles'

export interface UserState {
    userInfo: UserResponse | null;
    token: string | null;
    users: UserResponse[];
    roles: RoleResponse[];
}

export interface UserResponse {
    user_id: number;
    username: string;
    email: string;
    phone: string;
    address_info: string;
    password_hash: string;
    role_id: number;
    status_user: string;
    token: string;
    image: string;
    file?: File | null;
}

export interface UserRequest {
    username: string;
    email: string;
    phone: string;
    password_hash: string;
    role_id: number;
    image: string;
    file?: File | null;
}
