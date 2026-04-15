import type { MealTypesRequest } from "~/types/meal-type";
import { deleteData, getData, postData, putData } from "./api-service";

export class MealTypeService {
    getMealType() {
        return getData("/post-type");
    }
    addMealType(data: MealTypesRequest) {
        return postData("/post-type", data);
    }
    updateMealType(data: MealTypesRequest, id: string) {
        return putData(`/post-type?id=${id}`, data);
    }
    deleteMealType(id: string) {
        return deleteData(`/post-type?id=${id}`);
    }
}
