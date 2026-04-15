export interface NewFoodCollection {
    content?: string;
    name?: string;
    title?: string;
    post_image?: string;
    food_image?: string;
    author?: string;
}

export interface FoodsState {
    foods: FoodsResponse[];
}

export interface FoodsResponse {
    food_id: number;
    name: string;
    location: string;
    description: string;
    price: number;
    category_id: string;
    food_image: string;
    open_time: string;
    close_time: string;
    stock: number;
    is_available: boolean;
}

export interface FoodsRequest {
    name: string;
    location: string;
    description: string;
    price: number;
    category_id: string;
    food_image: string;
    open_time: string;
    close_time: string;
    stock: number;
    is_available: boolean;
}
