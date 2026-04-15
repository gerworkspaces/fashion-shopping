import type { MealsRequest } from "~/types/meals";
import { deleteData, getData, postData, putData } from "./api-service";

export class MealsService {
    getMeals() {
        return getData("/posts");
    }
    addMeal(data: MealsRequest) {
        return postData("/meals", data);
    }
    updateMeal(data: MealsRequest, id: number) {
        return putData(`/posts?id=${id}`, data);
    }
    deleteMeal(id: number) {
        return deleteData(`/posts?id=${id}`);
    }
    searchMeals(searchTerm: string) {
        return getData(`/posts?search=${encodeURIComponent(searchTerm)}`);
    }
}
