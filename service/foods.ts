import type { FoodsRequest } from "~/types/foods";
import { deleteData, getData, postData, putData } from "./api-service";

export class FoodsService {
    getAllFoods() {
        return getData("/foods");
    }
    addMuseum(data: FoodsRequest) {
        return postData("/foods", data);
    }
    updateMuseum(data: FoodsRequest, id: number) {
        return putData(`/foods?id=${id}`, data);
    }
    deleteMuseum(id: number) {
        return deleteData(`/foods?id=${id}`);
    }
    searchFoods(query: string, category_id?: string) {
        const params = new URLSearchParams();
        if (query) {
            params.append("query", query);
        }
        if (category_id) {
            params.append("category_id", category_id);
        }
        return getData(`/foods?${params.toString()}`);
    }
}
