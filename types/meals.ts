import type { MealTypesResponse } from "./meal-type";

export interface MealsState {
    meals: MealsResponse[];
    meal_types: MealTypesResponse[];
}

export interface MealsResponse {
    post_id: number;
    user_id: number;
    title?: string;
    content: string;
    post_date: string;
    post_type_id: string;
    post_image: string;
}

export interface MealsRequest {
    user_id: number;
    title?: string;
    content: string;
    post_date: string;
    post_type_id: string;
    post_image: string;
}
