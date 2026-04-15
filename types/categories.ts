export interface CategoryState {
    categories: CategoriesResponse[];
}

export interface CategoriesResponse {
    category_id: string;
    category_name: string;
}

export interface CategoriesRequest {
    category_id: string;
    category_name: string;
}
