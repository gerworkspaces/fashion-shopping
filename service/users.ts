import type { UserRequest } from "~/types/user";
import { deleteData, getData, postData, putData } from "./api-service";

export class UsersService {
    getUsers() {
        return getData("/users");
    }
    addUser(data: UserRequest) {
        return postData("/users", data);
    }
    updateUser(data: UserRequest, id: number) {
        return putData(`/users?id=${id}`, data);
    }
    deleteUser(id: number) {
        return deleteData(`/users?id=${id}`);
    }
}
