import type { RoleRequest } from "~/types/roles";
import { deleteData, getData, postData, putData } from "./api-service";

export class RolesService {
    getRoles() {
        return getData("/roles");
    }
    addRole(data: RoleRequest) {
        return postData("/roles", data);
    }
    updateRole(data: RoleRequest, id: number) {
        return putData(`/roles?id=${id}`, data);
    }
    deleteRole(id: number) {
        return deleteData(`/roles?id=${id}`);
    }
}