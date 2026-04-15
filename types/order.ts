export interface OrderState {
    orders: OrderResponse[];
    reviews: ReviewOrderResponse[];
}

export interface OrderResponse {
    order_id: number;
    order_name: string;
    order_date: string;
    order_image: string;
    description: string;
    museum_id: number;
}

export interface OrderRequest {
    order_id: number;
    order_name: string;
    order_date: string;
    order_image: string;
    description: string;
    museum_id: number;
}

export interface ReviewOrderResponse {
    review_id: number;
    order_id: number;
    user_id: number;
    subject: string;
    email: string;
    full_name: string;
    content: string;
    rating: number;
}

export interface ReviewOrderRequest {
    type: string;
    order_id: number;
    user_id: number;
    subject: string;
    email: string;
    full_name: string;
    content: string;
    rating: number;
}
