export interface PaymentResponse {
    payment_id: number;
    user_id: number;
    food_id: number;
    amount_paid: string;
    payment_method: string;
    payment_status: string;
    paypal_order_id: string;
    paypal_capture_id: string;
    paypal_transaction_id: string;
    paypal_payer_id: string;
    currency_code: string;
    created_at: string;
    updated_at: string;
    food_name: string;
    food_date: string;
    food_image: string;
    description: string;
    museum_id: number;
    username: string;
    email: string;
    password_hash: string;
    role_id: number;
    user_image: string;
}
