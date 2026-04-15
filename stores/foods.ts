import { defineStore } from "pinia";
import { FoodsService } from "~/service/foods";
import type { FoodsRequest, FoodsState } from "~/types/foods";

const museumsService = new FoodsService();

export const useFoodsStore = defineStore("foods", {
    state: (): FoodsState => ({
        foods: [],
    }),
    actions: {
        async fetchAllFoods() {
            this.foods = await museumsService.getAllFoods();
        },
        async addMuseum(data: FoodsRequest) {
            const res = await museumsService.addMuseum(data);
            return res.message;
        },
        async updateMuseum(data: FoodsRequest, id: number) {
            const res = await museumsService.updateMuseum(data, id);
            return res.message;
        },
        async deleteMuseum(id: number) {
            const res = await museumsService.deleteMuseum(id);
            return res.message;
        },
        async searchFoods(query: string, category_id?: string) {
            const results = await museumsService.searchFoods(query, category_id);
            this.foods = results;
        },
    },
});
