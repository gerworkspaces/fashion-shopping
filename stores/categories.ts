import { defineStore } from "pinia";
import { CategoryService } from "~/service/categories";
import type { CategoriesRequest, CategoryState } from "~/types/categories";

const categoryService = new CategoryService();

export const useCategoriesStore = defineStore("categories", {
    state: (): CategoryState => ({
        categories: [],
    }),
    actions: {
        async fetchAllCategories() {
            this.categories = await categoryService.getAllCategories();
        },
        async addCategory(data: CategoriesRequest) {
            const res = await categoryService.addCategory(data);
            return res.message;
        },
        async updateCategory(data: CategoriesRequest, id: string) {
            const res = await categoryService.updateCategory(data, id);
            return res.message;
        },
        async deleteCategory(id: string) {
            const res = await categoryService.deleteCategory(id);
            return res.message;
        },
    },
});
