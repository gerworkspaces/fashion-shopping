import type { PaymentResponse } from "~/types/payments";

export interface OrderProductsState {
    products: OrdersResponse[];
    product: OrdersResponse;
    payments: PaymentResponse[];
}

export interface OrdersResponse {
    order_id: number;
    total_products: number;
    available_products: number;
    product_price: string;
    product_name: string;
    product_image: string;
    product_description: string;
    category_name?: string;
    order_date?: string;
    order_name?: string;
    order_image?: string;
    reviews?: ReviewOrderResponse[];
}

export interface OrderRequest {
    order_id: number;
    total_products: number;
    available_products: number;
    product_price: string;
    product_name: string;
    product_image: string;
    product_description: string;
}

export interface ReviewOrderResponse {
    content: string;
    email: string;
    full_name: string;
    rating: number;
    review_id: number;
    subject: string;
}
