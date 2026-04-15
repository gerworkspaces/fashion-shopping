import { defineStore } from "pinia";
import { MealTypeService } from "~/service/meal-type";
import { MealsService } from "~/service/meals";
import type { MealTypesRequest } from "~/types/meal-type";
import type { MealsRequest, MealsState } from "~/types/meals";

const mealService = new MealsService();
const mealTypeService = new MealTypeService();

export const useMealsStore = defineStore("meals", {
    state: (): MealsState => ({
        meals: [],
        meal_types: [],
    }),
    actions: {
        async fetchAllMeals() {
            this.meals = await mealService.getMeals();
        },
        async fetchAllMealTypes() {
            this.meal_types = await mealTypeService.getMealType();
        },
        async addMeal(data: MealsRequest) {
            const res = await mealService.addMeal(data);
            return res.message;
        },
        async addMealType(data: MealTypesRequest) {
            const res = await mealTypeService.addMealType(data);
            return res.message;
        },
        async updateMeal(data: MealsRequest, id: number) {
            const res = await mealService.updateMeal(data, id);
            return res.message;
        },
        async updateMealType(data: MealTypesRequest, id: string) {
            const res = await mealTypeService.updateMealType(data, id);
            return res.message;
        },
        async deleteMeal(id: number) {
            const res = await mealService.deleteMeal(id);
            return res.message;
        },
        async deleteMealType(id: string) {
            const res = await mealTypeService.deleteMealType(id);
            return res.message;
        },
        async searchMeals(searchTerm: string) {
            this.meals = await mealService.searchMeals(searchTerm);
            console.log("Meals: ", this.meals);
        },
    },
});
