import type { CategoriesRequest } from "~/types/categories";
import { getData, postData } from "./api-service";

export class CategoryService {
    getAllCategories() {
        return getData("/category");
    }
    addCategory(data: CategoriesRequest) {
        return postData("/category", data);
    }
    updateCategory(data: CategoriesRequest, id: string) {
        return postData(`/category/${id}`, data);
    }
    deleteCategory(id: string) {
        return postData(`/category/${id}`);
    }
}
